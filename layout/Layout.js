import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Head from 'next/head';

const Layout = ({ title, navbarData, footerData, children, transparent }) => {
  return (
    <>
      <Head>
        <title>{title || 'Symput'}</title>
        <link rel="manifest" href="manifest.json" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        // TODO fix some of these
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="application-name" content={title || 'Symput'} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title || 'Symput'} />
        <meta name="description" content="A keyboard for typing mathematics" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta
          name="msapplication-config"
          content="/static/icons/browserconfig.xml"
        />
        <meta name="msapplication-TileColor" content="#fbbf24" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#fbbf24" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://symput-site.vercel.app" />
        <meta name="twitter:title" content="Symput" />
        <meta
          name="twitter:description"
          content="A keyboard for typing mathematics"
        />
        <meta name="twitter:image" content="/images/symput-logo.svg" />
        <meta name="twitter:creator" content="@georgegrainger" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Symput" />
        <meta
          property="og:description"
          content="A keyboard for typing mathematics"
        />
        <meta property="og:site_name" content="Symput" />
        <meta property="og:url" content="https://symput-site.vercel.app" />
        <meta property="og:image" content="/images/symput-logo.svg" />
      </Head>
      <header>
        <Navbar data={navbarData} transparent={transparent} />
      </header>
      <main className={'flex-auto' + (transparent ? '' : ' offset-header')}>
        {children}
      </main>
      <Footer data={footerData} />
    </>
  );
};

export default Layout;
