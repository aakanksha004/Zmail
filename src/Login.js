import React from 'react'
import "./css/login.css"
import { auth, provider } from './firebase'
import { useDispatch } from 'react-redux'
import { signin } from './features/userSlice'

const Login = () => {

    const dispatch= useDispatch();
    

    const login=()=>{
        auth.signInWithPopup(provider).then(({user})=>{
            dispatch(signin({
                displayName:user.displayName,
                photoUrl: user.photoURL,
                email: user.email
            }))
        }).catch(error=>{
            alert(error);
        })
    }
  return (
    <div className="loginwrapper">
        <div className="login">
        <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_r2.png" alt="" />
   
            <button className='gmail_login' onClick={login}>Login with Gmail</button>
            </div>
    </div>
  )
}

export default Login