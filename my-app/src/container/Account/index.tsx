// import { useEffect } from 'react';
import './style.scss'
import { Link, Outlet, useLocation } from 'react-router-dom';



const Account = () =>{
    const pathLocation = useLocation();
    const loginActiveClass = (pathLocation.pathname === "/account/login") ? 'tab-item-active' : '';
    const registerActiveClass = (pathLocation.pathname === "/account/register") ? 'tab-item-active' : '';

    // const navigator = useNavigate();

    // useEffect(() => {
    //     if(localStorage.getItem('token')){
    //         navigator('/home');
    //     }else{
    //         navigator('/account/login')
    //     }
    //     return () => {
            
    //     };
    // }, [navigator]);
    


    return(
        <div className="page account-page">
            <div className="tab">
                <div className={`tab-item tab-item-left ${loginActiveClass}`}>
                   <Link to={'/account/login'}>SignIn</Link>
                </div>
                <div className={`tab-item tab-item-right ${registerActiveClass}`}>
                    <Link to={'/account/register'}>SignUp</Link>
                </div>
            </div>
            <Outlet />
        </div>
    )
}

export default Account;