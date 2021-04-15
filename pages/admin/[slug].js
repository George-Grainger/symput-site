import AuthCheck from '@/components/AuthCheck';
import FeedbackManager from '@/components/AdminArea/FeedbackManager';
import Layout from 'layout/Layout';
import { useRouter } from 'next/router';

// Use client side rendering since SSO not important for backend and don't wan't to create a copy of the same page for each post.
import navbarEn from '@/data/navbar/en';
import navbarAr from '@/data/navbar/ar';
import navbarZhCn from '@/data/navbar/zh-cn';
import footerEn from '@/data/footer/en';
import footerAr from '@/data/footer/ar';
import footerZhCn from '@/data/footer/zh-cn';
import authPageEn from '@/data/auth/en';
import authPageAr from '@/data/auth/ar';
import authPageZhCn from '@/data/auth/zh-cn';
import errorsEn from '@/data/errors/en';
import errorsAr from '@/data/errors/ar';
import errorsZhCn from '@/data/errors/zh-cn';
import { ErrorsContext } from '@/lib/context';

export default function AdminPostEdit() {
  const { locale } = useRouter();
  let navbarData;
  let footerData;
  let errorsData;
  let authPageData;

  switch (locale) {
    case 'ar':
      navbarData = navbarAr;
      footerData = footerAr;
      errorsData = errorsAr;
      authPageData = authPageAr;
      break;
    case 'zh-cn':
      navbarData = navbarZhCn;
      footerData = footerZhCn;
      errorsData = errorsZhCn;
      authPageData = authPageZhCn;
      break;
    default:
      navbarData = navbarEn;
      footerData = footerEn;
      errorsData = errorsEn;
      authPageData = authPageEn;
  }

  return (
    <Layout
      title="Symput - Provide feedback"
      navbarData={navbarData}
      footerData={footerData}
    >
      <AuthCheck authPageData={authPageData}>
        <ErrorsContext.Provider value={errorsData}>
          <FeedbackManager />
        </ErrorsContext.Provider>
      </AuthCheck>
    </Layout>
  );
}
