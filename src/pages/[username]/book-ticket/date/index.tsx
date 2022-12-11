import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../redux-app/typed-hook/typedHooks';
import {
  setBookFrom,
  setBookTo,
  setBookDate,
  setBookShift,
  setBookSitPos,
} from '../../../../redux-app/slices/bookTicketSlice';
import { bookTicketInputSelector } from '../../../../redux-app/slices/bookTicketSlice';
import { ralewayFont, interFont } from '../../../../lib/myNextFonts';
import Head from 'next/head';
import Link from 'next/link';
import ProfileButton from '../../../../components/ProfileButton';
import { PrimaryButton } from '../../../../components/buttons';
import CityOptions from '../../../../components/book-ticket-date/CityOptions';
import ShiftOptions from '../../../../components/book-ticket-date/ShiftOptions';

export default function BookTicketDate() {
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const { bookFrom, bookTo, bookDate, bookShift } = useAppSelector(
    bookTicketInputSelector
  );
  const disableBookSitBtn =
    bookFrom === '' || bookTo === '' || bookDate === '' || bookShift === '';

  const onInputBookFrom = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.currentTarget.value;
    reduxDispatch(setBookFrom(selectValue));
    reduxDispatch(setBookShift(''));
  };

  const onInputBookTo = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.currentTarget.value;
    reduxDispatch(setBookTo(selectValue));
    reduxDispatch(setBookShift(''));
  };

  const onInputBookDate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputDateValue = e.currentTarget.value;
    reduxDispatch(setBookDate(inputDateValue));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
  };

  const onInputBookShift = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.currentTarget.value;
    reduxDispatch(setBookShift(selectValue));
    reduxDispatch(setBookSitPos(null));
  };

  const onBookSitBtn = () => {
    if (disableBookSitBtn) return;
    nextRouter.push(`/${nextRouter.query.username}/book-ticket/sit`);
  };

  const onClearBookTicket = () => {
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
  };

  return (
    <main className={`${ralewayFont.variable} ${interFont.variable}`}>
      <Head>
        <title>GOVEL | Form Pemesanan Tujuan dan Waktu Tiket</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
                      href={`/${nextRouter.query.username}`}
                      onClick={onClearBookTicket}
                    >
                      Tiket Anda
                    </Link>
                  </div>

                  <ProfileButton />
                </div>

                <div className="mb-8 text-center">
                  <h1 className="mb-1 cursor-default select-none font-raleway text-6xl font-bold text-slate-700">
                    GOVEL
                  </h1>

                  <p className="text-lg font-semibold">
                    Yukk bepergian dengan Go Travel!
                  </p>
                </div>

                <div>
                  <form className="mx-auto max-w-md">
                    <section className="mb-6 grid min-h-[200px] gap-y-4">
                      <div className="flex items-center justify-between">
                        <label htmlFor="from-city">
                          <p>Kota asal</p>

                          <select
                            id="from-city"
                            value={bookFrom}
                            onChange={onInputBookFrom}
                          >
                            <CityOptions toOrFrom="from" />
                          </select>
                        </label>

                        <label htmlFor="to-city">
                          <p>Kota tujuan</p>
                          <select
                            id="to-city"
                            value={bookTo}
                            onChange={onInputBookTo}
                          >
                            <CityOptions toOrFrom="to" />
                          </select>
                        </label>
                      </div>

                      <label
                        htmlFor="ticket-date"
                        className="inline-block w-full"
                      >
                        <p>Pilih tanggal tiket Anda</p>
                        <input
                          type="date"
                          id="ticket-date"
                          min={format(new Date(), 'yyyy-MM-dd')}
                          value={bookDate}
                          onChange={onInputBookDate}
                        />
                      </label>

                      <label
                        htmlFor="ticket-shift"
                        className="inline-block w-full"
                      >
                        <p>Pilih shift tiket Anda</p>
                        <select
                          id="ticket-shift"
                          value={bookShift}
                          onChange={onInputBookShift}
                        >
                          <ShiftOptions />
                        </select>
                      </label>
                    </section>

                    <section>
                      <PrimaryButton
                        disabled={disableBookSitBtn}
                        onClick={onBookSitBtn}
                      >
                        Pilih kursi
                      </PrimaryButton>
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
