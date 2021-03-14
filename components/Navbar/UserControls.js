import Link from 'next/link';
import { FaFingerprint, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { auth } from '@/lib/firebase';
import toast from 'react-hot-toast';

const UserControls = ({ username, visible }) => {
  const signOut = () => {
    toast.promise(auth.signOut(), {
      loading: 'Logging out',
      success: <b>Logged out successfully</b>,
      error: <b>Uh oh, something went wrong, please try again.</b>
    });
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
                <p className="font-semibold">Admin</p>
                <p className="text-sm">View the admin area</p>
              </div>
            </a>
          </Link>

          <Link href={`/${username}`}>
            <a className="usercontrol-button button-on-bg">
              <FaUserCircle className="h-6 w-6 ml-3" />
              <div className="ml-3">
                <p className="font-semibold">Profile</p>
                <p className="text-sm">View your current profile</p>
              </div>
            </a>
          </Link>

          <button
            className="usercontrol-button button-on-bg"
            aria-label="Log out"
            onClick={signOut}
          >
            <FaSignOutAlt className="h-6 w-6 ml-3" />
            <div className="ml-3">
              <p className="font-semibold">Log out</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserControls;
