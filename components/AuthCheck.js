import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { FaLock } from 'react-icons/fa';
import ButtonEllipsis from './Loading/ButtonEllipsis';

// Component's children only shown to logged-in users
export default function AuthCheck({ children, fallback, authPageData }) {
  const { username, user, loading, usernameLoading } = useContext(UserContext);
  const {
    loadingAccount_i18n,
    requiresAccount_i18n,
    signIn_i18n,
    loadingUsername_i18n,
    incomplete,
    addUsername_i18n
  } = authPageData;

  const getCurrentState = () => {
    if (loading) {
      return (
        <>
          <h1 className="text-3xl mb-8">{loadingAccount_i18n}</h1>
          <ButtonEllipsis
            className="h-12"
            color="bg-gray-900 dark:bg-gray-200"
          />
        </>
      );
    } else if (!user) {
      return (
        <>
          <h1 className="text-3xl mb-8">{requiresAccount_i18n}</h1>
          <Link href="/sign-in">
            <a className="btn btn-black-inverted dark:btn-yellow-inverted">
              {signIn_i18n}
            </a>
          </Link>
        </>
      );
    } else if (usernameLoading) {
      return (
        <>
          <h1 className="text-3xl mb-8">{loadingUsername_i18n}</h1>
          <ButtonEllipsis
            className="h-12"
            color="bg-gray-900 dark:bg-gray-200"
          />
        </>
      );
    } else {
      return (
        <>
          <h1 className="text-3xl mb-8">{incomplete}</h1>
          <Link href="/sign-in">
            <a className="btn btn-black-inverted dark:btn-yellow-inverted">
              {addUsername_i18n}
            </a>
          </Link>
        </>
      );
    }
  };

  return username
    ? children
    : fallback || (
        <section className="section-default section-default-padding justify-center">
          <div className="text-center dark:text-gray-200">
            <FaLock className="h-64 w-64 mb-8 mx-auto" />
            {getCurrentState()}
          </div>
        </section>
      );
}
