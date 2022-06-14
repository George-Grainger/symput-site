import { useContext, useState } from 'react';
import { AdminContext, UserContext } from '@/lib/context';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import ResizingTextArea from './ResizingTextArea';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import { useAsync } from '@/lib/useAsync';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import { getUserRef, updateAboutInfo } from '@/lib/dbUtils';
import { useDocumentData } from 'react-firebase-hooks/firestore';

const UpdateAccountInfoForm = () => {
  const { loading, username } = useContext(UserContext);
  const { accountSettings_i18n, accountPopups_i18n } = useContext(AdminContext);

  const userRef = getUserRef();
  const [realTimeUser] = useDocumentData(userRef);

  const [editing, setEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState,
    reset,
  } = useForm();

  const {
    errors,
  } = formState;

  const { isDirty } = formState;

  const updateUserInfo = async ({ newAboutInfo }) => {
    const success = await updateAboutInfo(newAboutInfo, username);
    if (success) {
      toast.success(accountPopups_i18n.aboutUpdateSuccess_i18n);
      reset({ newAboutInfo });
    } else {
      toast.error(accountPopups_i18n.error_i18n);
    }
  };

  const { loading: loadingUpdate, execute } = useAsync({
    asyncFunction: updateUserInfo
  });

  return <>
    <button
      onClick={() => setEditing(!editing)}
      className="mb-5 link-standard underline px-2"
    >
      {!editing
        ? realTimeUser?.aboutInfo
          ? accountSettings_i18n.update_i18n
          : accountSettings_i18n.add_i18n
        : accountPopups_i18n.cancel_i18n}
      <HiChevronDoubleRight className="ml-1 inline" />
    </button>
    {editing ? (
      <form
        onSubmit={handleSubmit(execute)}
        className="w-full flex flex-wrap"
      >
        <ResizingTextArea
          label={accountPopups_i18n.aboutYou_i18n}
          errors={errors}
          className="w-full mt-2 mb-4 dark:bg-gray-900"
          parentClassName="border-t border-b border-gray-900 dark:border-gray-200 my-2 py-4 w-full"
          labelclassname="invisible h-0"
          defaultValue={realTimeUser?.aboutInfo}
          {...register('newAboutInfo', {
            maxLength: {
              value: 1000,
              message: accountPopups_i18n.contentTooLong_i18n
            }
          })} />
        <div className="ml-auto my-6">
          <button
            disabled={loadingUpdate}
            className="btn dark:btn-yellow-inverted text-base btn-black mr-8"
            onClick={() => setEditing(false)}
          >
            {accountPopups_i18n.cancel_i18n}
          </button>

          <button
            type="submit"
            className="btn text-base btn-green"
            disabled={!isDirty || loadingUpdate}
          >
            {loadingUpdate ? (
              <ButtonEllipsis color="bg-white" />
            ) : (
              accountPopups_i18n.saveChanges_i18n
            )}
          </button>
        </div>
      </form>
    ) : (
      <ReactMarkdown
        className="text-center w-full"
        unwrapDisallowed={true}
        allowedTypes={['root', 'text', 'paragraph']}
      >
        {loading
          ? accountSettings_i18n.loading_i18n
          : realTimeUser?.aboutInfo ||
            accountSettings_i18n.describeYourself_i18n}
      </ReactMarkdown>
    )}
  </>;
};

export default UpdateAccountInfoForm;
