import { db } from '@/lib/dbUtils';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
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
      const userRef = doc(db, 'users', user.uid);
      unsubscribe = onSnapshot(userRef, async (d) => {
        setUsername(d.data()?.username);
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
