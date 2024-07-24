import { useRef, useState } from 'react';
import './style.scss'
import useRequest from '../../utils/useRequest';
import Model, {ModelInterfaceType} from '../../components/Model';

type ResponseType = {
    success: boolean;
    data: boolean;
}

const Register = () =>{
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const modelRef = useRef<ModelInterfaceType>(null!);


    const {request} = useRequest<ResponseType>({
        url: '/register.json',
        method: 'POST',
        params: {
            username: username,
            email: email,
            password: password,
        }
    });

    function submitHandler(){
        if(!username){
            modelRef.current.showMessage('Username is required');
            return;
        }
        if(!email){
            modelRef.current.showMessage('Email is required');
            return;
        }
        if(!password){
            modelRef.current.showMessage('Password is required!');
            return;
        }
        if(password.length < 6){
            modelRef.current.showMessage('Password length must be at least 6 characters long');
            return;
        }
        if(confirmPassword !== password){
            modelRef.current.showMessage('passwords do not match');
            return;
        }
    
        request().then((response) => {
            if(response){
                console.log(response);
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
            <Model ref={modelRef} />
        </>
    )
}

export default Register;