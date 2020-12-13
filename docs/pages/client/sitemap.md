# Sitemap

To generate sitemap.xml file, you have to run the npm script `sitemap` with yarn or npm like: `yarn sitemap` (or `npm run sitemap` if you're using npm).
This script located at `src/services/sitemap-geeration.js` generates the pages that are inside the `pages` array. There's an example:
If there's the first time you are using this, you have to replace the `BASE_URL` with you site url to make this work.

```jsx
// `src/services/sitemap-generation.js`
const BASE_URL = 'https://example.com.br/'
const pages = [
  // Your pages here
  '',
  'about'
]
```
