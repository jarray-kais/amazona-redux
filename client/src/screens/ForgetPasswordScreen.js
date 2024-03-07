import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {forgetPassword} from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

const ForgetPasswordScreen = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");

    const Forget = useSelector((state)=>state.forget);
    const {loading , error , success} = Forget

    const userSignin = useSelector((state) => state.userSignin);    
    const { userInfo } = userSignin;
    const dispatch = useDispatch()

    useEffect(()=>{
        if (userInfo){
            navigate('/');
        }

    },[navigate , userInfo])

    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(forgetPassword(email))
    }
  return (
    <div>
        <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Forget Password</h1>
        </div>
        {success && <MessageBox variant="success">
        We sent reset password link to your email
              </MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
        <label htmlFor="email">Email address</label>
          <input
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='mb-3'>
            <button className="primary" type='submit'>send</button>
        </div>
        </form>
    </div>
  )
}

export default ForgetPasswordScreen