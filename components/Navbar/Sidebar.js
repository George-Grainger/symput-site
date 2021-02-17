import uuid from 'react-uuid';
import LoggedOut from './loggedOut';
import Navlink from './Navlink';
import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { FaTimes } from 'react-icons/fa';

const Sidebar = ({ links, open, clickHandler }) => {
  const { username } = useContext(UserContext);
  return (
    <div
      className={` ${
        open ? 'top-0 opacity-100' : '-top-full opacity-0'
      } fixed z-50 w-full h-full flex bg-white justify-center items-center transition-all duration-300`}
    >
      <div onClick={clickHandler} className="p-3 absolute top-3 right-3">
        <FaTimes className="h-12 w-12" />
      </div>
      <ul className="flex flex-col items-center">
        {links?.map(({ text, link }) => {
          return (
            <Navlink key={uuid()} href={link} sidebar>
              {text}
            </Navlink>
          );
        })}
        {/* user is not signed OR has not created username */}
        {!username && (
          <LoggedOut loginText={'Login'} className={'btn-lg text-2xl'} />
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
