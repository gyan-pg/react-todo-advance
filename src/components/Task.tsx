import React from "react";
// icons
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { AiOutlineSmile, AiOutlineCoffee, AiOutlineThunderbolt } from "react-icons/ai";
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
  weight: string;
}

const Task: React.FC<TASK> = (props) => {

  const {id, title, status, weight} = props;

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

  // weightに応じたアイコンを代入する。
  const checkIcon = () => {
    switch (weight) {
      case "low" :
        return <AiOutlineCoffee/>;
      case "middle" :
        return <AiOutlineSmile/>;
      case "high" :
        return <AiOutlineThunderbolt/>;
    }
  }

  const titleStyle = checkStatus();
  const icon = checkIcon()

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
  };
  // タスクのタイトルが長い時にトリミング
  const checkTitleLength = (str: string) => {
    if (str.length > 15) {
      return str.substring(0, 14) + "...";
    } else {
      return str;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.task_card}>
        <div className={styles.task_card__left} onClick={setClickedTaskId}>
          <h3 className={`${styles.task_card__title} ${titleStyle}`}>task<span className={styles.icon}>{icon}</span></h3>
          <p className={styles.task_card__body}>{checkTitleLength(title)}</p>
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
