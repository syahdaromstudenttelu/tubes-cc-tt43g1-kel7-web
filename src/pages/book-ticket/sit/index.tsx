import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import SitOptions from '../../../components/book-ticket-sit/SitOptions';
import { SecondaryButtonLink } from '../../../components/button-links';
import { PrimaryButton } from '../../../components/buttons';
import ErrorMessage from '../../../components/ErrorMessage';
import ProfileButton from '../../../components/ProfileButton';
import { interFont, ralewayFont } from '../../../lib/myNextFonts';
import { useRedirectDashboard } from '../../../lib/react-custom-hooks/useRedirectDashboard';
import { useTicketAvailability } from '../../../lib/react-custom-hooks/useTicketAvailability';
import { alertSelector, setAlert } from '../../../redux-app/slices/alertSlice';
import {
  bookTicketInputSelector,
  setBookDate,
  setBookFrom,
  setBookShift,
  setBookSitPos,
  setBookTo,
} from '../../../redux-app/slices/bookTicketSlice';
import type { TicketSitPos } from '../../../redux-app/slices/userBookedTicketsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux-app/typed-hook/typedHooks';

export default function BookTicketSit() {
  const [redirectOnce, setRedirectOnce] = useState(false);
  const { updateTicketAvailability } = useTicketAvailability();
  const { username, userLogin } = useRedirectDashboard();
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const { bookDate, bookShift, bookSitPos } = useAppSelector(
    bookTicketInputSelector
  );
  const { showAlert, alertMessage } = useAppSelector(alertSelector);
  const disableBookSitBtn = bookSitPos === null;
  const bookingTicketDateIsEmpty = bookDate === '' || bookShift === '';

  const onInputBookSit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = Number.parseInt(e.currentTarget.value) as TicketSitPos;
    reduxDispatch(setBookSitPos(selectValue));
  };

  const onBookNextBtn = () => {
    if (disableBookSitBtn) return;
    reduxDispatch(setAlert({ alertMessage: '', showAlert: false }));
    nextRouter.push(`/book-ticket/passanger-data`);
  };

  const onClearBookTicket = () => {
    reduxDispatch(setAlert({ alertMessage: '', showAlert: false }));
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
  };

  useEffect(() => {
    if (redirectOnce) return;
    if (userLogin === false) return;
    if (bookingTicketDateIsEmpty) {
      const redirect = async () => {
        await updateTicketAvailability();
        nextRouter.replace('/book-ticket/date');
      };
      redirect();
    }

    setRedirectOnce(true);
  }, [
    bookingTicketDateIsEmpty,
    nextRouter,
    redirectOnce,
    updateTicketAvailability,
    userLogin,
  ]);

  if (userLogin === false || bookingTicketDateIsEmpty) {
    return null;
  } else {
    return (
      <main className={`${ralewayFont.variable} ${interFont.variable}`}>
        <Head>
          <title>GOVEL | Form Pemesanan Kursi Tiket</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>

        <div className="h-screen w-full">
          <div className="grid h-full grid-cols-2">
            <div className="relative h-full">
              <div
                className="h-full bg-hero-bg bg-cover bg-right"
                aria-hidden="true"
                role="presentation"
              />

              <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-t from-black/80 to-transparent" />

              <p className="absolute bottom-4 left-3 text-xs text-slate-400">
                Gambar milik{' '}
                <a
                  href="https://unsplash.com/@tristanhess?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Tristan Hess
                </a>{' '}
                dari{' '}
                <a
                  href="https://unsplash.com/s/photos/mini-bus?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                  className="underline"
                >
                  Unsplash
                </a>
              </p>
            </div>

            <section className="h-full">
              <div className="grid h-full p-4">
                <div>
                  <div className="mb-16 flex items-center justify-between">
                    <div>
                      <Link
                        className="inline-block rounded-lg bg-slate-200/50 px-2 py-1 transition-colors duration-300 hover:bg-slate-200 hover:outline-none"
                        href={`/${username}`}
                        onClick={onClearBookTicket}
                      >
                        Tiket Anda
                      </Link>
                    </div>

                    <ProfileButton />
                  </div>

                  <div className="mb-6 min-h-[142px] text-center">
                    <h1 className="mb-1 cursor-default select-none font-raleway text-6xl font-bold text-slate-700">
                      GOVEL
                    </h1>

                    <p className="mb-4 text-lg font-semibold">
                      Yukk bepergian dengan Go Travel!
                    </p>

                    <ErrorMessage showError={showAlert}>
                      {alertMessage}
                    </ErrorMessage>
                  </div>

                  <div>
                    <form className="mx-auto max-w-md">
                      <section className="mb-6 min-h-[200px]">
                        <label
                          htmlFor="from-city"
                          className="inline-block w-full"
                        >
                          <p className="mb-6 text-center text-2xl font-semibold">
                            Pilih Kursi
                          </p>

                          <select
                            id="from-city"
                            className="inline-block w-full px-3 py-3"
                            value={bookSitPos === null ? '' : bookSitPos}
                            onChange={onInputBookSit}
                          >
                            <SitOptions />
                          </select>
                        </label>
                      </section>

                      <section>
                        <div className="mb-2">
                          <PrimaryButton
                            disabled={disableBookSitBtn}
                            onClick={onBookNextBtn}
                          >
                            Lanjut
                          </PrimaryButton>
                        </div>

                        <SecondaryButtonLink hrefPath={`/book-ticket/date`}>
                          Kembali
                        </SecondaryButtonLink>
                      </section>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }
}
