import './style.scss'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { LoginResponseType } from './types';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';



const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const {request} = useRequest<LoginResponseType>({manual: true});
    const navigator = useNavigate();

    //handling log in click button
    function submitHandler(){
        if(!email){
            message('Email is required', 1500);
            return;
        }
        if(!password){
            message('Password is required!', 1500);
            return;
        }
    
        request({
            url: '/login.json',
            method: 'GET',
            params: {
                name: 'savannah'
            }}).then((response) => {
            if(response){
                const {data: {token} } = response
                if(token){
                    localStorage.setItem('token', token);
                    navigator('/home'); 
                }

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
                    <div className="form-item-title">Email</div>
                    <input value={email}
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
            </div>
            <div className="submit" onClick={submitHandler}>
                Login
            </div>
            <p className="term">
                *By logging in you agree to Terms and Privacy Policy.
            </p>
        </>
    )
}

export default Login;