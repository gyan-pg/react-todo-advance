import React from "react";
// redux
import { useDispatch } from "react-redux";
import { exDeleteTask, exChangeStatus, exSetClickedTaskId, exSetModalTaskFlg } from "../features/taskSlice";
// style
import styles from "../scss/Task.module.scss";
// const
import { ThirdPhase } from "../status";

interface TASK {
  id: string;
  uid: string;
  title: string;
  detail: string;
  username: string;
  status: string;
}

const Task: React.FC<TASK> = (props) => {

  const {id, title, status, detail} = props;
  
  const dispatch = useDispatch();
  
  // タスクの削除
  const deleteTask = () => {
    dispatch(exDeleteTask({uid: id}))
  };

  // ステータスの更新
  const changeStatus = () => {
    dispatch(exChangeStatus({
      id,
      status,
    }));
  };
  // クリックしたタスクのIDを通知
  const setClickedTaskId = () => {
    dispatch(exSetClickedTaskId({id}));
    dispatch(exSetModalTaskFlg());
  }

  return (
    <div className={styles.wrapper} onClick={setClickedTaskId}>
      <div className={styles.task_card}>
        <p>title:{title}</p>
        <p>status:{status}</p>
        <p>detail:{detail}</p>
      </div>
      <button className={styles.button} onClick={deleteTask}>delete</button>
      <button className={status === ThirdPhase ? styles.button_finish : styles.button}
              onClick={changeStatus}
              disabled={status === ThirdPhase ? true : false}>statusChange</button>
    </div>
  )
};

export default Task;
