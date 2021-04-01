import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { FaLock } from 'react-icons/fa';
import ButtonEllipsis from './Loading/ButtonEllipsis';

// Component's children only shown to logged-in users
export default function AuthCheck(props) {
  const { username, user, loading, usernameLoading } = useContext(UserContext);

  const getCurrentState = () => {
    if (loading) {
      return (
        <>
          <h1 className="text-3xl mb-8">Loading account</h1>
          <ButtonEllipsis
            className="h-12"
            color="bg-gray-900 dark:bg-gray-200"
          />
        </>
      );
    } else if (!user) {
      return (
        <>
          <h1 className="text-3xl mb-8">You must have an account</h1>
          <Link href="/sign-in">
            <a className="btn btn-black-inverted dark:btn-yellow-inverted">
              Sign in
            </a>
          </Link>
        </>
      );
    } else if (usernameLoading) {
      return (
        <>
          <h1 className="text-3xl mb-8">Getting username</h1>
          <ButtonEllipsis
            className="h-12"
            color="bg-gray-900 dark:bg-gray-200"
          />
        </>
      );
    } else {
      return (
        <>
          <h1 className="text-3xl mb-8">Account setup incomplete</h1>
          <Link href="/sign-in">
            <a className="btn btn-black-inverted dark:btn-yellow-inverted">
              Add username
            </a>
          </Link>
        </>
      );
    }
  };

  return username
    ? props.children
    : props.fallback || (
        <section className="section-default section-default-padding justify-center">
          <div className="text-center dark:text-gray-200">
            <FaLock className="h-64 w-64 mb-8 mx-auto" />
            {getCurrentState()}
          </div>
        </section>
      );
}
