import { useRef } from 'react';
import { firestore } from '@/lib/firebase';
import debounce from 'lodash.debounce';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { UserContext } from '@/lib/context';
import { useEffect, useState, useCallback, useContext } from 'react';
import UsernameMessage from '@/components/Login/UsernameMessage';
import Input from '../Form/Input';

const UsernameForm = () => {
  const [loading, setLoading] = useState(false);
  const { user, username, verified } = useContext(UserContext);
  const { register, watch, errors, handleSubmit } = useForm();
  const isInitialMount = useRef(true);

  const currentChoice = useRef({});
  currentChoice.current = watch('username');

  const onSubmit = async (e) => {
    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
      provider: user.providerData[0].providerId,
      email: user.email
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch
      .commit()
      .then(Router.push('/admin'))
      .catch(console.log('Error'));
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      checkUsername(currentChoice.current);
      setLoading(true);
    }
  }, [currentChoice.current]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username?.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        // setIsValid(!exists);
        setLoaded(true);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <div className="gridgap-x-10 z-10">
        <h1 className="text-3xl font-semibold w-full">You're In!</h1>
        <hr className="my-6 border-b-1 border-gray-200" />
        <div className=""></div>
        <h2 className="font-bold text-xl">Time to pick a username</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="required" htmlFor="username">
            Username
          </label>
          <input
            className="input"
            name="username"
            placeholder="username"
            ref={register({
              required: true,
              minLength: 3,
              maxLength: 20,
              pattern: /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/
            })}
          />
          <UsernameMessage
            // username={formValue}
            // isValid={isValid}
            loading={loading}
          />
          <input
            type="submit"
            className="btn btn-yellow"
            // disabled={!isValid}
          ></input>

          <h3>Debug State</h3>
          <div>
            Loading: {loading.toString()}
            <br />
            {/* Username Valid: {isValid.toString()} */}
            <br />
            Choice {currentChoice.current}
          </div>
        </form>
      </div>
    )
  );
};

export default UsernameForm;
