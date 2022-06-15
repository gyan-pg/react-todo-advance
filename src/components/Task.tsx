import React from "react";
// icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
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

  const {id, title, status} = props;

  // taskの進行状況によって、スタイルを切り替える。
  const checkStatus = () => { 
      switch (status) {
      case "not starting":
        return styles.task_card__title_not_start;
      case "processing" :
        return styles.task_card__title_processing;
      case "complete" :
        return styles.task_card__title_complete;
    }
  }

  const titleStyle = checkStatus();

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
    <div className={styles.wrapper}>
      <div className={styles.task_card}>
        <div className={styles.task_card__left} onClick={setClickedTaskId}>
          <h3 className={`${styles.task_card__title} ${titleStyle}`}>task</h3>
          <p className={styles.task_card__body}>{title}</p>
        </div>
        <div className={styles.task_card__right}>
          <button className={styles.button} onClick={deleteTask}><RiDeleteBin6Line /></button>
          <button className={status === ThirdPhase ? styles.button_finish : styles.button}
                  onClick={changeStatus}
                  disabled={status === ThirdPhase ? true : false}><FaArrowAltCircleRight /></button>
        </div>
      </div>
      <div className={styles.button_container}>
      </div>
    </div>
  )
};

export default Task;
