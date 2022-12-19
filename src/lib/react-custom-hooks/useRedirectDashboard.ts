import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useRedirectDashboard = () => {
  const [redirectOnce, setRedirectOnce] = useState(false);
  const [username, setUsername] = useState('');
  const [userLogin, setUserLogin] = useState(false);
  const nextRouter = useRouter();
  useEffect(() => {
    if (redirectOnce) return;
    const disableAuthStateChanged = onAuthStateChanged(getAuth(), (user) => {
      if (user === null) {
        nextRouter.replace('/');
      } else {
        const userEmail = user.email;
        if (userEmail === null) return;
        const username = userEmail.slice(0, userEmail.indexOf('@'));
        setUsername(() => username);
        setUserLogin(() => true);
      }
    });

    setRedirectOnce(true);
    return () => disableAuthStateChanged();
  }, [nextRouter, redirectOnce]);

  return {
    username,
    userLogin,
  };
};
