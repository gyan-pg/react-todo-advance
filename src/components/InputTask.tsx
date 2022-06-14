import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { setTasks } from "../features/taskSlice";

import styles from "../scss/InputTask.module.scss";
import { db } from "../firebase";
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

const InputTask: React.FC = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const user = useSelector(selectUser);

  const submitTask = async () => {
    const colRef = collection(db, 'tasks');
    const data = {
      user: user.displayName,
      uid: user.uid,
      title: task,
      status: 'not starting'
    };
    await addDoc(colRef, data);
    setTask("");
  }

  // 全件取得
  // taskSliceに受け渡し
  const getTask = async () => {
    const tasks = await getDocs(collection(db, "tasks"));
    let taskArr: object[] = [];
    tasks.forEach((task) => {
      taskArr.push(task.data());
    })
    dispatch(setTasks(taskArr));
  }

  return (
    <div>
      <input className={styles.input} value={task} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}/>
      <button className={styles.submit_button} onClick={submitTask}>submit</button>
      <button className={styles.submit_button} onClick={getTask}>get</button>
    </div>
  );
};

export default InputTask;
