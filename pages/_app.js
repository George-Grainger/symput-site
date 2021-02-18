import '@/styles/globals.css';
import { UserContext } from '@/lib/context';
import { useUserData } from '@/lib/hooks';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <ThemeProvider attribute="class">
      <UserContext.Provider value={userData}>
        <Component {...pageProps} />
        <Toaster />
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
