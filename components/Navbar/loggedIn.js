import { useState, useContext } from 'react';
import { UserContext } from '@/lib/context';
import Image from 'next/image';
import UserControls from './UserControls';

export default function LoggedIn() {
  const { user, username } = useContext(UserContext);
  const [dropDownVisible, setDropDownVisible] = useState(false);

  return (
    <li>
      <Image
        height="40px"
        width="40px"
        onClick={() => setDropDownVisible(!dropDownVisible)}
        src={user?.photoURL || '/hacker.png'}
        className="rounded-full max-w-full mx-auto h-12 w-12 cursor-pointer"
      />
      <UserControls username={username} visible={dropDownVisible} />
    </li>
  );
}
