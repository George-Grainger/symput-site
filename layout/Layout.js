import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { NavContext, FooterContext } from '@/lib/context';

const Layout = ({ title, navbarData, footerData, children, transparent }) => {
  const { pathname } = useRouter();
  const convertToTitle = (string) => {
    const result = string.replace(
      /(\-\w)/g,
      (matches) => ' ' + matches[1].toUpperCase()
    );
    return result.charAt(1).toUpperCase() + result.slice(2);
  };

  const name = title || `Symput - ${convertToTitle(pathname)}`;
  const url = `https://symput.com${pathname}`;
  return (
    <>
      <NextSeo title={name} canonical={url} openGraph={{ url, title }} />
      <NavContext.Provider value={navbarData}>
        <Navbar transparent={transparent} />
      </NavContext.Provider>
      <main className={'flex-auto' + (transparent ? '' : ' offset-header')}>
        {children}
      </main>
      <FooterContext.Provider value={footerData}>
        <Footer />
      </FooterContext.Provider>
    </>
  );
};

export default Layout;
