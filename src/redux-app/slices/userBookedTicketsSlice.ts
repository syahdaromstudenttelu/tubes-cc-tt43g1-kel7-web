import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

export type TicketSitPos = 1 | 2 | 3 | 4 | 5;
export type TicketShifts = 'morning' | 'afternoon';

export interface BookedTicketProps {
  ticketId: string;
  bookedDate: string;
  bookedShift: TicketShifts;
  destination: {
    to: string;
    from: string;
  };
  sitPos: TicketSitPos;
  passangerName: string;
  passangerPhone: string;
  totalPayment: number;
  paidOff: boolean;
}

interface UserBookedTicketSliceProps {
  data: BookedTicketProps[];
}

const initialState: UserBookedTicketSliceProps = {
  data: [],
};

export const userBookedTicketsSlice = createSlice({
  name: 'userBookedTickets',
  initialState,
  reducers: {
    setBookedTicket: (state, action: PayloadAction<BookedTicketProps[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setBookedTicket } = userBookedTicketsSlice.actions;

export const userBookedTicketsSelector = (state: RootState) =>
  state.userBookedTickets.data;

export default userBookedTicketsSlice.reducer;
