import { useRef, useState } from 'react';
import './style.scss'
import useRequest from '../../utils/useRequest';
import Model, {ModelInterfaceType} from '../../components/Model';
import { useNavigate } from 'react-router-dom';

type ResponseType = {
    success: boolean;
    data: {
        token: string;
    }
}

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const modelRef = useRef<ModelInterfaceType>(null!);


    const {request} = useRequest<ResponseType>();

    const navigator = useNavigate();
    // const signupClickHandler = useCallback(() => {
    //     navigator('/register')
    // }, [navigator])

    //handling log in click button
    function submitHandler(){
        if(!email){
            modelRef.current.showMessage('Email is required');
            return;
        }
        if(!password){
            modelRef.current.showMessage('Password is required!');
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
            modelRef.current.showMessage(e?.message || 'Unknown error');
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
            <Model ref={modelRef} />
        </>
    )
}

export default Login;