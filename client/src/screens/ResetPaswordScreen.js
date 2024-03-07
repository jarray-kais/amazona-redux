import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';


const ResetPaswordScreen = () => {
  const navigate = useNavigate();
  const { token}  = useParams();
  console.log(token)

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const reset = useSelector((state)=>state.reset);
    const {loading , error , success} = reset
  const userSignin = useSelector((state) => state.userSignin);    
    const { userInfo } = userSignin;

    const dispatch =useDispatch()

    useEffect(() => {
       if (userInfo || ! token) {
        navigate('/');
      } 
    }, [navigate, userInfo, token]);
    const submitHandler = (e)=>{

      e.preventDefault()
    if (password !== confirmPassword) {
        console.log(error)
    }else{
     dispatch(resetPassword(password ,token))
      navigate ('/signin')
    }
  }

  return (
    <div>
          <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Reset Password</h1>
        </div>
        {success && <MessageBox variant="success">
        Password reseted successfully
              </MessageBox>}
        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <div>
        <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
        <label htmlFor="passwod">confirm Password</label>
          <input
            type="password"
            placeholder="Enter confirm password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className='mb-3'>
            <button className="primary" type='submit'>Reset</button>
        </div>
        </form>
    </div>
  )
}

export default ResetPaswordScreen