import { SitemapEntry } from "../src/sitemapxml-writer.js";

const entry = new SitemapEntry("https://example.com");
entry.lastmod = "2024-01-01T00:00:00Z";
entry.changefreq = "weekly";
entry.priority = "0.7";

console.log(entry.writeXML()); // Check output manually or use an assertion framework
