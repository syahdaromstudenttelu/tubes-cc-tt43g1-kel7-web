import axios from 'axios';
import { getAuth } from 'firebase/auth';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import BookedTicketCard from '../../components/BookedTicketCard';
import ProfileButton from '../../components/ProfileButton';
import { interFont, ralewayFont } from '../../lib/myNextFonts';
import { useApiEndpoint } from '../../lib/react-custom-hooks/useApiEndpoint';
import { useRedirectDashboard } from '../../lib/react-custom-hooks/useRedirectDashboard';
import { useTicketAvailability } from '../../lib/react-custom-hooks/useTicketAvailability';
import type { BookedTicketProps } from '../../redux-app/slices/userBookedTicketsSlice';
import {
  setBookedTicket,
  userBookedTicketsSelector,
} from '../../redux-app/slices/userBookedTicketsSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../../redux-app/typed-hook/typedHooks';

export default function Dashboard() {
  const [updateOnce, setUpdateOnce] = useState(false);
  const { bookedTicketsAPI } = useApiEndpoint();
  const { updateTicketAvailability } = useTicketAvailability();
  const { userLogin } = useRedirectDashboard();
  const nextRouter = useRouter();
  const reduxDispatch = useAppDispatch();
  const userBookedTickets = useAppSelector(userBookedTicketsSelector);

  const onBookTicket = async () => {
    await updateTicketAvailability();
    nextRouter.push('/book-ticket/date');
  };

  useEffect(() => {
    if (userLogin === false || updateOnce === true) return;
    const updateUserBookedTickets = async () => {
      const response = await axios.get(bookedTicketsAPI, {
        params: {
          uidToken: await getAuth().currentUser?.getIdToken(),
        },
      });
      const responseData = response.data;
      const userBookedTickets: BookedTicketProps[] = responseData.data;

      reduxDispatch(setBookedTicket(userBookedTickets));
    };

    setUpdateOnce(() => true);
    updateUserBookedTickets();
  }, [bookedTicketsAPI, reduxDispatch, updateOnce, userLogin]);

  if (userLogin === false) {
    return null;
  } else {
    const userBookedTicketCards = userBookedTickets.map((userBookedTicket) => {
      return (
        <BookedTicketCard
          key={userBookedTicket.ticketId}
          bookedTicketData={userBookedTicket}
        />
      );
    });

    return (
      <div className={`${ralewayFont.variable} ${interFont.variable}`}>
        <Head>
          <title>GOVEL | Dasbor Tiket</title>
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
                  <button
                    type="button"
                    className="inline-block rounded px-2 py-1 transition-colors duration-300 hover:bg-gray-200"
                    onClick={onBookTicket}
                  >
                    Pesan tiket
                  </button>
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
              {userBookedTickets.length === 0 && (
                <p className="mx-auto w-max rounded-md bg-gray-200 px-3 py-2 text-center text-gray-500">
                  Anda belum memesan tiket sebelumnya.{' '}
                  <button className="underline" onClick={onBookTicket}>
                    Yukk, pesan tiket sekarang
                  </button>
                </p>
              )}

              {userBookedTickets.length !== 0 && (
                <div className="grid w-full grid-cols-3 gap-4 pt-6">
                  {userBookedTicketCards}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
