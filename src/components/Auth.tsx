import React, { useState } from "react";
// redux
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../features/userSlice";
// firebase
import { auth, provider} from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
// styles
import styles from "../scss/Auth.module.scss";
// icon
import { BsArrowClockwise } from "react-icons/bs";

const Auth: React.FC = () => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validFlg, setValidFlg] = useState(true);
  const [username, setUsername] = useState("");

  // stateはsetStateした後、即座に変更されるわけではないので、
  // あえて別変数で受けている。
  const validForm = (strEmail = email, strPass = password, strName = username) => {
    // ログイン画面の時
    if (strPass.length > 6 && strEmail.length > 0) {
      setValidFlg(false);
    } else {
      setValidFlg(true);
    }
    // サインアップ画面の時
    if (!isLogin) {
      if (strName.length > 0 && strPass.length > 6 && strEmail.length > 0) {
        setValidFlg(false);
      } else {
        setValidFlg(true);
      }
    }
  };


  const signInGoogle = async () => {
    await signInWithPopup(auth, provider).catch((err) => console.log(err.message));
  }

  const signInEmail = async () => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpEmail = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      updateProfile(user, {
        displayName: username,
        photoURL: "",
      })
    });
    dispatch(updateUserProfile({
      displayName: username,
      photoUrl: "",
    }))
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{isLogin ? "LOGIN" : "REGISTER"}</h1>
        {isLogin ? "" : (
          <>
            <input id="username"
                  className={styles.input}
                  type="text"
                  name="username"
                  placeholder="name"
                  value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const str = e.target.value;
                    setUsername(str);
                    validForm(email, password, str);
                    }}
            />
          </>
        )}
        
        <input id="email"
               className={styles.input}
               type="text"
               name="email"
               placeholder="email"
               value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 const str = e.target.value;
                 setEmail(str);
                 validForm(str, password);
                }}
        />

        <input id="password"
               className={styles.input}
               type="password"
               name="password"
               placeholder="password"
               value={password}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                 const str = e.target.value;
                 setPassword(str);
                 validForm(email, str);
                }}
        />
        <div className={styles.button_container}>
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
            {isLogin ? "Login" : "SignIn"}
          </button>
          <button className={styles.login_button} onClick={signInGoogle}>Google</button>
        </div>
      <button className={styles.change_form} onClick={() => setIsLogin(!isLogin)}><span className={styles.login_icon}><BsArrowClockwise/></span>{isLogin ? "SignIn" : "Login"}</button>
    </div>
  );
};

export default Auth;
