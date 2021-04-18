import '~/styles/globals.css'
import '~/styles/tailwind.css'
import App from 'next/app'
import { createContext } from 'react'
import { fetchAPI } from '~/lib/strapi/api'
import { ThemeProvider } from 'next-themes'
import NextNProgress from '~/lib/nprogress'

export const GlobalContext = createContext({})

function MyApp({ Component, pageProps }) {
  const { global } = pageProps
  return (
    <ThemeProvider attribute="class">
      <NextNProgress />
      <GlobalContext.Provider value={ global }>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </ThemeProvider>
  )
}

MyApp.getInitialProps = async(ctx) => {
  const appProps = await App.getInitialProps(ctx)
  const global = await fetchAPI('/global')
  return { ...appProps, pageProps:{ global } }
}

export default MyApp