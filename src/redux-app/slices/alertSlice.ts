import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';

interface AlertStateSliceProps {
  showAlert: boolean;
  alertMessage: string;
}

const initialState: AlertStateSliceProps = {
  showAlert: false,
  alertMessage: '',
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertStateSliceProps>) => {
      state.alertMessage = action.payload.alertMessage;
      state.showAlert = action.payload.showAlert;
    },
  },
});

export const { setAlert } = alertSlice.actions;

export const alertSelector = (state: RootState) => state.alert;

export default alertSlice.reducer;
