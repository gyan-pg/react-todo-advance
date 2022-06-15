import React, { useState } from "react";
import { FirstPhase } from "../status";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { exCreateTask } from "../features/taskSlice";
// style
import styles from "../scss/InputTask.module.scss";


const InputTask: React.FC = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const user = useSelector(selectUser);

  const submitTask = async () => {
    dispatch(exCreateTask({
      user: user.displayName,
      uid: user.uid,
      title: task,
      detail: detail,
      status: FirstPhase
    }));
    setTask("");
    setDetail("");
  };

  return (
    <div>
      <label htmlFor="title">タイトル</label>
      <input className={styles.input}
             id="title"
             value={task}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}/>
      <label htmlFor="detail">詳細</label>
      <input className={styles.input}
             id="detail"
             value={detail}
             placeholder="未入力可"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetail(e.target.value)}/>
      
      <button className={task.length > 0 ? styles.submit_button : styles.submit_button__not}
              onClick={submitTask}
              disabled={task.length > 0 ? false : true}>登録</button>
    </div>
  );
};

export default InputTask;
