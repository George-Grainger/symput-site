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
  console.log(navbarData, footerData);

  return {
    props: {
      navbarData,
      footerData,
      pageData
    }
  };
};

export default function Enter({ navbarData, footerData, pageData }) {
  const {
    title,
    loginPage,
    usernamePage,
    verifyPage,
    completedPage
  } = pageData;
  const { user, username, loading, error, verified } = useContext(UserContext);

  const getCurrentState = () => {
    if (error) {
      return <div>Error</div>;
    } else if (loading) {
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
    <Layout title={title} navbarData={navbarData} footerData={footerData}>
      <section className="section-default pt-12 pb-24 px-8">
        <div className="card bg-gray-900 text-white loginm md:min-h-login min-w-login">
          <div>{getCurrentState()}</div>
        </div>
      </section>
    </Layout>
  );
}
