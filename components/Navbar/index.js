import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/context';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navlink from './Navlink';
import { FaBars, FaCog } from 'react-icons/fa';

// Top navbar
export default function Navbar({ transparent }) {
  const { username } = useContext(UserContext);

  const [navScrolled, setNavScrolled] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setNavScrolled(true);
    } else {
      setNavScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);

    return () => {
      window.removeEventListener('scroll', changeNav);
    };
  }, []);

  return (
    <nav
      className={
        (transparent && !navScrolled
          ? 'bg-transparent text-white'
          : 'bg-white text-black shadow-lg') +
        ' fixed z-50 top-0 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg transition'
      }
    >
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
        <Link href="/">
          <a className="flex items-center text-xl font-bold leading-relaxed py-2 whitespace-no-wrap uppercase hover:text-yellow-400">
            <Image src="/symput-textless.png" width="48" height="48" />
            Symput
          </a>
        </Link>
        <ul className="lg:flex hidden gap-4 xl:gap-8">
          <Navlink href="/">Aims</Navlink>
          <Navlink href="/">The Team</Navlink>
          <Navlink href="/">Release Date</Navlink>
          <Navlink href="/">Feedback</Navlink>
        </ul>

        <ul className="flex items-center gap-4 lg:gap-12">
          {/* user is signed-in and has username */}
          {username && <LoggedIn />}

          {/* user is not signed OR has not created username */}
          {!username && <LoggedOut />}

          <button
            className="cursor-pointer text-xl px-3 py-1 focus:outline-none hover:text-yellow-400"
            type="button"
            onClick={() => console.log('Nothing set yet')}
          >
            <FaCog />
          </button>
          <button
            className="cursor-pointer block lg:hidden text-xl px-3 py-1 focus:outline-none hover:text-yellow-400"
            type="button"
            onClick={() => console.log('Nothing set yet')}
          >
            <FaBars />
          </button>
        </ul>
      </div>
    </nav>
  );
}
