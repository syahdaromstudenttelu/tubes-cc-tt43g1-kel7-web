import { useRouter } from 'next/router';
import { useAppSelector } from '../../redux-app/typed-hook/typedHooks';
import { userBookedTicketsSelector } from '../../redux-app/slices/userBookedTicketsSlice';
import { ralewayFont, interFont } from '../../lib/myNextFonts';
import Link from 'next/link';
import ProfileButton from '../../components/ProfileButton';
import BookedTicketCard from '../../components/BookedTicketCard';

export default function Dashboard() {
  const nextRouter = useRouter();
  const userBookedTickets = useAppSelector(userBookedTicketsSelector);

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
      <div className="container mx-auto">
        <div className="max-w-8xl mx-auto pt-6 pb-10">
          <header className="mb-8">
            <nav className="mb-8 flex items-center justify-between">
              <div>
                <Link
                  href={`/${nextRouter.query.username}/book-ticket/date`}
                  className="inline-block rounded px-2 py-1 transition-colors duration-300 hover:bg-gray-200"
                >
                  Pesan tiket
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
            {userBookedTickets.length === 0 && (
              <p className="mx-auto w-max rounded-md bg-gray-200 px-3 py-2 text-center text-gray-500">
                Anda belum memesan tiket sebelumnya.{' '}
                <Link
                  href={`/${nextRouter.query.username}/book-ticket/date`}
                  className="underline"
                >
                  Yukk, pesan tiket sekarang
                </Link>
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
