# JSONLD/Schema

To add the JSON-LD information about the page, or the content, you can use the `JsonLd` component. The component has to be inside the head tag, and you can do this using the `Head` component from NextJs.
The schemas for use with this component are located at `src/services/schema.ts`. There's an example inside `_document.tsx` for the index page using the WebPage schema.
You can test the schemas using this [Google structured data testing tool](https://search.google.com/structured-data/testing-tool#) and if you don't know so much about this JSON-LD notation, you can read more about it [here](https://json-ld.org/).

```jsx
// Use example of the JsonLd component
<JsonLd
  schema={getHomeSchema({
    title: 'NextJs Boilerplate',
    url: 'http://localhost:3000',
    description: "nata.house's boilerplate for NextJS projects",
    socialSharingImage:
      'https://avatars2.githubusercontent.com/u/35275557?s=200&v=4',
    headline: "nata.house's boilerplate for NextJS projects"
  })}
/>
```
