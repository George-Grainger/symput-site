import { useForm } from 'react-hook-form';
import { firestore } from '@/lib/firebase';
import debounce from 'lodash.debounce';
import { useEffect, useState, useCallback, useContext } from 'react';
import UsernameMessage from '@/components/Form/UsernameMessage';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import toast from 'react-hot-toast';
import { updateUsername } from '@/lib/db-utils';
import { SignInContext, ErrorsContext } from '@/lib/context';

const UsernameForm = () => {
  const { usernameForm_i18n } = useContext(SignInContext);
  const {
    heading_i18n,
    subheading_i18n,
    username_i18n,
    button_i18n,
    toast_i18n
  } = usernameForm_i18n;

  const { usernameErrors_i18n } = useContext(ErrorsContext);

  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const re = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const onSubmit = async () => {
    toast.promise(updateUsername(formValue), toast_i18n);
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3 && username.length <= 20) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <div className="grid w-full h-full gap-x-10">
      <h1 className="text-3xl font-semibold w-full">{heading_i18n}</h1>
      <hr className="my-6 border-b-1 border-gray-200" />
      <h2 className="text-2xl font-semibold text-cente ">{subheading_i18n}</h2>
      <form
        className="grid gap-4 text-left md:w-3/5 mx-auto md:pt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="required font-bold text-lg">
          {username_i18n}
        </label>
        <input
          className="input"
          name="username"
          placeholder="username"
          value={formValue}
          onChange={onChange}
          ref={register({
            required: true,
            minLength: {
              value: 3,
              message: usernameErrors_i18n.minLength_i18n
            },
            maxLength: {
              value: 20,
              message: usernameErrors_i18n.maxLength_i18n
            },
            pattern: {
              value: re,
              message: usernameErrors_i18n.pattern_i18n
            }
          })}
        />
        <button type="submit" className="btn btn-yellow my-4">
          {loading ? <ButtonEllipsis /> : button_i18n}
        </button>

        <UsernameMessage
          username={formValue}
          isValid={isValid}
          loading={loading}
          error={errors.username}
        />
      </form>
    </div>
  );
};

export default UsernameForm;
