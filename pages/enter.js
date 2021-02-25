import { UserContext } from '@/lib/context';
import { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import LoginPlaceHolder from '@/components/Loading/LoginPalceHolder';
import UsernameForm from '@/components/Form/UsernameForm';
import { useRouter } from 'next/router';

const Login = dynamic(() => import('@/components/Login'), {
  loading: () => <LoginPlaceHolder />
});

const SignOutButton = dynamic(
  () => import('@/components/Login/SignOutButton'),
  {
    loading: () => <LoginPlaceHolder />
  }
);

const VerifyUser = dynamic(() => import('@/components/Login/VerifyUser'), {
  loading: () => <LoginPlaceHolder />
});

export const getStaticProps = async ({ locale }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData
    }
  };
};

export default function Enter({ navbarData, footerData }) {
  const { user, username, loading, error, verified } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user && !loading && username && verified) {
      router.push('/admin');
    }
  }, [user, loading, verified]);

  const getCurrentState = () => {
    if (error) {
      return <div>Error</div>;
    } else if (loading) {
      return <LoginPlaceHolder />;
    } else if (!user) {
      return <Login />;
    } else if (!username) {
      return <UsernameForm />;
    } else if (!verified) {
      return <VerifyUser />;
    } else {
      return <SignOutButton />;
    }
  };

  return (
    <Layout
      title="Login to Symput"
      navbarData={navbarData}
      footerData={footerData}
    >
      <section className="pt-12 pb-24 px-8 w-full min-h-screen flex justify-center items-center bg-yellow-400 dark:bg-gray-600 transition-colors duration-300">
        <div className="card bg-gray-900 text-white loginm md:min-h-login min-w-login">
          <div>{getCurrentState()}</div>
        </div>
      </section>
    </Layout>
  );
}
