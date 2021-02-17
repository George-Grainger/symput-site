import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/context';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navlink from './Navlink';
import { FaBars, FaCog } from 'react-icons/fa';
import uuid from 'react-uuid';
import Sidebar from './Sidebar';

// Top navbar
export default function Navbar({ data, transparent }) {
  const { links, loginText } = data;
  const { username } = useContext(UserContext);

  const [navScrolled, setNavScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <>
      <nav
        className={
          (transparent && !navScrolled
            ? 'bg-transparent text-white'
            : 'bg-white text-black shadow-lg') +
          ' fixed z-40 top-0 w-full flex flex-wrap items-center justify-between px-2 py-3 transition'
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <Link href="/">
            <a className="flex items-center text-3xl font-bold leading-relaxed py-2 whitespace-no-wrap uppercase hover:text-yellow-400">
              <Image
                src="/symput-textless.png"
                alt="Symput logo"
                width="48"
                height="48"
                priority
              />
              Symput
            </a>
          </Link>
          <ul className="lg:flex hidden gap-4 xl:gap-8">
            {links?.map(({ text, link }) => {
              return (
                <Navlink key={uuid()} href={link}>
                  {text}
                </Navlink>
              );
            })}
          </ul>

          <ul className="flex items-center gap-4 lg:gap-12">
            {/* user is not signed OR has not created username */}
            {!username && <LoggedOut loginText={loginText} />}

            <li>
              <button
                ariaLabel="Open settings"
                className="cursor-pointer text-xl px-3 py-1 focus:outline-none hover:text-yellow-400"
                onClick={() => console.log('Nothing set yet')}
              >
                <FaCog className="h-8 w-8" />
              </button>
            </li>
            <li>
              <button
                ariaLabel="Open sidebar navigation"
                className="cursor-pointer block lg:hidden text-xl px-3 py-1 focus:outline-none hover:text-yellow-400"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars className="h-8 w-8" />
              </button>
            </li>
            {/* user is signed-in and has username */}
            {username && <LoggedIn />}
          </ul>
        </div>
      </nav>
      <Sidebar
        links={links}
        open={sidebarOpen}
        clickHandler={() => setSidebarOpen(false)}
      />
    </>
  );
}
