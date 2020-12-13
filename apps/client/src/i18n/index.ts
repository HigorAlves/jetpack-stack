import i18n from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import enUS from './locale/enUS'
import ptBR from './locale/ptBR'

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pt-BR',
    defaultNS: 'translations',
    ns: 'translations',
    debug: process.env.NODE_ENV === 'development',
    resources: {
      'en-US': enUS,
      'pt-BR': ptBR
    }
  })

export default i18n
