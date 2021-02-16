import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || 'Symput'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar transparent={true} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
