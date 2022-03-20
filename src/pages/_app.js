import Navbar from '../components/Navbar'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </>
  )
}
