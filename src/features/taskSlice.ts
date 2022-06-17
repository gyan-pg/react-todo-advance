import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
// firebase
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc, addDoc, collection, setDoc } from "firebase/firestore";
// const
import { FirstPhase, SecondPhase, ThirdPhase } from "../status";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string,
  weight: string
}

export const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
    modalTaskFlg: false,
    clickedTaskId: "",
  },

  reducers: {
    exSetTasks: (state, action) => {
      state.tasks = action.payload;
    },
    exCreateTask: (state, action) => {
      console.log(action.payload);
      const colRef = collection(db, 'tasks');
      const data = {
        user: action.payload.user,
        uid: action.payload.uid,
        title: action.payload.title,
        detail: action.payload.detail,
        status: action.payload.status,
        weight: action.payload.weight,
      };
      addDoc(colRef, data);
    },
    exDeleteTask: (state, action) => {
      console.log('delete task',action.payload)
      deleteDoc(doc(db, "tasks", action.payload.uid));
    },
    exChangeStatus: (state, action) => {
      let newStatus = "";
      if (action.payload.status === FirstPhase) newStatus = SecondPhase;
      if (action.payload.status === SecondPhase) newStatus = ThirdPhase;
  
      const taskRef = doc(db, "tasks", action.payload.id);
  
      updateDoc(taskRef, {
        status: newStatus,
      });
    },
    exUpdateTask: (state, action) => {
      const taskRef = doc(db, "tasks", action.payload.id);
      setDoc(taskRef, action.payload);
    },
    exSetModalTaskFlg: (state) => {
      state.modalTaskFlg = !state.modalTaskFlg;
    },
    exSetClickedTaskId: (state, action) => {
      state.clickedTaskId = action.payload.id;
    },
  },
});

// actionsはreducersの中身をexportする。ついでにaction creatorの役割も担っている。
export const { exSetTasks, exCreateTask, exDeleteTask, exChangeStatus, exSetClickedTaskId, exSetModalTaskFlg, exUpdateTask } = taskSlice.actions;

export const selectTasks = (state: RootState) => state.task.tasks;
export const modalTaskFlg = (state: RootState) => state.task.modalTaskFlg;
export const clickedTaskId = (state: RootState) => state.task.clickedTaskId;

export default taskSlice.reducer;
