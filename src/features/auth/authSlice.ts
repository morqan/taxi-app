import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = { isAuthenticated: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload;
    },
    signedOut(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticated, signedOut } = authSlice.actions;
export const authReducer = authSlice.reducer;
