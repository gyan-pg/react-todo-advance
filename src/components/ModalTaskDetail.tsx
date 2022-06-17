import React, { useEffect, useState } from "react";
// styles
import styles from "../scss/modalTaskDetail.module.scss";
// icons
import { AiOutlineClose, AiOutlineEdit, AiOutlineCheckSquare } from "react-icons/ai";
// redux
import { useSelector, useDispatch } from "react-redux";
import { selectTasks, clickedTaskId, exUpdateTask, exSetModalTaskFlg} from "../features/taskSlice";

interface TASK {
  id: string,
  uid: string,
  title: string,
  username: string,
  status: string,
  weight: string,
}

const ModalTaskDetail = () => {
  const [title, setTitle] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [weight, setWeight] = useState("");
  const [detail, setDetail] = useState("");
  const [editDetail, setEditDetail] = useState(false);
  const [uid, setUid] = useState("");
  const [id, setId] = useState("");
  const [status, setStatus] = useState("");
  const [editFlg, setEditFlg] = useState(false);

  const clickedId = useSelector(clickedTaskId);
  const tasks = useSelector(selectTasks);
  const dispatch = useDispatch();

  const clickEditTitle = () => {
    setEditTitle(true);
  }
  
  useEffect(() => {
    const clickedTask: any = tasks.find((task: TASK) => {
      return task.id === clickedId;
    });
    console.log("modal",clickedTask);
    if (clickedTask) {
      setUid(clickedTask.uid);
      setTitle(clickedTask.title);
      setWeight(clickedTask.weight);
      setDetail(clickedTask.detail);
      setId(clickedTask.id);
      setStatus(clickedTask.status);
    }

  },[]);

  const updateTask = () => {
    const data = {
      id,
      uid,
      title,
      detail,
      weight,
      status
    };
    dispatch(exUpdateTask(data));
    modalClose();
  }

  const modalClose = () => {
    dispatch(exSetModalTaskFlg());
  }

  return (
    <section id="modal" className={styles.modal_show} onClick={modalClose}>
      <div className={styles.modal_body} onClick={(e: any) => e.stopPropagation()}>
        {id ?
          <>
            {
              editTitle ? 
                <div className={styles.input_container}>
                  <input className={styles.input} autoFocus value={title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setTitle(e.target.value)
                                                                                                                                 setEditFlg(true)}}/>
                  <button className={styles.input_finish} onClick={() => setEditTitle(false)}><AiOutlineCheckSquare/></button>
                </div>
              :
                <div className={styles.input_container}>
                  <h2 className={styles.task_title}>{title}</h2>
                  <button className={styles.input_finish}><AiOutlineEdit className={styles.edit} onClick={clickEditTitle}/></button>
                </div>
            }
          
            <div className={styles.select_container}>
              <span>重要度：</span>
              <select className={styles.select} value={weight} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                                                                            setWeight(e.target.value)
                                                                                            setEditFlg(true)}}>
                <option value="high">高</option>
                <option value="middle">中</option>
                <option value="low">低</option>
              </select>
            </div>

            {
              detail || editDetail ?
                <>
                  <h3 className={styles.task_detail}>詳細
                    <button className={`${styles.edit} ${styles.button_edit}`} onClick={() => setEditDetail(!editDetail)}>
                      {editDetail ? <AiOutlineCheckSquare/> : <AiOutlineEdit/> }
                    </button>
                  </h3>
                  {editDetail ? <textarea autoFocus className={styles.textarea} onChange={(e:React.ChangeEvent<HTMLTextAreaElement>) => {setDetail(e.target.value);setEditFlg(true);}} value={detail}></textarea> : <div className={styles.detail}>{detail}</div> }
                </> 
            : 
                <button className={styles.task_detail} onClick={() => setEditDetail(true)}>詳細を追加</button>
            }
        </>
        : ""}
        <button className={styles.button_close} onClick={modalClose}><AiOutlineClose/></button>
        <button className={editFlg ? styles.button_update : `${styles.button_update} ${styles.disable}`} onClick={updateTask} disabled={!editFlg}>更新</button>
      </div>
    </section>
  );
};

export default ModalTaskDetail;
