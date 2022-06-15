import React from "react";
// styles
import styles from "../scss/modalTaskDetail.module.scss";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, clickedTaskId, modalTaskFlg, exSetModalTaskFlg} from "../features/taskSlice";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string
}

const ModalTaskDetail = () => {
  const taskFlg = useSelector(modalTaskFlg);
  const clickedId = useSelector(clickedTaskId);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const clickedTask: any = tasks.find((task: TASK) => {
    return task.id === clickedId;
  });

  const modalClose = () => {
    dispatch(exSetModalTaskFlg());
  }

  return (
    <section id="modal" className={taskFlg ? styles.modal_show : styles.modal_hidden } onClick={modalClose}>
      <div className={styles.modal_body} onClick={(e: any) => e.stopPropagation()}>
        {clickedTask
        ? <>
          <p>{clickedTask.title}</p>
          <p>{clickedTask.detail}</p>
        </>
        : ""}
      </div>
    </section>
  );
};

export default ModalTaskDetail;
