import React from "react";

// redux
import { useSelector } from "react-redux";
import { isLogin, selectUser } from "../features/userSlice";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
// styles
import styles from "../scss/Header.module.scss";
// icons
import { MdLogout } from "react-icons/md"

const Header = () => {
  const user = useSelector(selectUser)
  const loginState = useSelector(isLogin);

  return (
    <header className={styles.header}>
      <div className={styles.header_left}>TASK LIST APP</div>
      <div className={styles.header_right}>
        <span className={styles.username}>{loginState ? user.displayName : ""}</span>
        {loginState ? (
          <span className={styles.logout}>
            <MdLogout onClick={() => signOut(auth)}/> 
          </span>) : ""}
      </div>
    </header>
  );
};

export default Header;
