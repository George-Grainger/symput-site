import { UserContext, SignInContext, ErrorsContext } from '@/lib/context';
import { useContext } from 'react';
import dynamic from 'next/dynamic';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData, getPageData } from '@/lib/pageContent';
import LoginPlaceHolder from '@/components/Loading/LoginPalceHolder';
import UsernameForm from '@/components/Form/UsernameForm';

const Login = dynamic(() => import('@/components/Login'), {
  loading: () => <LoginPlaceHolder />
});

const Completed = dynamic(() => import('@/components/Login/Completed'), {
  loading: () => <LoginPlaceHolder />
});

const VerifyUser = dynamic(() => import('@/components/Login/VerifyUser'), {
  loading: () => <LoginPlaceHolder />
});

export const getStaticProps = async ({ locale }) => {
  const pageData = getPageData(locale, 'sign-in');
  const errorsData = getPageData(locale, 'errors');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      navbarData,
      footerData,
      pageData,
      errorsData
    }
  };
};

export default function SignIn({
  navbarData,
  footerData,
  pageData,
  errorsData
}) {
  console.log(errorsData);
  const {
    user,
    username,
    usernameLoading,
    loading,
    error,
    verified
  } = useContext(UserContext);

  const getCurrentState = () => {
    if (error) {
      return <div>Error</div>;
    } else if (loading || usernameLoading) {
      return <LoginPlaceHolder />;
    } else if (!user) {
      return <Login />;
    } else if (!username) {
      return <UsernameForm />;
    } else if (!verified) {
      return <VerifyUser />;
    } else {
      return <Completed />;
    }
  };

  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <section className="section-default section-default-padding">
        <div className="card bg-gray-900 text-white md:min-h-fs-card min-w-fs-card">
          <div>
            <SignInContext.Provider value={pageData}>
              <ErrorsContext.Provider value={errorsData}>
                {getCurrentState()}
              </ErrorsContext.Provider>
            </SignInContext.Provider>
          </div>
        </div>
      </section>
    </Layout>
  );
}
