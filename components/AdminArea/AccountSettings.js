import { useContext } from 'react';
import { AdminContext, UserContext } from '@/lib/context';
import { FaCheckCircle } from 'react-icons/fa';
import SignInForm from '../Form/SignInForm';
import toast from 'react-hot-toast';

const AccountSettings = () => {
  const { user, username, loading, error } = useContext(UserContext);
  const { accountSettings_i18n } = useContext(AdminContext);
  const handleDelete = () => {};

  return (
    <>
      <div className="prose prose-xl dark:prose-dark mx-auto flex flex-wrap justify-between items-end">
        <h3 className="flex-auto">{accountSettings_i18n.info_i18n}</h3>
        <button className="link-standard px-2 text-yellow-400">
          {user?.info
            ? accountSettings_i18n.update_i18n
            : accountSettings_i18n.add_i18n}
        </button>
        <p className="text-center w-full">
          {loading
            ? accountSettings_i18n.loading_i18n
            : user?.info || accountSettings_i18n.describeYourself_i18n}
        </p>
        <h3 className="flex-auto">{accountSettings_i18n.email}</h3>
        <button className="link-standard px-2 text-yellow-400">
          {user?.email
            ? accountSettings_i18n.update_i18n
            : accountSettings_i18n.add_i18n}
        </button>
        <p className="text-center w-full">
          {loading
            ? accountSettings_i18n.loading_i18n
            : user?.email || accountSettings_i18n.addEmail_i18n}
        </p>
        <div className="w-full flex items-end">
          <h3 className="flex-auto">{accountSettings_i18n.verfied_i18n}</h3>
          {user?.emailVerified ? (
            <p className="flex items-center">
              {accountSettings_i18n.isVerified_i18n}
              <FaCheckCircle className="text-green-500 ml-2 dark:bg-white bg-gray-900 rounded-full" />
            </p>
          ) : (
            <button className="link-standard px-2 text-yellow-400">
              {accountSettings_i18n.verifyNow_i18n}
            </button>
          )}
        </div>
        {/* <h3 className="flex-auto">Related services</h3> */}
      </div>
      <button className="btn btn-yellow mx-auto block my-8">
        {accountSettings_i18n.updatePassword_i18n}
      </button>
      <button onClick={handleDelete} className="btn btn-red mx-auto block">
        {accountSettings_i18n.deleteAccount_i18n}
      </button>
    </>
  );
};

export default AccountSettings;
