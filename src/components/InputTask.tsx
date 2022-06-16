import React, { useState } from "react";
import { FirstPhase } from "../status";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { exCreateTask } from "../features/taskSlice";
// style
import styles from "../scss/InputTask.module.scss";
//icons
import { AiOutlineSmile, AiOutlineCoffee, AiOutlineThunderbolt } from "react-icons/ai";

const InputTask: React.FC = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState("");
  const [detail, setDetail] = useState("");
  const [weight, setWeight] = useState("middle");
  const [selectIcon, setSelectIcon] = useState(<AiOutlineSmile/>);
  const user = useSelector(selectUser);

  const setIcon = (icon: string) => {
    switch (icon) {
      case "middle" :
        setSelectIcon(<AiOutlineSmile/>);
        break;
      case "low" :
        setSelectIcon(<AiOutlineCoffee/>);
        break;
      case "high" :
        setSelectIcon(<AiOutlineThunderbolt/>);
        break;
      default :
        return "";
    }
  };

  const submitTask = async () => {
    dispatch(exCreateTask({
      user: user.displayName,
      uid: user.uid,
      title: task,
      detail: detail,
      status: FirstPhase,
      weight: weight,
    }));
    setTask("");
    setDetail("");
  };

  return (
    <div className={styles.form_wrap}>
      <div className={styles.form_multi_column}>
        <input className={styles.input_title}
              id="title"
              placeholder="タイトル"
              value={task}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}/>
        <div className={styles.form_double_column}>
          <label htmlFor="weight" className={styles.select_title}>重要度</label>
          <div className={styles.select_wrap}>
            <select id="weight" className={styles.select} value={weight} 
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setWeight(e.target.value);
                      setIcon(e.target.value);
                      }}>
              <option value="high">高</option>
              <option value="middle">中</option>
              <option value="low">低</option>
            </select>
            <span>{selectIcon}</span>
          </div>
        </div>
        <button className={task.length > 0 ? styles.submit_button : `${styles.submit_button} ${styles.submit_button__not}`}
                onClick={submitTask}
                disabled={task.length > 0 ? false : true}>タスクを作成</button>
      </div>
      <input className={styles.input}
             id="detail"
             value={detail}
             placeholder="詳細(未入力可)"
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDetail(e.target.value)} />
    </div>
  );
};

export default InputTask;
