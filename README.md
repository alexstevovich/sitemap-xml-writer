# SitemapXML Writer

## Overview
SitemapXML Writer is a lightweight and modular utility for generating **sitemap.xml** files in compliance with search engine standards. It allows easy creation, management, and serialization of sitemap entries while ensuring XML validity.

## Features
- **Structured Sitemap Entries** - Create structured URL entries with required metadata.
- **Automatic XML Escaping** - Ensures valid XML output for special characters.
- **Configurable Change Frequency & Priority** - Default values provided but customizable per entry.
- **Optimized for SEO** - Generates search engine-friendly sitemap.xml files.
- **Consistent API Design** - Follows naming conventions from related utilities like MetaTag Writer.

## Installation
```sh
npm install sitemapxml-writer
```

## Usage
### Creating a Sitemap Entry
```javascript
import { SitemapEntry } from 'sitemapxml-writer';

const entry = new SitemapEntry('https://example.com/about');
console.log(entry.writeXML());
```
#### Output:
```xml
<url>
    <loc>https://example.com/about</loc>
    <lastmod>2024-02-04T12:00:00Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
</url>
```

### Generating a Full Sitemap
```javascript
import { SitemapWriter } from 'sitemapxml-writer';

const sitemap = new SitemapWriter();
sitemap.addEntry(new SitemapEntry('https://example.com/'));
sitemap.addEntry(new SitemapEntry('https://example.com/blog'));

console.log(sitemap.writeXML());
```

### Output
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://example.com/</loc>
        <lastmod>2024-02-04T12:00:00Z</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://example.com/blog</loc>
        <lastmod>2024-02-04T12:00:00Z</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
</urlset>
```

## API Reference
### `SitemapEntry`
#### Constructor
```javascript
new SitemapEntry(loc: string)
```
| Parameter | Type   | Required | Description                        |
|-----------|--------|----------|------------------------------------|
| `loc`     | string | ✅       | The full URL of the page entry.   |

#### Methods
- **`writeXML()`** → Generates an XML string for the entry.

### `SitemapWriter`
#### Constructor
```javascript
new SitemapWriter()
```
#### Methods
- **`addEntry(entry: SitemapEntry)`** → Adds an entry to the sitemap.
- **`writeXML()`** → Outputs the full sitemap.xml string.

## License
MIT License

