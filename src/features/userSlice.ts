import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface USER {
  displayName: string;
  photoUrl: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      uid: "",
      photoUrl: "",
      displayName: "",
    },
    isLogin: false,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      state.user = {
        uid: "",
        photoUrl: "",
        displayName: "",
      };
      state.isLogin = false;
    },
    updateUserProfile: (state, action: PayloadAction<USER>) => {
      state.user.displayName = action.payload.displayName;
      state.user.photoUrl = action.payload.photoUrl;
    },
  },
});

// actionsはreducersの中身をexportする。ついでにaction creatorの役割も担っている。
export const { login, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;
export const isLogin = (state: RootState) => state.user.isLogin;

export default userSlice.reducer;
