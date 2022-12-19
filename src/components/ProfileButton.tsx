import cn from 'classnames';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { setAlert } from '../redux-app/slices/alertSlice';
import {
  setBookDate,
  setBookFrom,
  setBookPassangerName,
  setBookPassangerPhone,
  setBookShift,
  setBookSitPos,
  setBookTo,
  setBookTotalPayment,
  setTicketId,
} from '../redux-app/slices/bookTicketSlice';
import { useAppDispatch } from '../redux-app/typed-hook/typedHooks';

export default function ProfileButton() {
  const [username, setUsername] = useState('');
  const [closeProfileMenu, setCloseProfileMenu] = useState(true);
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();

  const onProfileMenu = () => setCloseProfileMenu((prevValue) => !prevValue);

  const onSignOut = async () => {
    reduxDispatch(setAlert({ alertMessage: '', showAlert: false }));
    reduxDispatch(setTicketId(''));
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
    reduxDispatch(setBookPassangerName(''));
    reduxDispatch(setBookPassangerPhone(''));
    reduxDispatch(setBookTotalPayment(0));

    await signOut(getAuth());
    nextRouter.replace('/');
  };

  useEffect(() => {
    const disableAuthStateChanged = onAuthStateChanged(getAuth(), (user) => {
      if (user === null) return;
      const userEmail = user.email;
      if (userEmail === null) return;
      const username = userEmail.slice(0, userEmail.indexOf('@'));
      setUsername(() => username);
    });

    return () => disableAuthStateChanged();
  }, []);

  if (username === '') {
    return null;
  } else {
    return (
      <div className="relative">
        <button
          type="button"
          className="inline-block rounded bg-gray-200 px-2 py-1 font-semibold"
          onClick={onProfileMenu}
        >
          Hi, {username}!
        </button>

        <button
          type="button"
          className={cn(
            'absolute top-[120%] left-0 inline-block w-full rounded bg-slate-600 px-2 py-1 font-semibold text-slate-100',
            {
              hidden: closeProfileMenu,
            }
          )}
          onClick={onSignOut}
        >
          Keluar
        </button>
      </div>
    );
  }
}
