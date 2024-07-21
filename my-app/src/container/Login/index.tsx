import { useEffect, useState } from 'react';
import './style.scss'
import useRequest from '../../utils/useRequest';
import Model from '../../components/Model';

type ResponseType = {
    name: string;
}

const Login = () =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModel, setShowModel] = useState(false);
    const [message, setMessage] = useState('');

    const {request} = useRequest<ResponseType>('./a.json', 'GET', {});

    function submitHandler(){
        request().then((response) => {
            if(response){
                console.log(response.name);
            }
        }).catch((e) => {
            setShowModel(true);
            setMessage(e.message);
        })
    }

    useEffect(() => {
        if(showModel){
            const timer = setTimeout(() => {
                setShowModel(false);
            }, 1500);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [showModel]);

    return(
        <div className="page login-page">
            <div className="tab">
                <div className="tab-item tab-item-left">SignIn</div>
                <div className="tab-item tab-item-right">SignUp</div>
            </div>
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
            {showModel ? <Model>{message}</Model> : null}
        </div>
    )
}

export default Login;