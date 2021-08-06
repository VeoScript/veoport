import '~/styles/tailwind.css'
import { ThemeProvider } from 'next-themes'
import NextNProgress from '~/lib/nprogress'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <NextNProgress />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
export default MyApp
