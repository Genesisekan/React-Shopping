import './style.css'

const Login = () =>{
    return(
        <div className="page login-page">
            <div className="tab">
                <div className="tab-item tab-item-left">SignIn</div>
                <div className="tab-item tab-item-right">SignUp</div>
            </div>
            <div className="form">
                <div className="form-item">
                    <div className="form-item-title">Email</div>
                    <input type="email" className="form-item-content emails" placeholder="Enter your email"/>
                </div>
                <div className="form-item">
                    <div className="form-item-title">Password</div>
                    <input type="password" className="form-item-content" placeholder="Enter your password"/>
                </div>
            </div>
            <div className="submit">
                Login
            </div>
            <p className="term">
                *By logging in you agree to Terms and Privacy Policy.
            </p>
        </div>
    )
}

export default Login;