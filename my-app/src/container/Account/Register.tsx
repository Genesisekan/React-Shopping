import './style.scss'
import type { LoginResponseType } from './types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useRequest from '../../hooks/useRequest';

import { message } from '../../utils/message';


const Register = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigator = useNavigate();


    const {request} = useRequest<LoginResponseType>({manual: true});

    function submitHandler(){
        if(!username){
            message('Username is required', 1500);
            return;
        }
        if(!email){
            message('Email is required', 1500);
            return;
        }
        if(!password){
            message('Password is required!', 1500);
            return;
        }
        if(password.length < 6){
            message('Password length must be at least 6 characters long', 1500);
            return;
        }
        if(confirmPassword !== password){
            message('passwords do not match', 1500);
            return;
        }
    
        request({
            url: '/register.json',
            method: 'POST',
            params: {
                username: username,
                email: email,
                password: password,
            }
        }).then((response) => {
            if(response?.success){
                navigator('/account/login');
            }
        }).catch((e) => {
            message(e?.message || 'Unknown error', 1500);
            // setShowModel(true);
            // setMessage(e.message);
        })
    }



    return(
        <>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">Username</div>
                    <input 
                    value={username}
                    className="form-item-content" 
                    placeholder="Enter your username"
                    onChange={(e)=> {setUsername(e.target.value)}}/>
                </div>
                <div className="form-item">
                    <div className="form-item-title">Email</div>
                    <input 
                    value={email}
                    type="email" 
                    className="form-item-content emails" 
                    placeholder="Enter your email"
                    onChange={(e) => {setEmail(e.target.value)}} />
                </div>
                <div className="form-item">
                    <div className="form-item-title">Password</div>
                    <input 
                    value={password}
                    type="password" 
                    className="form-item-content" 
                    placeholder="Enter your password"
                    onChange={(e) => {setPassword(e.target.value)}}/>
                </div>
                <div className="form-item">
                    <div className="form-item-title">Confirm Password</div>
                    <input 
                    value={confirmPassword}
                    type="password" 
                    className="form-item-content" 
                    placeholder="Comfirm your password"
                    onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                </div>
            </div>
            <div className="submit" onClick={submitHandler}>
                Register
            </div>
        </>
    )
}

export default Register;