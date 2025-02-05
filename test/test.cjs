const {Sitemap, SitemapEntry } = require("../src/sitemap-xml-writer.cjs");

const sitemap = new Sitemap('https://example.com');
sitemap.addEntry(new SitemapEntry('https://example.com/home'));
sitemap.addEntry(new SitemapEntry('https://example.com/about'));
sitemap.addEntry(new SitemapEntry('https://example.com/contact'));

console.log(sitemap.toXML())