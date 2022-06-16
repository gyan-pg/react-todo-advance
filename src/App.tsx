import React, { useEffect } from 'react';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from './features/userSlice';
import { auth } from './firebase';
// firebase
import { onAuthStateChanged } from 'firebase/auth';
// styles
import styles from "./scss/App.module.scss";
// component
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import Header from './components/Header';
import Footer from './components/Footer';

const App: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, authUser => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName
          })
        );
      } else {
        dispatch(logout());
      }
    });
    return () => unSub();
  }, [dispatch]);

  return (
    <>
    <Header />
      <main className={styles.main_wrap}>
        {user.uid ? (
          <div>
            <TaskList />
          </div>
        ) 
        : <Auth />}
      </main>
    <Footer />
    </>
  );
}

export default App;
