import Link from 'next/link';
import { useContext } from 'react';
import { NavContext } from '@/lib/context';
export default function LoggedOut({
  className = 'btn hidden lg:block md:mx-3'
}) {
  const { loginText_i18n } = useContext(NavContext);
  return (
    <li className="flex justify-center">
      <Link href="/sign-in">
        <a className={`${className} btn-yellow lg:my-0 my-6`}>
          {loginText_i18n}
        </a>
      </Link>
    </li>
  );
}
