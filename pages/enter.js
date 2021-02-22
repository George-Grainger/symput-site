import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import Metatags from '@/components/Metatags';
import UsernameForm from '@/components/Login/UsernameForm';
import Layout from 'layout/Layout';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import SignOutButton from '@/components/Login/SignOutButton';
import Login from '@/components/Login';

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
  const { user, username } = useContext(UserContext);

  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <Metatags title="Enter" description="Sign up for this amazing app!" />
      {user ? !username ? <UsernameForm /> : <SignOutButton /> : <Login />}
    </Layout>
  );
}
