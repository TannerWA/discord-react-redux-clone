import React from 'react'
import './login.css'
import { Button } from '@mui/material';
import { auth, provider } from '../../firebase.js';
const Login = () => {

  const signIn = () => {
    //google sign in
    auth.signInWithPopup(provider).catch(error => alert(error.message));
  }

  return (
    <div className='login'>
      <div className='login_logo'>
        <img src="https://cdn.arstechnica.net/wp-content/uploads/2017/08/Discord-LogoWordmark-Color.png" alt=""/>
      </div>

      <Button onClick={signIn}>Sign in</Button>
    </div>
  )
}

export default Login