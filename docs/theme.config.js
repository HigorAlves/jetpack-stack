export default {
  repository: 'https://github.com/higoralves/jetpack-stack',
  titleSuffix: ' - The optimal workflow for full stack teams',
  logo: (
    <>
      <span className='mr-2 font-extrabold hidden md:inline'>JETPACK</span>
      <span className='text-gray-600 font-normal hidden md:inline'>
        The optimal workflow for full stack teams
      </span>
    </>
  ),
  head: (
    <>
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta httpEquiv='Content-Language' content='en' />
      <meta name='description' content='Jetpack: Your next project start' />
      <meta name='og:description' content='Jetpack: Your next project start' />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:image' content='https://nextra.vercel.app/og.png' />
      <meta name='twitter:site:domain' content='nextra.vercel.app' />
      <meta name='twitter:url' content='https://nextra.vercel.app' />
      <meta name='og:title' content='Jetpack: Your next project start' />
      <meta name='og:image' content='https://nextra.vercel.app/og.png' />
      <meta name='apple-mobile-web-app-title' content='Jetpack' />
    </>
  ),
  search: true,
  prevLinks: true,
  nextLinks: true,
  footer: true,
  footerEditOnGitHubLink: true,
  footerText: <>MIT {new Date().getFullYear()} © Jetpack.</>
}
