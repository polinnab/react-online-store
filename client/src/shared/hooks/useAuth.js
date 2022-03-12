import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export default function useAuth() {
  const auth = getAuth();
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        setAuthUser({ id: uid, email, isAuth: !!email, role: 'User' });
				console.log('if user', user);
      } else {
				console.log('else');
			}
    });
  }, [auth]);

  return { ...authUser };
}
