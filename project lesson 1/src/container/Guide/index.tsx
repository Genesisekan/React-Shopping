import { useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'
import 'primeicons/primeicons.css';


const Guide = () => {
  const ref = useRef<HTMLDivElement>(null!);
  const navigator = useNavigate();

  useEffect( ()=>{
    ref.current.style.opacity = '1';
  }, []);

  const clickIconHandler = useCallback(()=>{
    navigator('/login');
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