import { UserContext } from '@/lib/context';
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
  const pageData = getPageData(locale, 'login');
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);

  return {
    props: {
      navbarData,
      footerData,
      pageData
    }
  };
};

export default function SignIn({ navbarData, footerData, pageData }) {
  const { loginPage, usernamePage, verifyPage, completedPage } = pageData;
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
      return <Login {...loginPage} />;
    } else if (!username) {
      return <UsernameForm {...usernamePage} />;
    } else if (!verified) {
      return <VerifyUser {...verifyPage} />;
    } else {
      return <Completed {...completedPage} />;
    }
  };

  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <section className="section-default section-default-padding">
        <div className="card bg-gray-900 text-white md:min-h-fs-card min-w-fs-card">
          <div>{getCurrentState()}</div>
        </div>
      </section>
    </Layout>
  );
}
