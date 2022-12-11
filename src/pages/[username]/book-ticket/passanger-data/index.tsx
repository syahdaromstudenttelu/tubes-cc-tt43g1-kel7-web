import type { ChangeEvent } from 'react';
import { useRouter } from 'next/router';
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
  setBookPassangerName,
  setBookPassangerPhone,
} from '../../../../redux-app/slices/bookTicketSlice';
import { bookTicketInputSelector } from '../../../../redux-app/slices/bookTicketSlice';
import { ralewayFont, interFont } from '../../../../lib/myNextFonts';
import Head from 'next/head';
import Link from 'next/link';
import ProfileButton from '../../../../components/ProfileButton';
import { PrimaryButton } from '../../../../components/buttons';
import { SecondaryButtonLink } from '../../../../components/button-links';
import { Input } from '../../../../components/form-inputs';

export default function BookTicketSit() {
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const { bookPassangerName, bookPassangerPhone } = useAppSelector(
    bookTicketInputSelector
  );
  const disableBookingBtn =
    bookPassangerName === '' || bookPassangerPhone === '';

  const onInputBookPassangerName = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    reduxDispatch(setBookPassangerName(inputValue));
  };

  const onInputBookPassangerPhone = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    reduxDispatch(setBookPassangerPhone(inputValue));
  };

  const onBookNextBtn = () => {
    return;
  };

  const onClearBookTicket = () => {
    reduxDispatch(setBookFrom('bandung'));
    reduxDispatch(setBookTo('bogor'));
    reduxDispatch(setBookDate(''));
    reduxDispatch(setBookShift(''));
    reduxDispatch(setBookSitPos(null));
    reduxDispatch(setBookPassangerName(''));
    reduxDispatch(setBookPassangerPhone(''));
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
                          onClick={onBookNextBtn}
                        >
                          Booking
                        </PrimaryButton>
                      </div>

                      <SecondaryButtonLink
                        hrefPath={`/${nextRouter.query.username}/book-ticket/sit`}
                      >
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
