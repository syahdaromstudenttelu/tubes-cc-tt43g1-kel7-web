import { configureStore } from '@reduxjs/toolkit';
import userBookedTicketsReducer from '../slices/userBookedTicketsSlice';
import bookTicketReducer from '../slices/bookTicketSlice';
import bookTicketAvailabilityReducer from '../slices/bookTicketAvailabilitySlice';

export const reduxStore = configureStore({
  reducer: {
    userBookedTickets: userBookedTicketsReducer,
    bookTicket: bookTicketReducer,
    bookTicketAvailability: bookTicketAvailabilityReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
