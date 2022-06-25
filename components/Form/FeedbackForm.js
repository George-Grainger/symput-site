import ImageUploader from '@/components/AdminArea/ImageUploader';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import ResizingTextArea from './ResizingTextArea';
import Link from 'next/link';
import { serverTimestamp, updateDoc } from 'firebase/firestore';

const FeedbackForm = ({ defaultValues, postRef, preview }) => {
  const { register, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const { errors, isValid, isDirty } = formState;

  const updatePost = async ({ summary, content, published }) => {
    toast.promise(
      updateDoc(postRef, {
        summary,
        content,
        published,
        updatedAt: serverTimestamp()
      }),
      {
        loading: 'Saving...',
        success: 'Post updated successfully!',
        error: 'Could not save, please try again.'
      }
    );

    reset({ summary, content, published });
  };

  return (
    <form
      className="w-full md:col-span-2 -mt-16"
      onSubmit={handleSubmit(updatePost)}
    >
      <div className="prose dark:prose-dark max-w-none">
        <ResizingTextArea
          label="Summary"
          errors={errors}
          className="w-full mt-2 mb-4 dark:bg-gray-900 transition-darkmode"
          parentClassName={`${
            preview ? 'hidden' : ''
          } border-t border-b border-gray-900 dark:border-gray-200 my-2`}
          labelclassname={`${preview ? 'hidden' : ''} text-xl label`}
          value={watch('summary')}
          {...register('summary', {
            maxLength: { value: 1000, message: 'Summary is too long' }
          })}
        />

        {preview ? (
          <ReactMarkdown
            className="mx-auto max-w-[100vw-4rem] sm:max-w-prose"
            components={{
              link: ({ children, href }) => {
                return (
                  <Link href={href}>
                    <a>{children}</a>
                  </Link>
                );
              }
            }}
          >
            {watch('content')}
          </ReactMarkdown>
        ) : (
          <>
            <ImageUploader />
          </>
        )}

        <ResizingTextArea
          label="Main Content"
          errors={errors}
          className="w-full mt-2 mb-4 dark:bg-gray-900 transition-darkmode"
          parentClassName={`${
            preview ? 'hidden' : ''
          } border-t border-b border-gray-900 dark:border-gray-200 my-2`}
          labelclassname={`${preview ? 'hidden' : ''} text-xl label required`}
          value={watch('content')}
          {...register('content', {
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' }
          })}
        />

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <div className="flex items-center justify-between py-4 bottom-0 sticky bg-white dark:bg-gray-900 transition-darkmode">
          <div className="relative flex items-center">
            <input
              tabIndex="0"
              {...register('published')}
              type="checkbox"
              className="checkbox"
            />
            <label
              htmlFor="published"
              className="text-xl checkbox-label ml-2 md:ml-4"
            >
              Published
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-green"
            disabled={!isDirty || !isValid}
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
};
export default FeedbackForm;
