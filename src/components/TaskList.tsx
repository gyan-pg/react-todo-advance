import React, { useEffect, useState } from "react";
// components
import InputTask from "./InputTask";
import Task from "./Task";
import ModalTaskDetail from "./ModalTaskDetail";
//redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectTasks, exSetTasks, modalTaskFlg } from "../features/taskSlice";
// const
import { FirstPhase, SecondPhase, ThirdPhase } from "../status";
// style
import styles from "../scss/TaskList.module.scss";
// icons
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
// firebase
import { db } from "../firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

interface TASK {
  id: string;
  uid: string;
  title: string;
  detail: string;
  username: string;
  status: string;
  weight: string;
}


const TaskList = () => {
  const [showInput, setShowInput] = useState(false);
  const user = useSelector(selectUser);
  const taskList = useSelector(selectTasks);
  const modalFlg = useSelector(modalTaskFlg);
  const dispatch = useDispatch();

  // taskListの振り分け
  // status === not starting
  const notStartingTask = taskList.filter((task: TASK) => {
    if(task.status === FirstPhase) {
      return task;
    }
  });
  // status === processing
  const processingTask = taskList.filter((task: TASK) => {
    if(task.status === SecondPhase) {
      return task;
    }
  });
  // status === complete
  const completeTask = taskList.filter((task: TASK) => {
    if(task.status === ThirdPhase) {
      return task;
    }
  });


  useEffect(() => {
    // ログイン済みユーザーが登録したタスクを取得
    const q = query(collection(db, "tasks"),where("uid", "==", user.uid ));
    const unSub = onSnapshot(q, (querySnapshot) => {
      const tasks: object[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.id,// firestoreのdocのidが取れる。
          title: data.title,
          detail: data.detail,
          status: data.status,
          user: data.user,
          uid: data.uid,
          weight: data.weight
        });
      });
      dispatch(exSetTasks(tasks));
    });
    return () => {
      unSub()
    };
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Task List</h2>
      <div className={styles.task_field}>
        <div className={styles.task_column}>
          <h3 className={`${styles.subtitle} ${styles.subtitle__not_start}`}>未着手</h3>
          <div className={styles.task_wrapper}>
          {notStartingTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
                weight={task.weight}
              />
            )
          }
          </div>
        </div>
        <div className={styles.task_column}>
          <h3 className={`${styles.subtitle} ${styles.subtitle__processing}`}>処理中</h3>
          <div className={styles.task_wrapper}>
          {processingTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
                weight={task.weight}
              />
            )
          }
          </div>
        </div>
        <div className={styles.task_column}>
          <h3 className={`${styles.subtitle} ${styles.subtitle__complete}`}>完了</h3>
          <div className={styles.task_wrapper}>
          {completeTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
                weight={task.weight}
              />
            )
          }
          </div>
        </div>
        <div className={taskList.length ? styles.hide : styles.no_task_msg }><p className={styles.no_task_msg_inner}>タスクが登録されていません。何か登録してみましょう！</p></div>
      </div>
      <br/>
      <div className={styles.button_container}>
        <button className={styles.button} onClick={() => {setShowInput(!showInput)}}>{showInput ? <AiOutlineMinusSquare/> : <AiOutlinePlusSquare/>}</button>
      </div>
      {showInput ? <InputTask /> : ""}
      {modalFlg ? <ModalTaskDetail /> : ""}
    </div>
  );
};

export default TaskList;
