import React from "react";
// styles
import styles from "../scss/modalTaskDetail.module.scss";
// icons
import { AiOutlineClose } from "react-icons/ai";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, clickedTaskId, modalTaskFlg, exSetModalTaskFlg} from "../features/taskSlice";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string,
  weight: string,
}

const ModalTaskDetail = () => {
  const taskFlg = useSelector(modalTaskFlg);
  const clickedId = useSelector(clickedTaskId);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  
  const clickedTask: any = tasks.find((task: TASK) => {
    return task.id === clickedId;
  });

  const weightToStr = (str: string) => {
    switch (str) {
      case "low" :
        return "低";
      case "middle" :
        return "中";
      case "high" :
        return "高";
    }
  }

  const modalClose = () => {
    dispatch(exSetModalTaskFlg());
  }

  return (
    <section id="modal" className={taskFlg ? styles.modal_show : styles.modal_hidden } onClick={modalClose}>
      <div className={styles.modal_body} onClick={(e: any) => e.stopPropagation()}>
        {clickedTask
        ? <>
          <h2 className={styles.task_title}>{clickedTask.title}</h2>
          <p className={styles.task_weight}>重要度：{weightToStr(clickedTask.weight)}</p>
          {clickedTask.detail
          ? <>
            <h3 className={styles.task_detail}>詳細</h3>
            <div>{clickedTask.detail}</div>
          </> 
          : ""}
        </>
        : ""}
        <button className={styles.button_close} onClick={modalClose}><AiOutlineClose/></button>
      </div>
    </section>
  );
};

export default ModalTaskDetail;
