import '../styles/globals.css'

import Head from 'next/head'
import { ThemeProvider } from 'next-themes'
import React, { useEffect, useMemo } from 'react'
import { IconContext } from 'react-icons'

import Navbar from '../components/Navbar'

export default ({ Component, pageProps }) => {
  useEffect(() => console.info(`made with 💖 by sky`), [])

  const iconContext = useMemo(() => {
    return {
      size: `1em`,
      className: `react-icon`,
      style: { verticalAlign: `middle`, display: `inline-block` }
    }
  }, [])

  return (
    <IconContext.Provider
      value={iconContext}
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
