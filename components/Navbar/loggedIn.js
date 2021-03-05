import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/router';
import LinkableAvatar from '../LinkableAvatar';

export default function LoggedIn() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <li>
      <Link href={`/${username}`} passHref>
        {/* next/image doesn't appear to work with photourl - would be worth looking into since domain needs to be provided. */}
        <LinkableAvatar
          height="40px"
          width="40px"
          onClick={signOut}
          src={user?.photoURL || '/hacker.png'}
          className="shadow-lg rounded-full max-w-full mx-auto h-12 w-12 cursor-pointer"
        />
      </Link>
    </li>
  );
}
