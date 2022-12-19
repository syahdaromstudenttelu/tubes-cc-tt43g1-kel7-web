import axios from 'axios';
import cn from 'classnames';
import { format } from 'date-fns';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/buttons';
import ErrorMessage from '../../components/ErrorMessage';
import ProfileButton from '../../components/ProfileButton';
import { interFont, ralewayFont } from '../../lib/myNextFonts';
import { useApiEndpoint } from '../../lib/react-custom-hooks/useApiEndpoint';
import { useRedirectDashboard } from '../../lib/react-custom-hooks/useRedirectDashboard';
import { useTicketAvailability } from '../../lib/react-custom-hooks/useTicketAvailability';
import { ticketExpChecker } from '../../lib/ticketExpChecker';
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
} from '../../redux-app/slices/bookTicketSlice';
import type { TicketShifts } from '../../redux-app/slices/userBookedTicketsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux-app/typed-hook/typedHooks';

export default function TicketPayment() {
  const [redirectOnce, setRedirectOnce] = useState(false);
  const [paymentName, setPaymentName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const { bookTicketAPI } = useApiEndpoint();
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
    bookTotalPayment,
    bookTicketId,
  } = useAppSelector(bookTicketInputSelector);
  const bookingTicketDateIsEmpty = bookDate === '' || bookShift === '';
  const bookingTicketSitIsEmpty = bookSitPos === null;

  const bookingTicketPassangerIsEmpty =
    bookPassangerName === '' || bookPassangerPhone === '';

  const disablePaymentBtn =
    paymentName === '' || ticketExpChecker(bookShift as TicketShifts, bookDate);

  const onClearBookTicket = () => {
    reduxDispatch(setTicketId(''));
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
    reduxDispatch(setBookPassangerName(''));
    reduxDispatch(setBookPassangerPhone(''));
    reduxDispatch(setBookTotalPayment(0));
  };

  const onFastPayment = () => {
    if (ticketExpChecker(bookShift as TicketShifts, bookDate)) return;
    setPaymentName('fast');
  };
  const onHapiPayment = () => {
    if (ticketExpChecker(bookShift as TicketShifts, bookDate)) return;
    setPaymentName('hapi');
  };

  const onPaymentBtn = async () => {
    try {
      if (ticketExpChecker(bookShift as TicketShifts, bookDate)) return;

      await axios.patch(bookTicketAPI, {
        uidToken: await getAuth().currentUser?.getIdToken(),
        ticketId: bookTicketId,
      });

      onClearBookTicket();
      nextRouter.replace(`/${username}`);
    } catch (error) {
      setShowErrorMsg(() => true);
      setErrorMsg(() => 'Terjadi kesalahan pada jaringan Anda');
    }
  };

  useEffect(() => {
    if (ticketExpChecker(bookShift as TicketShifts, bookDate) === false) return;

    setErrorMsg(() => 'Maaf tiket Anda sudah hangus');
    setShowErrorMsg(() => true);
  }, [bookDate, bookShift]);

  useEffect(() => {
    if (redirectOnce) return;
    if (userLogin === false) return;
    if (
      bookingTicketDateIsEmpty ||
      bookingTicketSitIsEmpty ||
      bookingTicketPassangerIsEmpty
    ) {
      const redirect = async () => {
        await updateTicketAvailability();
        nextRouter.replace('/book-ticket/date');
      };

      redirect();
    }

    setRedirectOnce(true);
  }, [
    bookingTicketDateIsEmpty,
    bookingTicketPassangerIsEmpty,
    bookingTicketSitIsEmpty,
    nextRouter,
    redirectOnce,
    updateTicketAvailability,
    userLogin,
  ]);

  if (
    userLogin === false ||
    bookingTicketDateIsEmpty ||
    bookingTicketSitIsEmpty ||
    bookingTicketPassangerIsEmpty
  ) {
    return null;
  } else {
    return (
      <div className={`${ralewayFont.variable} ${interFont.variable}`}>
        <Head>
          <title>GOVEL | Rincian Pembayaran Tiket</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className="container mx-auto">
          <div className="max-w-8xl mx-auto pt-6 pb-10">
            <header className="mb-8">
              <nav className="mb-8 flex items-center justify-between">
                <div>
                  <Link
                    href={`/${username}`}
                    className="inline-block rounded px-2 py-1 transition-colors duration-300 hover:bg-gray-200"
                    onClick={onClearBookTicket}
                  >
                    Dasbor
                  </Link>
                </div>

                <div>
                  <ProfileButton />
                </div>
              </nav>

              <div className="text-center">
                <h2 className="font-raleway text-6xl font-bold">GOVEL</h2>
                <p className="text-lg">Yukk bepergian dengan Go Travel!</p>
              </div>
            </header>

            <main>
              <h3 className="mb-6 text-center font-raleway text-4xl font-bold">
                Rincian Pembayaran
              </h3>

              <div className="mb-12">
                <ErrorMessage showError={showErrorMsg}>{errorMsg}</ErrorMessage>
              </div>

              <div className="mb-6 grid grid-cols-[2fr_1fr_1fr] gap-x-4">
                <div className="grid gap-y-4">
                  <section className="grid grid-cols-3 rounded-md bg-slate-200 px-4 py-3">
                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">Nama Penumpang</h4>
                      <p>{bookPassangerName}</p>
                    </div>

                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">No. Kursi</h4>
                      <p>{bookSitPos}</p>
                    </div>

                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">No. Telepon</h4>
                      <p>{bookPassangerPhone}</p>
                    </div>
                  </section>

                  <section className="grid grid-cols-3 rounded-md bg-slate-200 px-4 py-3">
                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">Kota Asal</h4>
                      <p>{`${bookFrom
                        .slice(0, 1)
                        .toUpperCase()}${bookFrom.slice(
                        1,
                        bookFrom.length
                      )}`}</p>
                    </div>

                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">Kota Tujuan</h4>
                      <p>{`${bookTo.slice(0, 1).toUpperCase()}${bookTo.slice(
                        1,
                        bookTo.length
                      )}`}</p>
                    </div>

                    <div className="grid gap-y-2">
                      <h4 className="font-raleway font-bold">
                        Shift dan Tanggal
                      </h4>

                      <p>
                        {bookShift === 'morning'
                          ? 'Pagi (08.00)'
                          : 'Sore (16.00)'}
                        , {format(new Date(bookDate), 'dd-MM-yyyy')}
                      </p>
                    </div>
                  </section>
                </div>

                <section className="grid gap-y-2 rounded-md bg-slate-200 px-4 py-3">
                  <div className="grid gap-y-2">
                    <h4 className="font-raleway font-bold">Harga Kursi</h4>
                    <p>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(bookTotalPayment)}
                    </p>
                  </div>

                  <div className="grid gap-y-2">
                    <h4 className="font-raleway font-bold">Total Pembayaran</h4>
                    <p>
                      {new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                      }).format(bookTotalPayment)}
                    </p>
                  </div>
                </section>

                <section className="grid gap-y-2 rounded-md bg-slate-200 px-4 py-3">
                  <div className="mb-2">
                    <h4 className="font-raleway font-bold">
                      Metode Pembayaran
                    </h4>
                  </div>

                  <div>
                    <ul className="grid gap-y-2">
                      <li>
                        <button
                          type="button"
                          className={cn(
                            'w-full rounded-lg border-2 border-slate-400 py-3 text-center font-semibold text-slate-400',
                            {
                              '!border-green-600': paymentName === 'fast',
                              '!text-green-600': paymentName === 'fast',
                            }
                          )}
                          onClick={onFastPayment}
                        >
                          Fast Pays
                        </button>
                      </li>

                      <li>
                        <button
                          type="button"
                          className={cn(
                            'w-full rounded-lg border-2 border-slate-400 py-3 text-center font-semibold text-slate-400',
                            {
                              '!border-green-600': paymentName === 'hapi',
                              '!text-green-600': paymentName === 'hapi',
                            }
                          )}
                          onClick={onHapiPayment}
                        >
                          Hapi Pays
                        </button>
                      </li>
                    </ul>
                  </div>
                </section>
              </div>

              <div>
                <div className="flex justify-end">
                  <div className="w-32">
                    <PrimaryButton
                      disabled={disablePaymentBtn}
                      onClick={onPaymentBtn}
                    >
                      Bayar
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}
