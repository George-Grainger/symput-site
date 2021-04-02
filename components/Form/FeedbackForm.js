import { serverTimestamp } from '@/lib/dbUtils';
import ImageUploader from '@/components/AdminArea/ImageUploader';
import { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const FeedbackForm = ({ defaultValues, postRef, preview }) => {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange'
  });
  const parentRef = useRef(null);
  const [parentHeight, setParentHeight] = useState('auto');
  const [textAreaHeight, setTextAreaHeight] = useState('auto');

  useEffect(() => {
    setParentHeight(`${parentRef.current.firstChild.scrollHeight}px`);
    setTextAreaHeight(`${parentRef.current.firstChild.scrollHeight}px`);
  }, [textAreaHeight]);

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    toast.promise(
      postRef.update({
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

    reset({ content, published });
  };

  return (
    <form
      className="w-full md:col-span-2 -mt-16"
      onSubmit={handleSubmit(updatePost)}
    >
      <div className="prose dark:prose-dark max-w-none">
        {preview ? (
          <ReactMarkdown className="mx-auto max-w-markdown sm:max-w-prose">
            {watch('content')}
          </ReactMarkdown>
        ) : (
          <>
            <ImageUploader />
            <label htmlFor="content" className="label required text-xl">
              Main content:
            </label>
          </>
        )}

        <div
          ref={parentRef}
          style={{ minHeight: parentHeight }}
          className={`${
            preview ? 'hidden' : ''
          } border-t border-b border-gray-900 dark:border-gray-200 my-2`}
        >
          <textarea
            style={{
              height: textAreaHeight,
              resize: 'none'
            }}
            className="w-full mt-2 mb-4 dark:bg-gray-900"
            name="content"
            onChange={() => setTextAreaHeight('auto')}
            ref={register({
              maxLength: { value: 20000, message: 'content is too long' },
              minLength: { value: 10, message: 'content is too short' },
              required: { value: true, message: 'content is required' }
            })}
          />
        </div>

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
