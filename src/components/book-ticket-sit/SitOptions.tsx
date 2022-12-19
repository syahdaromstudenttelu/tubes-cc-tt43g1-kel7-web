import { useAppSelector } from '../../redux-app/typed-hook/typedHooks';
import { bookTicketInputSelector } from '../../redux-app/slices/bookTicketSlice';
import { bookTicketAvailabilitySelector } from '../../redux-app/slices/bookTicketAvailabilitySlice';
import cityCodeIdn from '../../lib/cityCodeIdn';

type TicketSit = '1' | '2' | '3' | '4' | '5';

export default function SitOptions() {
  const { bookFrom, bookTo, bookDate, bookShift } = useAppSelector(
    bookTicketInputSelector
  );
  const bookTicketAvailabilityData = useAppSelector(
    bookTicketAvailabilitySelector
  );

  const disableBookSitOpt = (sitPos: TicketSit) => {
    const codeDst = bookTicketAvailabilityData.find(
      (bookTicketLoc) =>
        bookTicketLoc.codeDestination ===
        `${cityCodeIdn[bookFrom]}_${cityCodeIdn[bookTo]}`
    );

    if (codeDst === undefined) return false;

    const ticketDateData = codeDst.ticketDates.find(
      (ticketDateData) => ticketDateData.ticketDate === bookDate
    );

    const shiftAvailable = ticketDateData !== undefined;

    if (shiftAvailable) {
      const ticketSitAvailabilityStatus =
        ticketDateData.ticketAvailability.shifts[
          bookShift as 'morning' | 'afternoon'
        ].bookedSits[sitPos];

      return ticketSitAvailabilityStatus;
    }

    return false;
  };

  const sitOpts = ['', '1', '2', '3', '4', '5'].map((sitPos) => (
    <option
      key={sitPos}
      value={sitPos}
      disabled={sitPos === '' ? true : disableBookSitOpt(sitPos as TicketSit)}
    >
      {sitPos === '' ? 'Pilih nomor kursi' : sitPos}
    </option>
  ));

  return <>{sitOpts}</>;
}
