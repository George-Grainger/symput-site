import { auth, firestore } from '@/lib/firebase';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useAsync } from './useAsync';

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, loading, error] = useAuthState(auth);

  const getUsername = async () => {
    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      const doc = await ref.get();
      if (doc.exists) {
        return doc.data()?.username;
      }
    }
    return null;
  };

  const { loading: usernameLoading, result: username, execute } = useAsync({
    asyncFunction: getUsername
  });

  useEffect(execute, [user]);

  return {
    user,
    username,
    usernameLoading,
    loading,
    error,
    verified: user?.emailVerified
  };
}
