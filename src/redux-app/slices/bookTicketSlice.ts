import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { createSlice } from '@reduxjs/toolkit';

type TicketSitValue = 1 | 2 | 3 | 4 | 5 | null;

interface BookTicketProps {
  bookFrom: string;
  bookTo: string;
  bookDate: string;
  bookShift: string;
  bookSitPos: TicketSitValue;
  bookPassangerName: string;
  bookPassangerPhone: string;
}

const initialState: BookTicketProps = {
  bookFrom: 'bandung',
  bookTo: 'bogor',
  bookDate: '',
  bookShift: '',
  bookSitPos: null,
  bookPassangerName: '',
  bookPassangerPhone: '',
};

export const bookTicketSlice = createSlice({
  name: 'bookTicket',
  initialState,
  reducers: {
    setBookFrom: (state, action: PayloadAction<string>) => {
      if (action.payload === state.bookTo) state.bookTo = state.bookFrom;
      state.bookFrom = action.payload;
    },
    setBookTo: (state, action: PayloadAction<string>) => {
      if (action.payload === state.bookFrom) state.bookFrom = state.bookTo;
      state.bookTo = action.payload;
    },
    setBookDate: (state, action: PayloadAction<string>) => {
      const currentFullDate = new Date(Date.now());
      const currentYear = currentFullDate.getFullYear();
      const currentMonth = currentFullDate.getMonth();
      const currentDate = currentFullDate.getDate();
      const dateMsNow = Date.parse(
        new Date(currentYear, currentMonth, currentDate).toISOString()
      );
      const dateMsPicked = Date.parse(new Date(action.payload).toISOString());

      if (dateMsPicked - dateMsNow < 0) return;

      state.bookDate = action.payload;
    },
    setBookShift: (state, action: PayloadAction<string>) => {
      state.bookShift = action.payload;
    },
    setBookSitPos: (state, action: PayloadAction<TicketSitValue>) => {
      state.bookSitPos = action.payload;
    },
    setBookPassangerName: (state, action: PayloadAction<string>) => {
      state.bookPassangerName = action.payload;
    },
    setBookPassangerPhone: (state, action: PayloadAction<string>) => {
      state.bookPassangerPhone = action.payload;
    },
  },
});

export const {
  setBookFrom,
  setBookTo,
  setBookDate,
  setBookShift,
  setBookSitPos,
  setBookPassangerName,
  setBookPassangerPhone,
} = bookTicketSlice.actions;

export const bookTicketInputSelector = (state: RootState) => state.bookTicket;

export default bookTicketSlice.reducer;
