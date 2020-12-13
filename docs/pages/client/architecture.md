# Architecture

The driving goal of the architecture of the boilerplate is separation of concerns. Namely:

- **Pages are separated from containers and components**
  Pages are small components that are concerned with how things are grouped. Containers usually define whole how things
  should work like manage state, make requests, components are the small peace they just have things like an _input_ and your style, components never interact with state or other requests.

- **State is managed using global Context API stores.**

When applications grow, sharing state and its changes can become very hard. Questions like "How can I access this data?" or "When did this change?" are common, just like passing data around components just to be able to use it in nested components.

With Context, state is shared using global stores, and changes are predictable: actions are applied by reducers to the
state. While the pattern can be a bit much for small projects, the clear separation of responsibilities and
predictability helps with bigger applications.

## Content

The boilerplate contains:

- React
- Storybook
- Jest
- Sass
- Husky
- Eslint
- Prettier
- Pretty-quick
- Lighthouse
- Lint-staged
- Standard-version
- Typed-scss-modules
- Serve

## Directory layout

- `src/assets`: Assets (image, audio files, ...) used by the application
- `src/components`: Presentational components
- `src/config`: Configuration of the application
- `src/containers`: Group of components that can use state and services
- `src/hooks`: Customized hooks
- `src/pages`: Page components / A group of containers to make a page
- `src/services`: Application services, e.g. API clients
- `src/store`: Context API acions/selectors/store

```
├── assets
├── components
├── config
├── containers
├── hooks
├── pages
├── services
├── store
│   ├── index.tsx
│   ├── selectors.ts
│   ├── store.ts
│   └── types.d.ts
```
