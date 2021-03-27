import { UserContext } from '@/lib/context';
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
  const { isOpen, onToggle, onClose } = useModalState();
  const { register, errors, handleSubmit, watch } = useForm();
  const title = watch('feedbackTitle');

  const createPost = async ({ feedbackTitle, feedbackSlug }) => {
    await toast.promise(
      createFeedback(feedbackTitle, feedbackSlug, user, username),
      {
        loading: 'Initalising feedback',
        success: 'Feedback Initalised!',
        error: 'Uh oh, please try again.'
      }
    );

    router.push(`/admin/${feedbackSlug}`);
  };

  return (
    <>
      <button
        className="p-8 mt-6 bg-transparent rounded-lg min-w-feedback prose prose-xl dark:prose-dark border-4 border-dashed border-gray-900 dark:border-gray-300 text-center cursor-pointer max-w-none"
        onClick={onToggle}
      >
        <h3>Create Feedback</h3>
        <p>Let us know what else you have to say</p>
        <FaPlusCircle className="h-10 w-10 mx-auto" />
      </button>
      <Modal
        hidden={!isOpen}
        title="Create A New Post"
        button1="Later"
        button2="Create Post"
        handleClose={onClose}
        handleSave={handleSubmit(createPost)}
        zIndex="z-40"
      >
        <form>
          <Input
            className="input-bg-toggle mb-4"
            labelclassname="font-semibold text-lg"
            required
            label="Title"
            errors={errors}
            placeholder="My interesting title"
            name="feedbackTitle"
            ref={register({
              required: true,
              minLength: {
                value: 5,
                message: 'Your title must be 5 charcters or more'
              },
              maxLength: {
                value: 20,
                message: 'Your title must be 20 characters or less'
              }
            })}
          />
          <Input
            className="input-bg-toggle mb-4"
            labelclassname="font-semibold text-lg"
            required
            label="Slug"
            errors={errors}
            defaultValue={encodeURI(kebabCase(title))}
            name="feedbackSlug"
            ref={register({
              required: true,
              pattern: {
                value: /^(?=[a-zA-Z0-9._-]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                message: 'The format of your slug is not valid'
              },
              minLength: {
                value: 3,
                message: 'Your slug must be 3 characters or more'
              },
              maxLength: {
                value: 50,
                message: 'Your slug must be 50 characters or less'
              }
            })}
          />
        </form>
      </Modal>
    </>
  );
};

export default CreateNewFeedback;
