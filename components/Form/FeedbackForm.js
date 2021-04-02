import { serverTimestamp } from '@/lib/dbUtils';
import ImageUploader from '@/components/AdminArea/ImageUploader';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';
import ResizingTextArea from './ResizingTextArea';

const FeedbackForm = ({ defaultValues, postRef, preview }) => {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ summary, content, published }) => {
    toast.promise(
      postRef.update({
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
          className="w-full mt-2 mb-4 dark:bg-gray-900"
          parentClassName={`${
            preview ? 'hidden' : ''
          } border-t border-b border-gray-900 dark:border-gray-200 my-2`}
          labelclassname={`${preview ? 'hidden' : ''} text-xl label`}
          name="summary"
          ref={register({
            maxLength: { value: 1000, message: 'Summary is too long' }
          })}
        />

        {preview ? (
          <ReactMarkdown className="mx-auto max-w-markdown sm:max-w-prose">
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
          className="w-full mt-2 mb-4 dark:bg-gray-900"
          parentClassName={`${
            preview ? 'hidden' : ''
          } border-t border-b border-gray-900 dark:border-gray-200 my-2`}
          labelclassname={`${preview ? 'hidden' : ''} text-xl label required`}
          name="content"
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' }
          })}
        />

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <div className="flex items-center justify-between py-4 bottom-0 sticky bg-white dark:bg-gray-900">
          <div className="relative flex items-center">
            <input
              name="published"
              type="checkbox"
              ref={register}
              className="checkbox"
            />
            <label className="text-xl checkbox-label ml-2 md:ml-4">
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
