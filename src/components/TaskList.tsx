import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const TaskList = () => {

  return <div>TaskList
    <button onClick={() => signOut(auth)}>sign out</button>
  </div>;
};

export default TaskList;
