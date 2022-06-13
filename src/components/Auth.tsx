import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { auth, provider} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import styles from "../scss/Auth.module.scss";

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validFlg, setValidFlg] = useState(true);

  // stateはsetStateした後、即座に変更されるわけではないので、
  // あえて別変数で受けている。
  const validForm = (strEmail = email, strPass = password) => {
    if (strPass.length > 6 && strEmail.length > 0) {
      setValidFlg(false);
    } else {
      setValidFlg(true);
    }
  };


  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => alert(err.message));
  }

  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async () => {
    await createUserWithEmailAndPassword(auth, email, password);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLogin ? "LOGIN" : "REGISTER"}</h1>
        <label htmlFor="email">email</label>
        <input id="email"
               className={styles.input}
               type="text"
               name="email"
               value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 const str = e.target.value;
                 setEmail(str);
                 validForm(str, password);
                }}
        />

        <label htmlFor="password">password</label>
        <input id="password"
               className={styles.input}
               type="password"
               name="password"
               value={password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 const str = e.target.value;
                 setPassword(str);
                 validForm(email, str);
                }}
        />

        <button className={validFlg ? styles.login_button__disable : styles.login_button}
                disabled={validFlg}
                onClick={
                  isLogin
                    ? async () => {
                      try {
                        await signInEmail();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
                    : async () => {
                      try {
                        await signUpEmail();
                      } catch (err: any) {
                        alert(err.message);
                      }
                    }
                }
        >
          {isLogin ? "login" : "signIn"}
        </button>
        <button className={styles.login_button} onClick={signInGoogle}>Google</button>
      <span onClick={() => setIsLogin(!isLogin)}>{isLogin ? "SignIn?" : "Login?"}</span>
    </div>
  );
};

export default Auth;
