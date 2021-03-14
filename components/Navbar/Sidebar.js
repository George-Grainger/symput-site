import uuid from 'react-uuid';
import LoggedOut from './loggedOut';
import Navlink from './Navlink';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ links, open, clickHandler, closeAria }) => {
  const { username } = useContext(UserContext);
  return (
    <aside
      className={` ${
        open ? 'top-0' : '-top-full'
      } fixed z-50 w-full h-full flex bg-white dark:bg-gray-900 dark:text-white justify-center items-center transition-all duration-200 overflow-auto`}
    >
      <button
        aria-label={closeAria}
        onClick={clickHandler}
        className={`${
          open ? 'block' : 'hidden'
        } p-3 absolute top-3 right-3 link-standard`}
      >
        <FaTimes className="h-8 w-8" />
      </button>
      <ul
        className={` ${open ? 'grid' : 'hidden'} gap-4 align-items-center pt-8`}
      >
        {links?.map(({ text, link }) => {
          return (
            <Navlink key={uuid()} href={link} sidebar>
              {text}
            </Navlink>
          );
        })}
        {/* user is not signed OR has not created username */}
        {!username && (
          <LoggedOut
            loginText={'Login'}
            className={`${open ? 'block' : 'hidden'} btn-lg text-xl`}
          />
        )}
      </ul>
    </aside>
  );
};

export default Sidebar;
