export declare class SitemapEntry {
    loc: string;
    lastmod?: string;
    changefreq?: string;
    priority?: string;
    constructor(loc: string);
    writeXML(): string;
}
