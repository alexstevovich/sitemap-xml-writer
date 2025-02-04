const { SitemapEntry } = require("../src/sitemapxml-writer.cjs");

const entry = new SitemapEntry("https://example.com");
entry.lastmod = "2024-01-01T00:00:00Z";
entry.changefreq = "weekly";
entry.priority = "0.7";

console.log(entry.writeXML()); // Ensure it produces correct XML output
