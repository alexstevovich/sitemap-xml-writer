class SitemapEntry {
    static defaultChangefreq = 'daily';
    static defaultPriority = '0.8';

    /**
     * Creates a new SitemapEntry.
     * @param {string} loc - The full URL of the page (required).
     * @throws {Error} If the loc parameter is not provided.
     */
    constructor(loc) {
        if (!loc) {
            throw new Error('The "loc" parameter (URL) is required for a sitemap entry.');
        }
        this.loc = this.escapeXml(loc); // Ensure the URL is properly escaped
        this.lastmod = new Date().toISOString();
        this.changefreq = SitemapEntry.defaultChangefreq;
        this.priority = SitemapEntry.defaultPriority;
    }

    /**
     * Generates the XML representation for this sitemap entry.
     * @returns {string} XML string for the sitemap entry.
     */
    writeXML() {
        return `
<url>
    <loc>${this.loc}</loc>
    ${this.lastmod ? `<lastmod>${this.lastmod}</lastmod>` : ''}
    ${this.changefreq ? `<changefreq>${this.changefreq}</changefreq>` : ''}
    ${this.priority ? `<priority>${this.priority}</priority>` : ''}
</url>`.trim();
    }

    /**
     * Escapes XML special characters to ensure valid XML output.
     * @param {string} str - The string to escape.
     * @returns {string} - The escaped string.
     */
    escapeXml(str) {
        return str.replace(/&/g, '&amp;')
                  .replace(/</g, '&lt;')
                  .replace(/>/g, '&gt;')
                  .replace(/"/g, '&quot;')
                  .replace(/'/g, '&apos;');
    }
}

module.exports = {SitemapEntry}