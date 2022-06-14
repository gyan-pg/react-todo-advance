import React, { useState } from "react";

// firebase
import { db } from "../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
// style
import styles from "../scss/Task.module.scss";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string
}

const Task: React.FC<TASK> = (props) => {

  const {id, title, status} = props;

  // タスクの消去
  const deleteTask = async () => {
    console.log('delete');
    console.log(id);
    await deleteDoc(doc(db, "tasks", id));
  };

  // ステータスの更新
  const statusChange = async () => {
    console.log("status change");
    let newStatus = "";
    if (status === "not starting") newStatus = "processing";
    if (status === "processing") newStatus = "complete";

    const taskRef = doc(db, "tasks", id);

    await updateDoc(taskRef, {
      status: newStatus,
    });
  }

  return (
    <div className={styles.wrapper}>
      <p>title:{title}</p>
      <p>status:{status}</p>
      <button className={styles.button} onClick={deleteTask}>delete</button>
      <button className={styles.button} onClick={statusChange} disabled={status === "complete" ? true : false}>statusChange</button>
    </div>
  )
};

export default Task;
