import { SitemapEntry } from "../src/sitemapxml-writer";

const entry = new SitemapEntry("https://example.com");
entry.lastmod = "2024-01-01T00:00:00Z";
entry.changefreq = "weekly";
entry.priority = "0.7";

const xml: string = entry.writeXML();

console.log(xml);
