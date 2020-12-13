import React, { useState, useCallback } from 'react'

import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

import logo from 'assets/svg/logo.svg'

import styles from './Home.module.scss'

export function HomePage(): JSX.Element {
  const { t: languages } = useTranslation('languages', { useSuspense: false })
  const { t, i18n } = useTranslation('home', { useSuspense: false })
  const [language, setLanguage] = useState<Languages>(
    i18n.language as Languages
  )

  const toggleLanguage = useCallback(() => {
    const toggleTo = language === 'pt-BR' ? 'en-US' : 'pt-BR'
    setLanguage(toggleTo)
    i18n.changeLanguage(toggleTo)
  }, [language, setLanguage, i18n])

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

      <div className={styles.app}>
        <header className={styles.header}>
          <span className={styles.language} onClick={toggleLanguage}>
            {languages(language)}
          </span>

          <img src={logo} className={styles.logo} alt='logo' />
          <p>{t('content')}</p>
          <a
            className={styles.link}
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            {t('learn')}
          </a>
        </header>
      </div>
    </>
  )
}
