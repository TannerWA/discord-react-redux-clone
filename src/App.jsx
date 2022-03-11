import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat/Chat'
import Login from './components/Login/Login'
import './App.css';
import {selectUser, login, logout} from './features/userSlice';
import { auth } from './firebase';

function App() {
  console.log(`${process.env.REACT_APP_API_KEY}`)
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user is logged in
        dispatch(login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        }))

      }else{
        // user is logged out
        dispatch(logout());
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      {user ? (
          <>
            { /* sidebar component */ }
            <Sidebar />
            { /* chat component */ }
            <Chat />
          </>
      ) : (
            <Login />
      )
    }
      
    </div>
  );
}

export default App;
