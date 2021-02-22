import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Layout = ({ title, navbarData, footerData, children, transparent }) => {
  return (
    <>
      <Head>
        <title>{title || 'Symput'}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar data={navbarData} transparent={transparent} />
      </header>
      <main className={transparent ? '' : 'offset-header'}>{children}</main>
      <Footer data={footerData} />
    </>
  );
};

export default Layout;
