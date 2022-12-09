import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { createSlice } from '@reduxjs/toolkit';

interface BookedTicketProps {
  ticketId: string;
  bookedDate: string;
  destination: {
    to: string;
    from: string;
  };
  sitPos: number;
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
    addBookedTicket: (state, action: PayloadAction<BookedTicketProps>) => {
      state.data.push(action.payload);
    },
  },
});

export const { addBookedTicket } = userBookedTicketsSlice.actions;

export const userBookedTicketsSelector = (state: RootState) =>
  state.userBookedTickets.data;

export default userBookedTicketsSlice.reducer;
