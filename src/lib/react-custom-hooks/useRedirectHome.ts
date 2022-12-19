import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const useRedirectHome = () => {
  const [redirectOnce, setRedirectOnce] = useState(false);
  const [userLogin, setUserLogin] = useState(true);
  const nextRouter = useRouter();

  useEffect(() => {
    if (redirectOnce) return;
    const disableAuthStateChanged = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const userEmail = user.email;
        const username = userEmail?.slice(0, userEmail?.indexOf('@'));
        nextRouter.replace(`/${username}`);
      } else {
        setUserLogin(() => false);
      }
    });

    setRedirectOnce(() => true);
    return () => disableAuthStateChanged();
  }, [nextRouter, redirectOnce]);

  return {
    userLogin,
  };
};
