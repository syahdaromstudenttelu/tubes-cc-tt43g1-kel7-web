import { configureStore } from '@reduxjs/toolkit';
import alertReducer from '../slices/alertSlice';
import bookTicketAvailabilityReducer from '../slices/bookTicketAvailabilitySlice';
import bookTicketReducer from '../slices/bookTicketSlice';
import userBookedTicketsReducer from '../slices/userBookedTicketsSlice';

export const reduxStore = configureStore({
  reducer: {
    userBookedTickets: userBookedTicketsReducer,
    bookTicket: bookTicketReducer,
    bookTicketAvailability: bookTicketAvailabilityReducer,
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
