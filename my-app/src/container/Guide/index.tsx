import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss'
import 'primeicons/primeicons.css';


const Guide = () => {
    //Handling animation logic
    const ref = useRef<HTMLDivElement>(null!);

    useEffect( ()=>{
    ref.current.style.opacity = '1';
    }, []);

    //Handling page navigation logic
    const navigator = useNavigate();
    const clickIconHandler = useCallback(()=>{
        if(localStorage.getItem('token')){
            navigator('/home');
        }else{
            navigator('/account/login')
        }
    },[navigator]);


    return (
    <div ref={ref} className="page guide-page">
    <img className="main-photo" src={require('../../images/halg_logo_icon_@2x.png')} alt='happy mart' />
    <p className='title'>Happy Mart</p>
    <img className="sub-pic" src={require('../../images/slogn_word_icon_@2x.png')} alt='sub-pic' />
    <div className="arrow-pos">
        <i className="pi pi-arrow-right arrow-icon" onClick={clickIconHandler}></i></div>
    </div>
    )
}

export default Guide;