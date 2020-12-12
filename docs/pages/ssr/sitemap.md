# Sitemap

This boilerplate already generates sitemap for the static pages inside `pages` folder using `globby`, but if you need to add dynamic route pages to sitemap, you can add the path list to `src/pages/sitemap.xml.tsx` component.

```jsx
// Use example of the sitemap generation
class Sitemap extends React.Component {
  static async getInitialProps({ res }: NextPageContext): Promise<void> {
    const staticPages = await getStaticPages() // gets all the static pages
    const mocada = getMocadaPaths() // gets all the paths used to `dynamic-routes/mocada/*`

    const pages = [...staticPages, ...mocada]

    res.setHeader('Content-Type', 'text/xml')
    res.write(createSitemap(pages))
    res.end()
  }
}
```
