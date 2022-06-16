import { useContext, useState } from 'react';
import { AdminContext, UserContext } from '@/lib/context';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useModalState } from '@/lib/useModalState';
import Modal from '../Modal';
import { getProvider } from '@/lib/authUtils';
import AccountDeleteForm from '@/components/Form/AccountDeleteForm';
import UpdatePasswordForm from '@/components/Form/UpdatePasswordForm';
import UpdateEmailForm from '../Form/UpdateEmailForm';
import { HiChevronDoubleRight } from 'react-icons/hi';
import UpdateAccountInfoForm from '../Form/UpdateAccountInfoForm';
import { deleteUserStorage } from '@/lib/storage';
import { useRouter } from 'next/router';
import {
  deleteUser,
  reauthenticateWithPopup,
  sendEmailVerification
} from 'firebase/auth';

const AccountSettings = () => {
  const { locale } = useRouter();
  const { user, loading } = useContext(UserContext);
  const { accountSettings_i18n, accountPopups_i18n } = useContext(AdminContext);
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
          <button
            onClick={() => toast.dismiss(t.id)}
            className="absolute right-4"
          >
            <FaTimes className=" h-6 w-6 link link-light-bg" />
          </button>
          <span className="font-semibold text-xl flex-auto">
            {accountPopups_i18n.verification_i18n}
          </span>
          <span className="mt-4">
            {locale == 'ar'
              ? `${email} ${accountPopups_i18n.verificationLink_i18n}`
              : `${accountPopups_i18n.verificationLink_i18n} ${email}`}
          </span>
          <button
            onClick={() => {
              if (firstClick) {
                firstClick = false;
                handleVerification(() => {
                  toast.dismiss(t.id);
                  toast.success(accountPopups_i18n.verificationSuccess_i18n);
                });
              } else {
                sendEmailVerification(user);
              }
            }}
            className="btn btn-black-inverted mt-4 w-full"
          >
            {accountPopups_i18n.resendVerification_i18n}
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
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute right-4"
            >
              <FaTimes className=" h-6 w-6 link link-light-bg" />
            </button>
            <span className="font-semibold text-xl flex-auto">
              {accountPopups_i18n.checkingIdentity_i18n}
            </span>
            <button
              onClick={() => {
                toast
                  .promise(reauthenticateWithPopup(user, provider), {
                    loading: accountPopups_i18n.verificationProcessing_i18n,
                    success: accountPopups_i18n.verificationSuccess_i18n,
                    error: accountPopups_i18n.verifiationError_i18n
                  })
                  .then(() => {
                    deleteUserStorage(user.uid);
                    toast.dismiss(t.id);
                    deleteUser(user);
                  });
              }}
              className="btn btn-black-inverted mt-4 w-full"
            >
              {accountPopups_i18n.verifyThroughAuth_i18n}
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
          {user?.emailVerified ? (
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
            title={accountPopups_i18n.checkingIdentity_i18n}
            button1={accountPopups_i18n.exit_i18n}
            handleClose={onUpdatePassordFormClose}
            zIndex="z-40"
          >
            <UpdatePasswordForm closeModal={onUpdatePassordFormClose} />
          </Modal>
        </>
      )}

      <Modal
        hidden={!updateEmailFormOpen}
        title={accountPopups_i18n.checkingIdentity_i18n}
        button1={accountPopups_i18n.exit_i18n}
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
        title={accountPopups_i18n.updatePassword_i18n}
        zIndex="z-40"
        handleClose={onDeleteFormClose}
      >
        <p className="font-semibold text-xl pb-8">
          {accountPopups_i18n.allInfoWillDelete_i18n}
        </p>
        <AccountDeleteForm />
      </Modal>
    </>
  );
};

export default AccountSettings;
