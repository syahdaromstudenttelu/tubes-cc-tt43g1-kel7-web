import { configureStore } from '@reduxjs/toolkit';

export const reduxStore = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
