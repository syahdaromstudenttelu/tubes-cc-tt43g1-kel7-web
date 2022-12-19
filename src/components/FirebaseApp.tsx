import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from 'firebase/functions';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

interface FirebaseAppProps {
  children: ReactNode;
}

const firebaseConfig = {
  apiKey: 'AIzaSyD4Vw_52PCyltlY10mKMv31KhksXJ7lAPU',
  authDomain: 'fir-playground-1-4d5c3.firebaseapp.com',
  projectId: 'fir-playground-1-4d5c3',
  storageBucket: 'fir-playground-1-4d5c3.appspot.com',
  messagingSenderId: '968282978649',
  appId: '1:968282978649:web:78a2d69268374093eef448',
  measurementId: 'G-3MKG70KY9Y',
};

initializeApp(firebaseConfig);

export default function FirebaseApp({ children }: FirebaseAppProps) {
  const [initFirebaseEnv, setInitFirebaseEnv] = useState(false);

  useEffect(() => {
    if (window.location.hostname === 'localhost') {
      connectAuthEmulator(getAuth(), 'http://127.0.0.1:9099');
      connectFunctionsEmulator(getFunctions(), '127.0.0.1', 5001);
    }

    setInitFirebaseEnv(() => true);
  }, []);

  if (initFirebaseEnv === false) {
    return null;
  } else {
    return <>{children}</>;
  }
}
