import { useAppSelector } from '../../redux-app/typed-hook/typedHooks';
import { bookTicketInputSelector } from '../../redux-app/slices/bookTicketSlice';
import { bookTicketAvailabilitySelector } from '../../redux-app/slices/bookTicketAvailabilitySlice';
import cityCodeIdn from '../../lib/cityCodeIdn';

export default function ShiftOptions() {
  const { bookFrom, bookTo, bookDate } = useAppSelector(
    bookTicketInputSelector
  );

  const bookTicketAvailabilityData = useAppSelector(
    bookTicketAvailabilitySelector
  );

  const disableBookShiftOpt = (shift: 'morning' | 'afternoon') => {
    const codeDst = bookTicketAvailabilityData.find(
      (bookTicketLoc) =>
        bookTicketLoc.codeDestination ===
        `${cityCodeIdn[bookFrom]}_${cityCodeIdn[bookTo]}`
    );

    if (codeDst === undefined) return false;

    const ticketDateData = codeDst.ticketDates.find(
      (ticketDateData) => ticketDateData.ticketDate === bookDate
    );

    const shiftAvailable =
      ticketDateData === undefined ||
      ticketDateData.ticketAvailability.shifts[shift].allBooked === false;

    if (shiftAvailable) return false;

    return true;
  };

  const shiftOpts = [
    { optValue: '', optText: 'Pilih shift tiket' },
    { optValue: 'morning', optText: 'Pagi, 08.00' },
    { optValue: 'afternoon', optText: 'Sore, 16.00' },
  ].map(({ optValue, optText }) => (
    <option
      key={optValue}
      value={optValue}
      disabled={
        optValue === ''
          ? true
          : disableBookShiftOpt(optValue as 'morning' | 'afternoon')
      }
    >
      {optText}
    </option>
  ));

  return <>{shiftOpts}</>;
}
