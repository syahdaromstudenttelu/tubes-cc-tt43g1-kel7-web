import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { PrimaryButton } from '../../components/buttons';
import { Input } from '../../components/form-inputs';
import ErrorMessage from '../../components/ErrorMessage';
import { ralewayFont } from '../../lib/myNextFonts';

export default function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState('Maaf, terjadi kesalahan');
  const btnDisabledStatus = userEmail === '' || userPassword === '';

  const onEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserEmail(() => inputValue);
  };

  const onPasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setUserPassword(() => inputValue);
  };

  const onLogin = () => {};

  return (
    <main className={`${ralewayFont.variable}`}>
      <Head>
        <title>GOVEL | Masuk</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

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
                  <label htmlFor="email-input" className="inline-block w-full">
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
                  <PrimaryButton disabled={btnDisabledStatus} onClick={onLogin}>
                    Masuk
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
