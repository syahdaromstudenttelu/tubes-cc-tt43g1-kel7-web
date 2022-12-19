import type { AppProps } from 'next/app';
import { Provider as ReduxProvider } from 'react-redux';
import FirebaseApp from '../components/FirebaseApp';
import { reduxStore } from '../redux-app/store/store';
import '../styles/globals.css';

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={reduxStore}>
      <FirebaseApp>
        <Component {...pageProps} />
      </FirebaseApp>
    </ReduxProvider>
  );
}
