import { auth } from '@/lib/authUtils';
import { firestore } from '@/lib/dbUtils';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [verified, setVerified] = useState(auth?.currentUser?.emailVerified);

  //TODO set this up to use useAsync and store it in auth utils?
  const handleVerification = (callback) => {
    if (!auth.currentUser?.emailVerified) {
      user?.sendEmailVerification();
      const check = setInterval(() => {
        if (!auth.currentUser?.emailVerified) {
          auth.currentUser
            ?.reload()
            .then(() => {
              setVerified(auth.currentUser?.emailVerified);
            })
            .catch((e) => console.log(e));
        }
        // Not using else as chance it will change after reload in previous if
        if (auth.currentUser?.emailVerified) {
          callback && callback?.();
          clearInterval(check);
        }
      }, 3000);
    } else {
      callback && callback?.();
    }
  };

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot(async (doc) => {
        setUsername(doc.data()?.username);
        setUsernameLoading(false);
      });
    } else {
      setUsername(null);
      setUsernameLoading(true);
    }

    return unsubscribe;
  }, [user]);

  return {
    user,
    username,
    usernameLoading,
    loading,
    error,
    verified,
    handleVerification
  };
}
