import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>SPA Example</title>
      </Head>

      <div className='app-container'>
        <Component {...pageProps} />
      </div>
    </>
  );
}
