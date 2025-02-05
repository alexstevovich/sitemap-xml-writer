/// <reference types="node" />
import fs from 'fs';

/**
 * Represents an entry in a sitemap.
 */
export class SitemapEntry {
    static defaultChangefreq: string;
    static defaultPriority: string;

    loc: string;
    lastmod: string;
    changefreq: string;
    priority: string;

    /**
     * Creates a new SitemapEntry.
     * @param loc - The full URL of the page (required).
     * @param options - Optional settings for lastmod, changefreq, and priority.
     */
    constructor(loc: string, options?: { lastmod?: string; changefreq?: string; priority?: string });

    /**
     * Generates the XML representation for this sitemap entry.
     * @returns XML string for the sitemap entry.
     */
    toXML(): string;

    /**
     * Escapes XML special characters to ensure valid XML output.
     * @param str - The string to escape.
     * @returns The escaped string.
     */
    protected escapeXml(str: string): string;
}

/**
 * Manages a collection of SitemapEntry objects and generates a complete sitemap.
 */
export class Sitemap {
    private entries: SitemapEntry[];
    private baseUrl: string;

    /**
     * Creates a new Sitemap.
     * @param baseUrl - The base URL for the sitemap.
     */
    constructor(baseUrl: string);

    /**
     * Adds a new entry to the sitemap.
     * @param entry - The entry to add.
     */
    addEntry(entry: SitemapEntry): void;

    /**
     * Generates the complete sitemap XML.
     * @returns The full XML sitemap as a string.
     */
    toXML(): string;

    /**
     * Saves the sitemap to a file.
     * @param filepath - The file path to save the sitemap.
     */
    saveToFile(filepath: string): void;

    /**
     * Splits entries into multiple paginated sitemaps if necessary.
     * @param maxEntriesPerFile - The maximum number of entries per sitemap file.
     * @returns The sitemap index XML as a string.
     */
    generatePaginatedSitemaps(maxEntriesPerFile?: number): string;

    /**
     * Generates a sitemap index XML file that references multiple sitemap files.
     * @param sitemapFiles - An array of sitemap file names.
     * @returns The sitemap index XML as a string.
     */
    generateSitemapIndex(sitemapFiles: string[]): string;
}

/**
 * Default export for compatibility with both ESM and CommonJS.
 */
declare const _default: { Sitemap: typeof Sitemap; SitemapEntry: typeof SitemapEntry };
export default _default;
