import React, { useEffect } from "react";
import InputTask from "./InputTask";
import Task from "./Task";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectTasks, setTasks } from "../features/taskSlice";

import styles from "../scss/TaskList.module.scss";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { collection, onSnapshot, getDocs, query, where } from "firebase/firestore";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string
}


const TaskList = () => {
  const user = useSelector(selectUser);
  const taskList = useSelector(selectTasks);
  const dispatch = useDispatch();

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
          status: data.status,
          user: data.user,
          uid: data.uid
        });
      });
      dispatch(setTasks(tasks));
    });
    return () => {
      unSub()
    };
  }, []);

  return ( 
    <div className={styles.wrapper}>
      <InputTask />
      <div>
        {taskList.map((task: TASK) => 
            <Task key={task.id}
              id={task.id}
              uid={task.uid}
              title={task.title}
              username={task.username}
              status={task.status}
            />
          )
        }
      </div>
      <br/>
      <p>こんにちは。{user.displayName}さん。</p>
      <button onClick={() => signOut(auth)}>sign out</button>
    </div>
  );
};

export default TaskList;
