import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux-app/typed-hook/typedHooks';
import {
  setBookFrom,
  setBookTo,
  setBookDate,
  setBookShift,
  setBookSitPos,
} from '../../../redux-app/slices/bookTicketSlice';
import { bookTicketInputSelector } from '../../../redux-app/slices/bookTicketSlice';
import { ralewayFont, interFont } from '../../../lib/myNextFonts';
import Head from 'next/head';
import Link from 'next/link';
import ProfileButton from '../../../components/ProfileButton';
import { PrimaryButton } from '../../../components/buttons';
import { SecondaryButtonLink } from '../../../components/button-links';
import SitOptions from '../../../components/book-ticket-sit/SitOptions';

type TicketSit = 1 | 2 | 3 | 4 | 5;

export default function BookTicketSit() {
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const { bookSitPos } = useAppSelector(bookTicketInputSelector);
  const disableBookSitBtn = bookSitPos === null;

  const onInputBookSit = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectValue = Number.parseInt(e.currentTarget.value) as TicketSit;
    reduxDispatch(setBookSitPos(selectValue));
  };

  const onBookNextBtn = () => {
    if (disableBookSitBtn) return;
    nextRouter.push(`/book-ticket/passanger-data`);
  };

  const onClearBookTicket = () => {
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
  };

  return (
    <main className={`${ralewayFont.variable} ${interFont.variable}`}>
      <Head>
        <title>GOVEL | Form Pemesanan Kursi Tiket</title>
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
                      href={`/`}
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
