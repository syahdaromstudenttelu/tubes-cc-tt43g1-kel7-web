import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { createSlice } from '@reduxjs/toolkit';

interface BookTicketAvailabilityData {
  codeDestination: string;
  ticketDates: {
    ticketDate: string;
    ticketAvailability: {
      allBooked: boolean;
      shifts: {
        morning: {
          allBooked: boolean;
          bookedSits: {
            '1': boolean;
            '2': boolean;
            '3': boolean;
            '4': boolean;
            '5': boolean;
          };
        };
        afternoon: {
          allBooked: boolean;
          bookedSits: {
            '1': boolean;
            '2': boolean;
            '3': boolean;
            '4': boolean;
            '5': boolean;
          };
        };
      };
    };
  }[];
}

interface BookTicketAvailabilityProps {
  data: BookTicketAvailabilityData[];
}

const initialState: BookTicketAvailabilityProps = {
  data: [],
};

export const bookTicketAvailabilitySlice = createSlice({
  name: 'bookTicketAvailability',
  initialState,
  reducers: {
    addBookTicketAvailability: (
      state,
      action: PayloadAction<BookTicketAvailabilityData>
    ) => {
      state.data.push(action.payload);
    },
  },
});

export const { addBookTicketAvailability } =
  bookTicketAvailabilitySlice.actions;

export const bookTicketAvailabilitySelector = (state: RootState) =>
  state.bookTicketAvailability.data;

export default bookTicketAvailabilitySlice.reducer;
