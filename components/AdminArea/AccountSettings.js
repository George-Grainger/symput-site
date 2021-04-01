import { useContext, useState } from 'react';
import { AdminContext, UserContext } from '@/lib/context';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useModalState } from '@/lib/useModalState';
import Modal from '../Modal';
import { getProvider } from '@/lib/authUtils';
import PasswordAccountDeleteForm from '@/components/Form/PasswordAccountDeleteForm';

const AccountSettings = () => {
  const { user, loading } = useContext(UserContext);
  const { accountSettings_i18n } = useContext(AdminContext);
  const {
    isOpen: deleteFromOpen,
    onOpen: onDeleteFormOpen,
    onClose: onDeleteFormClose
  } = useModalState();
  const [email, setEmail] = useState(user?.email);

  const openReauthCheck = () => {
    const providerData = user?.providerData;
    if (
      providerData?.length === 1 &&
      providerData[0]?.providerId === 'password'
    ) {
      onDeleteFormOpen();
    } else {
      handleProviderReauth();
    }
  };

  const handleProviderReauth = () => {
    const provider = getProvider(user?.providerData);
    if (provider) {
      toast(
        (t) => (
          <div className="flex flex-wrap text-center">
            <button className="absolute right-4">
              <FaTimes
                onClick={() => toast.dismiss(t.id)}
                className=" h-6 w-6 link link-light-bg"
              />
            </button>
            <span className="font-semibold text-xl flex-auto">
              Checking it's you
            </span>
            <button
              onClick={() => {
                toast
                  .promise(user?.reauthenticateWithPopup(provider), {
                    loading: 'Verifying',
                    success: 'Identity confirmed',
                    error: "You couldn't be verified"
                  })
                  .then(() => {
                    toast.dismiss(t.id);
                    user?.delete();
                    // user.updateEmail('georgegrainger1008@gmail.com');
                  })
                  // .then(() => setEmail('georgegrainger1008@gmail.com'))
                  .catch((e) => console.error(e));
              }}
              className="btn btn-black-inverted mt-4 w-full"
            >
              Verify through auth provider
            </button>
          </div>
        ),
        { duration: 40000000 }
      );
    }
  };

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
            : email || accountSettings_i18n.addEmail_i18n}
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
      <button onClick={openReauthCheck} className="btn btn-red mx-auto block">
        {accountSettings_i18n.deleteAccount_i18n}
      </button>

      <Modal
        hidden={!deleteFromOpen}
        title="Checking it's you"
        button1="Exit"
        handleClose={onDeleteFormClose}
        zIndex="z-40"
      >
        <p className="font-semibold text-xl pb-8">
          This will delete your account and all associated feedback
        </p>
        <PasswordAccountDeleteForm />
      </Modal>

      {/* <Modal hidden={!isOpen} title="Checking it's you" zIndex="z-40">
        <p className="font-semibold text-xl pb-8">
          This will delete your account and all associated feedback
        </p>
        <PasswordAccountDeleteForm />
      </Modal> */}
    </>
  );
};

export default AccountSettings;
