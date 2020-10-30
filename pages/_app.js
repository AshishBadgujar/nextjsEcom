import '../public/style.css'
import '../public/css/flaticon.css'
import '../public/css/style.css'
import "react-alice-carousel/lib/alice-carousel.css";
import Layout from '../components/layout';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}