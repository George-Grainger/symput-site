import { firestore } from '@/lib/dbUtils';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(getAuth());
  const [username, setUsername] = useState(null);
  const [usernameLoading, setUsernameLoading] = useState(true);

  //TODO set this up to use useAsync and store it in auth utils?
  const handleVerification = (callback) => {
    if (!user?.emailVerified) {
      sendEmailVerification(user).catch((e) => console.log(e));
      const check = setInterval(() => {
        if (!user?.emailVerified) {
          user?.reload().catch((e) => console.log(e));
        }
        // Not using else as chance it will change after reload in previous if
        if (user?.emailVerified) {
          callback && callback?.();
          clearInterval(check);
        }
      }, 3000);
    } else {
      callback?.();
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
    handleVerification
  };
}
