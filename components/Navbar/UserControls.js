import Link from 'next/link';
import { useContext } from 'react';
import { FaFingerprint, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { auth } from '@/lib/authUtils';
import toast from 'react-hot-toast';
import { NavContext } from '@/lib/context';

const UserControls = ({ username, visible }) => {
  const {
    admin_i18n,
    adminTagline_i18n,
    profile_i18n,
    profileTagline_i18n,
    signOut_i18n,
    signOutToast_i18n
  } = useContext(NavContext);
  const signOut = () => {
    toast.dismiss();
    toast.promise(auth.signOut(), signOutToast_i18n);
  };

  return (
    <div
      className={` ${
        visible ? 'block' : 'hidden'
      } absolute w-full right-0 md:w-64 3xl:-right-16 top-18 origin-top`}
    >
      <div className="px-2 pt-2 pb-4 text-gray-900 bg-white rounded-md shadow-lg dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-4">
          <Link href={`/admin`}>
            <a className="usercontrol-button button-on-bg">
              <FaFingerprint className="h-6 w-6 ml-3" />
              <div className="ml-3">
                <p className="font-semibold">{admin_i18n}</p>
                <p className="text-sm">{adminTagline_i18n}</p>
              </div>
            </a>
          </Link>

          <Link href={`/${username}`}>
            <a className="usercontrol-button button-on-bg">
              <FaUserCircle className="h-6 w-6 ml-3" />
              <div className="ml-3">
                <p className="font-semibold">{profile_i18n}</p>
                <p className="text-sm">{profileTagline_i18n}</p>
              </div>
            </a>
          </Link>

          <button
            className="usercontrol-button button-on-bg"
            aria-label={signOut_i18n}
            onClick={signOut}
          >
            <FaSignOutAlt className="h-6 w-6 ml-3" />
            <div className="ml-3">
              <p className="font-semibold">{signOut_i18n}</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserControls;
