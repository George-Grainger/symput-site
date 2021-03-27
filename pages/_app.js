import '@/styles/globals.css';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ThemeProvider attribute="class">
      <UserContext.Provider value={userData}>
        <DefaultSeo {...SEO} />
        <Component {...pageProps} />
        <Toaster
          toastOptions={{
            style: {
              margin: '100px'
            }
          }}
        />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
