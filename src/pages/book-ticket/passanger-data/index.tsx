import axios, { AxiosError } from 'axios';
import { format } from 'date-fns';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import { SecondaryButtonLink } from '../../../components/button-links';
import { PrimaryButton } from '../../../components/buttons';
import { Input } from '../../../components/form-inputs';
import LoadingScreen from '../../../components/LoadingScreen';
import ProfileButton from '../../../components/ProfileButton';
import { interFont, ralewayFont } from '../../../lib/myNextFonts';
import { useApiEndpoint } from '../../../lib/react-custom-hooks/useApiEndpoint';
import { useRedirectDashboard } from '../../../lib/react-custom-hooks/useRedirectDashboard';
import { useTicketAvailability } from '../../../lib/react-custom-hooks/useTicketAvailability';
import { setAlert } from '../../../redux-app/slices/alertSlice';
import {
  bookTicketInputSelector,
  setBookDate,
  setBookFrom,
  setBookPassangerName,
  setBookPassangerPhone,
  setBookShift,
  setBookSitPos,
  setBookTo,
  setBookTotalPayment,
  setTicketId,
} from '../../../redux-app/slices/bookTicketSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux-app/typed-hook/typedHooks';

interface BookTicketErrorDataProps {
  status: string;
  message: string;
  errorCaused: 'sit' | 'shift' | 'date' | 'previous-date';
}

export default function BookTicketSit() {
  const [redirectOnce, setRedirectOnce] = useState(false);
  const { bookTicketAPI } = useApiEndpoint();
  const [bookingProcess, setBookingProcess] = useState(false);
  const [redirectProcess, setRedirectProcess] = useState(false);
  const { updateTicketAvailability } = useTicketAvailability();
  const { username, userLogin } = useRedirectDashboard();
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const {
    bookFrom,
    bookTo,
    bookDate,
    bookShift,
    bookSitPos,
    bookPassangerName,
    bookPassangerPhone,
  } = useAppSelector(bookTicketInputSelector);
  const disableBookingBtn =
    bookPassangerName === '' || bookPassangerPhone === '' || bookingProcess;
  const bookingTicketDateIsEmpty = bookDate === '' || bookShift === '';
  const bookingTicketSitIsEmpty = bookSitPos === null;

  const onInputBookPassangerName = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    reduxDispatch(setBookPassangerName(inputValue));
  };

  const onInputBookPassangerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    reduxDispatch(setBookPassangerPhone(inputValue));
  };

  const onBookTicketBtn = async () => {
    try {
      setBookingProcess(() => true);
      const response = await axios.post(bookTicketAPI, {
        uidToken: await getAuth()?.currentUser?.getIdToken(),
        bookFrom,
        bookTo,
        bookDate,
        bookShift,
        bookSitPos,
        bookPassangerName,
        bookPassangerPhone,
        bookTotalPayment: 50_000,
      });

      const responseData = response.data;
      const ticketId = responseData.data.ticketId;

      reduxDispatch(setTicketId(ticketId));
      reduxDispatch(setBookTotalPayment(50_000));

      nextRouter.replace(`/ticket-payment`);
    } catch (error) {
      const responseError = (error as AxiosError).response
        ?.data as BookTicketErrorDataProps;

      await updateTicketAvailability();

      if (responseError.errorCaused === 'sit') {
        reduxDispatch(setBookSitPos(null));
        reduxDispatch(
          setAlert({
            alertMessage: `Maaf kursi nomor ${bookSitPos} sudah terpesan`,
            showAlert: true,
          })
        );
        nextRouter.push('/book-ticket/sit');
      }

      if (responseError.errorCaused === 'shift') {
        reduxDispatch(setBookSitPos(null));
        reduxDispatch(setBookShift(''));
        reduxDispatch(
          setAlert({
            alertMessage: `Maaf shift ${
              bookShift === 'morning' ? 'pagi' : 'sore'
            } sudah terpesan`,
            showAlert: true,
          })
        );
        nextRouter.push('/book-ticket/date');
      }

      if (responseError.errorCaused === 'date') {
        reduxDispatch(setBookDate(''));
        reduxDispatch(setBookSitPos(null));
        reduxDispatch(setBookShift(''));
        reduxDispatch(
          setAlert({
            alertMessage: `Maaf tanggal ${format(
              new Date(bookDate),
              'dd-MM-yyyy'
            )} sudah penuh`,
            showAlert: true,
          })
        );
        nextRouter.push('/book-ticket/date');
      }

      if (responseError.errorCaused === 'previous-date') {
        reduxDispatch(setBookDate(''));
        reduxDispatch(setBookSitPos(null));
        reduxDispatch(setBookShift(''));
        reduxDispatch(
          setAlert({
            alertMessage: `Maaf tanggal ${format(
              new Date(bookDate),
              'dd-MM-yyyy'
            )} tidak bisa dipilih`,
            showAlert: true,
          })
        );
        nextRouter.push('/book-ticket/date');
      }

      setBookingProcess(() => false);
    }
  };

  const onClearBookTicket = () => {
    setRedirectProcess(() => true);
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
    reduxDispatch(setBookPassangerName(''));
    reduxDispatch(setBookPassangerPhone(''));
  };

  useEffect(() => {
    if (redirectOnce) return;
    if (userLogin === false) return;
    if (bookingTicketDateIsEmpty || bookingTicketSitIsEmpty) {
      const redirect = async () => {
        await updateTicketAvailability();
        nextRouter.replace('/book-ticket/date');
      };

      redirect();
    }

    setRedirectOnce(true);
  }, [
    bookingTicketDateIsEmpty,
    bookingTicketSitIsEmpty,
    nextRouter,
    redirectOnce,
    updateTicketAvailability,
    userLogin,
  ]);

  if (
    userLogin === false ||
    bookingTicketDateIsEmpty ||
    bookingTicketSitIsEmpty
  ) {
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

        <LoadingScreen
          hide={redirectProcess === false && bookingProcess === false}
        />

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

                    <p className="text-lg font-semibold">
                      Yukk bepergian dengan Go Travel!
                    </p>
                  </div>

                  <div>
                    <form className="mx-auto max-w-md">
                      <div className="mb-6 min-h-[200px]">
                        <section className="mb-6">
                          <h3 className="text-center text-2xl font-semibold">
                            Masukan Data Penumpang
                          </h3>

                          <p className="mb-4 text-center text-sm">
                            Mohon isi data penumpang dengan benar
                          </p>
                        </section>

                        <section>
                          <div className="grid gap-y-4">
                            <label
                              htmlFor="passanger-name-input"
                              className="inline-block w-full"
                            >
                              <Input
                                id="passanger-name-input"
                                type="text"
                                placeholder="Nama penumpang"
                                value={bookPassangerName}
                                onChange={onInputBookPassangerName}
                              />
                            </label>

                            <label
                              htmlFor="passanger-phone-input"
                              className="inline-block w-full"
                            >
                              <Input
                                id="passanger-phone-input"
                                type="tel"
                                placeholder="Nomor Telepon"
                                value={bookPassangerPhone}
                                onChange={onInputBookPassangerPhone}
                              />
                            </label>
                          </div>
                        </section>
                      </div>

                      <section>
                        <div className="mb-2">
                          <PrimaryButton
                            disabled={disableBookingBtn}
                            onClick={onBookTicketBtn}
                          >
                            {bookingProcess ? 'Sedang memproses...' : 'Booking'}
                          </PrimaryButton>
                        </div>

                        <SecondaryButtonLink hrefPath={`/book-ticket/sit`}>
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
