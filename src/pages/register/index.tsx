import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
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

export default function Register() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [registerProcess, setRegisterProcess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Maaf, terjadi kesalahan');
  const { userLogin } = useRedirectHome();
  const nextRouter = useRouter();
  const btnDisabledStatus =
    userEmail === '' ||
    userPassword === '' ||
    userPassword.length < 6 ||
    registerProcess;

  const onEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserEmail(() => inputValue);
  };

  const onPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserPassword(() => inputValue);
  };

  const onRegister = async () => {
    try {
      if (registerProcess) return;
      setRegisterProcess(() => true);
      setShowErrorMsg(() => false);

      const emailIsEmpty = isEmpty(userEmail, { ignore_whitespace: true });

      if (emailIsEmpty)
        throw new RegisterError('Mohon isi email Anda dengan benar', 'email');

      const passwordIsInvalid = userPassword.length < 6;

      if (passwordIsInvalid)
        throw new RegisterError(
          'Mohon isi password Anda minimal 6 karakter',
          'password-length'
        );

      const createdUser = await createUserWithEmailAndPassword(
        getAuth(),
        userEmail,
        userPassword
      );

      const signedUserEmail = createdUser.user.email;
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
        error.code === 'auth/email-already-in-use'
      ) {
        setErrorMsg('Maaf email telah digunakan');
      }

      if (
        error instanceof FirebaseError &&
        error.code === 'auth/invalid-email'
      ) {
        setErrorMsg('Mohon isi email Anda dengan benar');
      }

      if (
        error instanceof FirebaseError &&
        error.code === 'auth/weak-password'
      ) {
        setErrorMsg('Mohon isi password Anda minimal 6 karakter');
      }

      setRegisterProcess(() => false);
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

        <LoadingScreen hide={registerProcess === false} />

        <div className="h-screen w-full">
          <div className="grid h-full items-center">
            <div>
              <div className="mb-6 text-center">
                <h2 className="mb-2 cursor-default select-none font-raleway text-4xl font-bold">
                  GOVEL
                </h2>

                <p className="mb-2 text-2xl font-bold">Registrasi Akun</p>

                <p className="mb-4">
                  Sudah memiliki akun?{' '}
                  <Link href="/login" className="text-slate-500 underline">
                    Silakan masuk
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
                        placeholder="Password (min 6 karakter)"
                        value={userPassword}
                        onChange={onPasswordInput}
                      />
                    </label>
                  </section>

                  <section>
                    <PrimaryButton
                      disabled={btnDisabledStatus}
                      onClick={onRegister}
                    >
                      {registerProcess ? 'Sedang memproses...' : 'Buat akun'}
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
