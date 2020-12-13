# Styles

This project uses sass for styling. The module [typed-scss-modules](https://github.com/skovy/typed-scss-modules) is used to automatically create the typing files for better developer experience.
For default these typing files aren't tracked by git.

Because of the NextJs's webpack configurations the sass classes with dashes (e.g. `.bigger-title`) is generated with the same name on build (`className="bigger-title"`) and `tsm` module is configured with the same flags to match the NextJs's default:

```jsx
// composed names
<title className={styles['bigger-title']}>Create Next App</title>

// simple names
<div className={styles.container}>...</div>
```

The folder structure is to use local files inside each container/component folder. The idea is to avoid using styles inside pages folder, but if necessary the styling files could be placed inside styles page.

```
src
├── assets
│   └── styles
│       ├── globals.scss          // global file, imported inside _app.tsx
│       └── partials
│           ├── mixins.scss       //
│           ├── reset.scss        // style reset (optional/changeable)
│           ├── theme.scss        // stylesheet
│           └── variables.scss
├── components
│   └── Home
│       ├── Home.tsx              // container/component
│       ├── Home.module.scss      // styles for container/component
│       └── Home.module.scss.d.ts // generated file by tsm
[...]
```
