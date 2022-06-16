import React from "react";

// redux
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

// styles
import styles from "../scss/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>APP NAME</div>
      <div className={styles.header_right}>user</div>
    </header>
  );
};

export default Header;
