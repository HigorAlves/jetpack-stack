# Translations

[I18next](https://react.i18next.com/) Lib was used for translations

## Directory design

The i18n directory at src folder has all translations files with the following structure

```
.
├── index.ts -- The i18next settings file
└── locale
    ├── enUS.ts -- The en-US translation file
    ├── locale.d.ts -- The definition file to keep a similarity between translations files
    └── ptBR.ts -- The pt-BR translation file
```

> As the translation (enUS, ptBR or other language) file is an object, it is possible to separate it into several smaller files, if necessary

## Usage

Consider that the translation file follows the following structure:

```ts
const en: AppLocale = {
  languages: {
    'pt-BR': 'Portuguese',
    'en-US': 'English'
  },
  home: {
    metatags: {
      title: 'Nata.House CRA Template',
      url: 'https://example.com.br',
      description:
        'Nata.house maximizes results for customers by focusing on a set of solid technologies used by large companies.'
    },
    content: 'Edit the src/Home.tsx file and save to reload.',
    learn: 'Learn React'
  }
}

export default en
```

### useTranslation

[Official Documentation](https://react.i18next.com/latest/usetranslation-hook)

```tsx
import React from 'react'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

export const MyComponent: React.FC = () => {
  const { t, i18n } = useTranslation('home')
  // or const [t, i18n] = useTranslation('home');

  return (
    <>
      <Helmet>
        <title>{t('title')}</title>
        <meta name='description' content={t('metatags.description')} />
        <meta name='url' content={t('metatags.url')} />
        <meta property='og:title' content={t('metatags.title')} />
        <meta property='og:description' content={t('metatags.description')} />
        <meta property='og:url' content={t('metatags.url')} />
      </Helmet>

      <section>
        <p>{t('content')}</p>
        <p>{t('learn')}</p>
      </section>
    </>
  )
}
```

For other ways([HOC](https://react.i18next.com/latest/withtranslation-hoc), [Render Prop](https://react.i18next.com/latest/translation-render-prop), [Trans Component](https://react.i18next.com/latest/trans-component)), see the official documentation
