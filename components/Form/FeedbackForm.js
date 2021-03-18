import { serverTimestamp } from '@/lib/firebase';
import ImageUploader from '@/components/ImageUploader';

import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

const FeedbackForm = ({ defaultValues, postRef, preview }) => {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: 'onChange'
  });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp()
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <ReactMarkdown className="prose mx-auto max-w-markdown sm:max-w-prose">
          {watch('content')}
        </ReactMarkdown>
      )}

      <div>
        <ImageUploader />

        <textarea
          name="content"
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' }
          })}
        ></textarea>

        {errors.content && (
          <p className="text-danger">{errors.content.message}</p>
        )}

        <fieldset>
          <input name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>

        <button
          type="submit"
          className="btn-green"
          disabled={!isDirty || !isValid}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
export default FeedbackForm;
