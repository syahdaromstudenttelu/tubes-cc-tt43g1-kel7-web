import { useState } from 'react';
import { format } from 'date-fns';
import cn from 'classnames';
import { useAppSelector } from '../../redux-app/typed-hook/typedHooks';
import { bookTicketInputSelector } from '../../redux-app/slices/bookTicketSlice';
import { ralewayFont, interFont } from '../../lib/myNextFonts';
import Link from 'next/link';
import ProfileButton from '../../components/ProfileButton';
import { PrimaryButton } from '../../components/buttons';

export default function TicketPayment() {
  const [paymentName, setPaymentName] = useState('');
  const disablePaymentBtn = paymentName === '';
  const {
    bookFrom,
    bookTo,
    bookDate,
    bookShift,
    bookSitPos,
    bookPassangerName,
    bookPassangerPhone,
    bookTotalPayment,
  } = useAppSelector(bookTicketInputSelector);

  const onFastPayment = () => setPaymentName('fast');

  const onHapiPayment = () => setPaymentName('hapi');

  const onPaymentBtn = () => {
    return;
  };

  return (
    <div className={`${ralewayFont.variable} ${interFont.variable}`}>
      <div className="container mx-auto">
        <div className="max-w-8xl mx-auto pt-6 pb-10">
          <header className="mb-8">
            <nav className="mb-8 flex items-center justify-between">
              <div>
                <Link
                  href={`/`}
                  className="inline-block rounded px-2 py-1 transition-colors duration-300 hover:bg-gray-200"
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
            <h3 className="mb-12 text-center font-raleway text-4xl font-bold">
              Rincian Pembayaran
            </h3>

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
                    <p>{`${bookFrom.slice(0, 1).toUpperCase()}${bookFrom.slice(
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
                  <h4 className="font-raleway font-bold">Metode Pembayaran</h4>
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
