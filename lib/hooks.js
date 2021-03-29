import { auth, firestore } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [usernameLoading, setUsernameLoading] = useState(true);

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
    verified: user?.emailVerified
  };
}
