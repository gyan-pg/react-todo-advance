import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: []
  },

  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    }
    // login: (state, action) => {
    //   state.user = action.payload;
    // },
    // logout: (state) => {
    //   state.user = {
    //     uid: "",
    //     photoUrl: "",
    //     displayName: "",
    //   };
    // },
    // updateUserProfile: (state, action: PayloadAction<USER>) => {
    //   state.user.displayName = action.payload.displayName;
    //   state.user.photoUrl = action.payload.photoUrl;
    // },
  },
});

// actionsはreducersの中身をexportする。ついでにaction creatorの役割も担っている。
export const { setTasks } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;

export default taskSlice.reducer;
