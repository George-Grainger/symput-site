import { useContext } from 'react';
import { UserContext } from '@/lib/context';
import { FaCheckCircle } from 'react-icons/fa';
import SignInForm from '../Form/SignInForm';
import { auth, emailAuthProvider, googleAuthProvider } from '@/lib/firebase';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { user, username, loading, error } = useContext(UserContext);
  const handleDelete = () => {};

  return (
    <>
      <div className="prose prose-xl dark:prose-dark mx-auto flex flex-wrap justify-between items-end">
        <h3 className="flex-auto">Info</h3>
        <button className="link-standard px-2 text-yellow-400">
          {user?.info ? 'Update' : 'Add'}
        </button>
        <p className="text-center w-full">
          {loading ? 'Loading...' : user?.info || 'Describe yourself...'}
        </p>
        <h3 className="flex-auto">Email</h3>
        <button className="link-standard px-2 text-yellow-400">
          {user?.email ? 'Update' : 'Add'}
        </button>
        <p className="text-center w-full">
          {loading ? 'Loading...' : user?.email || 'Please add an email'}
        </p>
        <div className="w-full flex items-end">
          <h3 className="flex-auto">Verified</h3>
          {user?.emailVerified ? (
            <p className="flex items-center">
              You're verified
              <FaCheckCircle className="text-green-500 ml-2 dark:bg-white bg-gray-900 rounded-full" />
            </p>
          ) : (
            <button className="link-standard px-2 text-yellow-400">
              Verify now
            </button>
          )}
        </div>
        {/* <h3 className="flex-auto">Related services</h3> */}
      </div>
      <button className="btn btn-yellow mx-auto block my-8">
        Update password
      </button>
      <button onClick={handleDelete} className="btn btn-red mx-auto block">
        Delete account
      </button>
    </>
  );
};

export default AccountSettings;
