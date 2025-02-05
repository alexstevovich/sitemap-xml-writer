const fs = require('fs');

class SitemapEntry {
    static defaultChangefreq = 'daily';
    static defaultPriority = '0.8';

    /**
     * Creates a new SitemapEntry.
     * @param {string} loc - The full URL of the page (required).
     * @param {Object} [options] - Optional settings for lastmod, changefreq, and priority.
     */
    constructor(loc, options = {}) {
        if (!loc) {
            throw new Error('The "loc" parameter (URL) is required for a sitemap entry.');
        }

        this.loc = this.escapeXml(loc);
        this.lastmod = options.lastmod || new Date().toISOString();
        this.changefreq = options.changefreq || SitemapEntry.defaultChangefreq;
        this.priority = options.priority || SitemapEntry.defaultPriority;
    }

    toXML() {
        return `
<url>
    <loc>${this.loc}</loc>
    ${this.lastmod ? `<lastmod>${this.lastmod}</lastmod>` : ''}
    ${this.changefreq ? `<changefreq>${this.changefreq}</changefreq>` : ''}
    ${this.priority ? `<priority>${this.priority}</priority>` : ''}
</url>`.trim();
    }

    escapeXml(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&apos;');
    }
}

/**
 * Manages a collection of SitemapEntry objects and generates a complete sitemap.
 */
class Sitemap{
    constructor(baseUrl) {
        this.entries = [];
        this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    }

    /**
     * Adds a new entry to the sitemap.
     * @param {SitemapEntry} entry - The entry to add.
     */
    addEntry(entry) {
        if (!(entry instanceof SitemapEntry)) {
            throw new Error('Invalid entry: Must be an instance of SitemapEntry');
        }
        this.entries.push(entry);
    }

    /**
     * Generates the complete sitemap XML.
     * @returns {string} - The full XML sitemap.
     */
    toXML() {
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${this.entries.map(entry => entry.toXML()).join('\n')}
</urlset>`;
    }

    /**
     * Saves the sitemap to a file.
     * @param {string} filepath - The file path to save the sitemap.
     */
    saveToFile(filepath) {
        fs.writeFileSync(filepath, this.toXML(), 'utf8');
        console.log(`✅ Sitemap saved to: ${filepath}`);
    }

    /**
     * Splits entries into multiple paginated sitemaps if necessary.
     * @param {number} maxEntriesPerFile - The maximum number of entries per sitemap file.
     * @returns {string} - The sitemap index XML.
     */
    generatePaginatedSitemaps(maxEntriesPerFile = 50000) {
        const sitemapFiles = [];
        const totalPages = Math.ceil(this.entries.length / maxEntriesPerFile);

        for (let i = 0; i < totalPages; i++) {
            const start = i * maxEntriesPerFile;
            const end = start + maxEntriesPerFile;
            const subset = this.entries.slice(start, end);

            const sitemapFile = `sitemap-${i + 1}.xml`;
            sitemapFiles.push(sitemapFile);

            const writer = new SitemapWriter(this.baseUrl);
            writer.entries = subset;
            writer.saveToFile(sitemapFile);
        }

        return this.generateSitemapIndex(sitemapFiles);
    }

    /**
     * Generates a sitemap index XML file that references multiple sitemap files.
     * @param {string[]} sitemapFiles - An array of sitemap file names.
     * @returns {string} - The sitemap index XML.
     */
    generateSitemapIndex(sitemapFiles) {
        const sitemapEntries = sitemapFiles.map(file => `
<sitemap>
    <loc>${this.baseUrl}/${file}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>`).join('\n');

        const sitemapIndexXML = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapEntries}
</sitemapindex>`;

        fs.writeFileSync('sitemap-index.xml', sitemapIndexXML, 'utf8');
        console.log(`✅ Sitemap index saved to: sitemap-index.xml`);

        return sitemapIndexXML;
    }
}

module.exports = {Sitemap,SitemapEntry}