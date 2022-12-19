import { FirebaseError } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useState } from 'react';
import isEmpty from 'validator/lib/isEmpty';
import { PrimaryButton } from '../../components/buttons';
import ErrorMessage from '../../components/ErrorMessage';
import { Input } from '../../components/form-inputs';
import LoadingScreen from '../../components/LoadingScreen';
import RegisterError from '../../lib/error-class/RegisterError';
import { ralewayFont } from '../../lib/myNextFonts';
import { useRedirectHome } from '../../lib/react-custom-hooks/useRedirectHome';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [loginProcess, setLoginProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Maaf, terjadi kesalahan');
  const { userLogin } = useRedirectHome();
  const nextRouter = useRouter();
  const btnDisabledStatus =
    userEmail === '' || userPassword === '' || loginProcess;

  const onEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserEmail(() => inputValue);
  };

  const onPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserPassword(() => inputValue);
  };

  const onLogin = async () => {
    try {
      if (loginProcess) return;
      setLoginProcess(() => true);
      setShowErrorMsg(() => false);

      const emailIsEmpty = isEmpty(userEmail, { ignore_whitespace: true });

      if (emailIsEmpty)
        throw new RegisterError('Mohon isi email Anda dengan benar', 'email');

      const passwordIsInvalid = userPassword.length < 0;

      if (passwordIsInvalid)
        throw new RegisterError('Mohon isi password Anda', 'password-length');

      const signedUser = await signInWithEmailAndPassword(
        getAuth(),
        userEmail,
        userPassword
      );

      const signedUserEmail = signedUser.user.email;
      const dasboardUnamePath = signedUserEmail?.slice(
        0,
        signedUserEmail?.indexOf('@')
      );

      nextRouter.replace(`/${dasboardUnamePath}`);
    } catch (error) {
      if (error instanceof RegisterError && error.cause === 'email') {
        setErrorMsg(error.message);
      }

      if (error instanceof RegisterError && error.cause === 'password-length') {
        setErrorMsg(error.message);
      }

      if (
        error instanceof FirebaseError &&
        error.code === 'auth/invalid-email'
      ) {
        setErrorMsg('Maaf email Anda tidak valid');
      }

      if (
        error instanceof FirebaseError &&
        error.code === 'auth/user-not-found'
      ) {
        setErrorMsg('Maaf email Anda belum terdaftar');
      }

      if (
        error instanceof FirebaseError &&
        error.code === 'auth/wrong-password'
      ) {
        setErrorMsg('Maaf password salah untuk akun email Anda');
      }

      setLoginProcess(() => false);
      setShowErrorMsg(() => true);
    }
  };

  if (userLogin === true) {
    return null;
  } else {
    return (
      <main className={`${ralewayFont.variable}`}>
        <Head>
          <title>GOVEL | Masuk</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <LoadingScreen hide={loginProcess === false} />

        <div className="h-screen w-full">
          <div className="grid h-full items-center">
            <div>
              <div className="mb-6 text-center">
                <h2 className="mb-2 cursor-default select-none font-raleway text-4xl font-bold">
                  GOVEL
                </h2>

                <p className="mb-2 text-2xl font-bold">Masuk Akun</p>

                <p className="mb-4">
                  Belum memiliki akun?{' '}
                  <Link href="/register" className="text-slate-500 underline">
                    Silakan registrasi
                  </Link>
                </p>

                <ErrorMessage showError={showErrorMsg}>{errorMsg}</ErrorMessage>
              </div>

              <div className="mx-auto max-w-2xl">
                <form>
                  <section className="mb-8 grid gap-y-4">
                    <label
                      htmlFor="email-input"
                      className="inline-block w-full"
                    >
                      <Input
                        id="email-input"
                        type="email"
                        placeholder="Email"
                        value={userEmail}
                        onChange={onEmailInput}
                      />
                    </label>

                    <label
                      htmlFor="password-input"
                      className="inline-block w-full"
                    >
                      <Input
                        id="password-input"
                        type="password"
                        placeholder="Password"
                        value={userPassword}
                        onChange={onPasswordInput}
                      />
                    </label>
                  </section>

                  <section>
                    <PrimaryButton
                      disabled={btnDisabledStatus}
                      onClick={onLogin}
                    >
                      {loginProcess ? 'Sedang memproses...' : 'Masuk'}
                    </PrimaryButton>
                  </section>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
