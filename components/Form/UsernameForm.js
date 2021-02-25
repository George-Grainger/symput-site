import { useForm } from 'react-hook-form';
import debounce from 'lodash.debounce';
import Router from 'next/router';
import { UserContext } from '@/lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';
import UsernameMessage from '@/components/Form/UsernameMessage';
import ButtonEllipsis from '../Loading/ButtonEllipsis';
import { uploadUserDataPostLogin, usernameExists } from '@/lib/firestoreUtils';

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, errors, handleSubmit } = useForm();
  const { user, validated } = useContext(UserContext);
  const re = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

  const onSubmit = async (e) => {
    uploadUserDataPostLogin(user, formValue)
      // .then(() => {
      //   if(verfied)
      //   Router.push('/admin')
      // })
      .catch(console.log('Error'));
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
        const exists = await usernameExists(username);
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <div className="grid w-full h-full gap-x-10">
      <h1 className="text-3xl font-semibold w-full">You're In</h1>
      <hr className="my-6 border-b-1 border-gray-200" />
      <form
        className="grid gap-4 text-left md:w-3/5 mx-auto md:pt-20"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="username" className="required font-bold text-lg">
          Username
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
              message: 'Usernames must be 3 characters or more'
            },
            maxLength: {
              value: 20,
              message: 'Usernames must be 20 characters or less'
            },
            pattern: {
              value: re,
              message: 'Username is invalid'
            }
          })}
        />
        <button
          type="submit"
          className="btn btn-yellow my-4"
          // disabled={!isValid}
        >
          {loading ? <ButtonEllipsis /> : 'Choose'}
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
