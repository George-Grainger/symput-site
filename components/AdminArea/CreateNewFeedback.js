import { UserContext, ErrorsContext, AdminContext } from '@/lib/context';
import { useContext } from 'react';
import { useRouter } from 'next/router';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { FaPlusCircle } from 'react-icons/fa';
import Modal from '@/components/Modal';
import { useModalState } from '@/lib/useModalState';
import { useForm } from 'react-hook-form';
import Input from '@/components/Form/Input';
import { createFeedback } from '@/lib/db-utils';

const CreateNewFeedback = () => {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  const { createFeedbackErrors } = useContext(ErrorsContext);
  const { createFeedback_i18n } = useContext(AdminContext);
  const { isOpen, onToggle, onClose } = useModalState();
  const { register, errors, handleSubmit, watch } = useForm();
  const title = watch('feedbackTitle');

  const createPost = async ({ feedbackTitle, feedbackSlug }) => {
    await toast.promise(
      createFeedback(feedbackTitle, feedbackSlug, user, username),
      createFeedback_i18n.toast_i18n
    );

    router.push(`/admin/${feedbackSlug}`);
  };

  return (
    <>
      <button
        className="p-8 mt-6 bg-transparent rounded-lg min-w-feedback prose prose-xl dark:prose-dark border-4 border-dashed border-gray-900 dark:border-gray-300 text-center cursor-pointer max-w-none"
        onClick={onToggle}
      >
        <h3>{createFeedback_i18n.title_i18n}</h3>
        <p>{createFeedback_i18n.letUsKnow_i18n}</p>
        <FaPlusCircle className="h-10 w-10 mx-auto" />
      </button>
      <Modal
        hidden={!isOpen}
        title={createFeedback_i18n.modalTitle_i18n}
        button1={createFeedback_i18n.modalButton1_i18n}
        button2={createFeedback_i18n.modalButton2_i18n}
        handleClose={onClose}
        handleSave={handleSubmit(createPost)}
        zIndex="z-40"
      >
        <form>
          <Input
            className="input-bg-toggle mb-4"
            labelclassname="font-semibold text-lg"
            required
            label={createFeedback_i18n.titleInputLabel_i18n}
            errors={errors}
            placeholder={createFeedback_i18n.titleInputPlaceholder_i18n}
            name="feedbackTitle"
            ref={register({
              required: true,
              minLength: {
                value: 5,
                message: createFeedbackErrors.minLengthTitle_i18n
              },
              maxLength: {
                value: 20,
                message: createFeedbackErrors.maxLengthtitle_i18n
              }
            })}
          />
          <Input
            className="input-bg-toggle mb-4"
            labelclassname="font-semibold text-lg"
            required
            label={createFeedback_i18n.slugInputLabel_i18n}
            errors={errors}
            defaultValue={encodeURI(kebabCase(title))}
            name="feedbackSlug"
            ref={register({
              required: true,
              pattern: {
                value: /^(?=[a-zA-Z0-9._-]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                message: createFeedbackErrors.minLengthSlug_i18n
              },
              minLength: {
                value: 3,
                message: createFeedbackErrors.maxLengthSlug_i18n
              },
              maxLength: {
                value: 50,
                message: createFeedbackErrors.invallidSlug
              }
            })}
          />
        </form>
      </Modal>
    </>
  );
};

export default CreateNewFeedback;
