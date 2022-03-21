import Navbar from '../components/Navbar'
import Head from 'next/head';
import '../styles/globals.css'

import { ThemeProvider } from "next-themes"
import { IconContext } from "react-icons"

export default function MyApp({ Component, pageProps }) {
  return (
    <IconContext.Provider
      value={{
        size: `1em`,
        className: `react-icon`,
        style: { verticalAlign: `middle`, display: `inline-block` },
      }}
    >
      <ThemeProvider attribute="class">
      <Head>
        <title>SPA with React Table component and User Authentication</title>
      </Head>
        <Navbar />
        <main>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </main>
      </ThemeProvider>
    </IconContext.Provider>
  )
}
