import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuth() {
  const auth = getAuth();
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        setAuthUser({ id: uid, email, isAuth: !!email, role: 'User' });
      }
    });
  }, [auth]);

  return { ...authUser };
}
