import { configureStore } from '@reduxjs/toolkit';
import userBookedTicketsReducer from '../slices/userBookedTicketsSlice';

export const reduxStore = configureStore({
  reducer: {
    userBookedTickets: userBookedTicketsReducer,
  },
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
