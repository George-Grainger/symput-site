import Link from 'next/link';
import Image from 'next/image';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/context';
import LoggedIn from './loggedIn';
import LoggedOut from './loggedOut';
import Navlink from './Navlink';
import { FaBars } from 'react-icons/fa';
import uuid from 'react-uuid';
import Sidebar from './Sidebar';
import Settings from './Settings';
import SymputLogo from '../Icons/SymputLogo';

// Top navbar
export default function Navbar({ data, transparent }) {
  const { links, loginText, sidebarInfo, settingsInfo } = data;
  const { sidebarOpenAria, sidebarCloseAria } = sidebarInfo;
  const { user, username, loading, error } = useContext(UserContext);
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
            : 'bg-white text-black dark:text-white dark:bg-gray-900 shadow-lg') +
          ' fixed z-40 top-0 w-full flex flex-wrap items-center justify-between px-2 py-3 transition-darkmode'
        }
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between xl:relative">
          <Link href="/">
            <a className="flex items-center text-2xl font-bold leading-relaxed p-2 whitespace-no-wrap uppercase link-standard">
              <SymputLogo height="48" width="48" />
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

          <ul className="flex items-center gap-2 md:gap-6">
            <li>
              <Settings {...settingsInfo} />
            </li>
            <li>
              <button
                aria-label={sidebarOpenAria}
                className="block lg:hidden text-xl sm:p-2 p-3 focus:outline-none link-standard"
                onClick={() => setSidebarOpen(true)}
              >
                <FaBars className="h-6 w-6" />
              </button>
            </li>

            {/* user is not signed OR has not created username */}
            {!username && <LoggedOut loginText={loginText} />}

            {/* user is signed-in and has username */}
            {username && <LoggedIn />}
          </ul>
        </div>
      </nav>
      <Sidebar
        closeAria={sidebarCloseAria}
        links={links}
        open={sidebarOpen}
        clickHandler={() => setSidebarOpen(false)}
      />
    </>
  );
}
