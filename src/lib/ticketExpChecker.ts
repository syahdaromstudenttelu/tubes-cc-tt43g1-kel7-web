import type { TicketShifts } from '../redux-app/slices/userBookedTicketsSlice';

export const ticketExpChecker = (
  ticketShift: TicketShifts,
  ticketDate: string
) => {
  const morningShiftExpiration = new Date(ticketDate);
  morningShiftExpiration.setHours(8, 0, 0, 0);

  const afternoonShiftExpiration = new Date(ticketDate);
  afternoonShiftExpiration.setHours(16, 0, 0, 0);

  const morningShiftIsExpired =
    morningShiftExpiration.getTime() - Date.now() < 0;

  const afternoonShiftIsExpired =
    afternoonShiftExpiration.getTime() - Date.now() < 0;

  if (
    (ticketShift === 'morning' && morningShiftIsExpired) ||
    (ticketShift === 'afternoon' && afternoonShiftIsExpired)
  )
    return true;

  return false;
};
