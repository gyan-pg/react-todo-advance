import React, { useEffect } from "react";
// components
import InputTask from "./InputTask";
import Task from "./Task";
import ModalTaskDetail from "./ModalTaskDetail";
//redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectTasks, exSetTasks } from "../features/taskSlice";
// const
import { FirstPhase, SecondPhase, ThirdPhase } from "../status";
// style
import styles from "../scss/TaskList.module.scss";
// firebase
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, getDocs, query, where } from "firebase/firestore";

interface TASK {
  id: string;
  uid: string;
  title: string;
  detail: string;
  username: string;
  status: string;
}


const TaskList = () => {
  const user = useSelector(selectUser);
  const taskList = useSelector(selectTasks);
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
          uid: data.uid
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
      <InputTask />
      <div className={styles.task_field}>
        <div className={styles.task_column}>
          <h3 className={styles.subtitle}>未着手</h3>
          <div className={styles.task_wrapper}>
          {notStartingTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
              />
            )
          }
          </div>
        </div>
        <div className={styles.task_column}>
          <h3 className={styles.subtitle}>処理中</h3>
          <div className={styles.task_wrapper}>
          {processingTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
              />
            )
          }
          </div>
        </div>
        <div className={styles.task_column}>
          <h3 className={styles.subtitle}>完了</h3>
          <div className={styles.task_wrapper}>
          {completeTask.map((task: TASK) => 
              <Task key={task.id}
                id={task.id}
                uid={task.uid}
                title={task.title}
                detail={task.detail}
                username={task.username}
                status={task.status}
              />
            )
          }
          </div>
        </div>
        <div className={taskList.length ? styles.hide : styles.no_task_msg }>タスクが登録されていません。何か登録してみましょう！</div>
      </div>
      <br/>
      <p>こんにちは。{user.displayName}さん。</p>
      <button onClick={() => signOut(auth)}>sign out</button>
      <ModalTaskDetail />
    </div>
  );
};

export default TaskList;
