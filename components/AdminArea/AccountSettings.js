import { useContext, useState } from 'react';
import { AdminContext, UserContext } from '@/lib/context';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useModalState } from '@/lib/useModalState';
import Modal from '../Modal';
import { getProvider, auth } from '@/lib/authUtils';
import AccountDeleteForm from '@/components/Form/AccountDeleteForm';
import UpdatePasswordForm from '@/components/Form/UpdatePasswordForm';
import UpdateEmailForm from '../Form/UpdateEmailForm';
import { HiChevronDoubleRight } from 'react-icons/hi';
import UpdateAccountInfoForm from '../Form/UpdateAccountInfoForm';

const AccountSettings = () => {
  const { user, loading } = useContext(UserContext);
  const { accountSettings_i18n } = useContext(AdminContext);
  const providerId = user?.providerData[0]?.providerId;

  const {
    isOpen: deleteFromOpen,
    onToggle: onDeleteFormToggle,
    onClose: onDeleteFormClose
  } = useModalState();

  const {
    isOpen: updatePasswordFormOpen,
    onToggle: onUpdatePassordFormToggle,
    onClose: onUpdatePassordFormClose
  } = useModalState();

  const {
    isOpen: updateEmailFormOpen,
    onToggle: onUpdateEmailFormToggle,
    onClose: onUpdateEmailFormClose
  } = useModalState();

  const [email, setEmail] = useState(user?.email);

  const shutAllModals = () => {
    onDeleteFormClose();
    onUpdatePassordFormClose();
  };

  const triggerVerification = () => {
    toast(
      (t) => (
        <div className="flex flex-wrap text-center">
          <button className="absolute right-4">
            <FaTimes
              onClick={() => toast.dismiss(t.id)}
              className=" h-6 w-6 link link-light-bg"
            />
          </button>
          <span className="font-semibold text-xl flex-auto">Verification</span>
          <span className="mt-4">
            Press the link to send a verification email to {email}
          </span>
          <button
            onClick={() => {
              if (firstClick) {
                firstClick = false;
                handleVerification(() => {
                  toast.dismiss(t.id);
                  toast.success('Successfully verified');
                });
              } else {
                user?.sendEmailVerification();
              }
            }}
            className="btn btn-black-inverted mt-4 w-full"
          >
            Resend verification
          </button>
        </div>
      ),
      { duration: 40000000 }
    );
  };

  const handleProviderReauth = () => {
    if (providerId) {
      const provider = getProvider(providerId);
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
                  });
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
        <UpdateAccountInfoForm />
        <h3 className="flex-auto">{accountSettings_i18n.email}</h3>
        <button
          onClick={() => {
            shutAllModals();
            onUpdateEmailFormToggle();
          }}
          className="mb-5 link-standard underline px-2"
        >
          {user?.email
            ? accountSettings_i18n.update_i18n
            : accountSettings_i18n.add_i18n}
          <HiChevronDoubleRight className="ml-1 inline" />
        </button>
        <p className="text-center w-full">
          {loading
            ? accountSettings_i18n.loading_i18n
            : email || accountSettings_i18n.addEmail_i18n}
        </p>
        <div className="w-full flex items-end">
          <h3 className="flex-auto">{accountSettings_i18n.verfied_i18n}</h3>
          {auth?.currentUser?.emailVerified ? (
            <p className="flex items-center">
              {accountSettings_i18n.isVerified_i18n}
              <FaCheckCircle className="text-green-500 ml-2 dark:bg-white bg-gray-900 rounded-full" />
            </p>
          ) : (
            <button
              onClick={triggerVerification}
              className="mb-5 link-standard underline px-2"
            >
              {accountSettings_i18n.verifyNow_i18n}
              <HiChevronDoubleRight className="ml-1 inline" />
            </button>
          )}
        </div>
      </div>

      {providerId === 'password' && (
        <>
          <button
            onClick={() => {
              shutAllModals();
              onUpdatePassordFormToggle();
            }}
            className="btn btn-yellow mx-auto block mt-8"
          >
            {accountSettings_i18n.updatePassword_i18n}
          </button>
          <Modal
            hidden={!updatePasswordFormOpen}
            title="Checking it's you"
            button1="Exit"
            handleClose={onUpdatePassordFormClose}
            zIndex="z-40"
          >
            <UpdatePasswordForm closeModal={onUpdatePassordFormClose} />
          </Modal>
        </>
      )}

      <Modal
        hidden={!updateEmailFormOpen}
        title="Checking it's you"
        button1="Exit"
        handleClose={onUpdateEmailFormClose}
        zIndex="z-40"
      >
        <UpdateEmailForm
          closeModal={onUpdateEmailFormClose}
          providerId={providerId}
          setEmail={setEmail}
        />
      </Modal>

      <button
        onClick={() => {
          shutAllModals();
          providerId === 'password'
            ? onDeleteFormToggle()
            : handleProviderReauth();
        }}
        className="btn btn-red mx-auto block mt-8"
      >
        {accountSettings_i18n.deleteAccount_i18n}
      </button>

      <Modal
        hidden={!deleteFromOpen}
        title="Update password"
        zIndex="z-40"
        handleClose={onDeleteFormClose}
      >
        <p className="font-semibold text-xl pb-8">
          This will delete your account and all associated feedback
        </p>
        <AccountDeleteForm />
      </Modal>
    </>
  );
};

export default AccountSettings;
