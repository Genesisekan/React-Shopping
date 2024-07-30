import './style.scss'
import useRequest from '../../hooks/useRequest';
import { ResponseType } from './types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const locationValue = localStorage.getItem('location');
const locationHistory = locationValue ? JSON.parse(locationValue) : null;

const initialData = {
    url: '/nearby.json',
    method: 'POST',
    data: {
        latitude: locationHistory? locationHistory.latitude : 40.6618222,
        longitude: locationHistory? locationHistory.longitude : -74.088998
    }
}

const Nearby = () => {
    const { data } = useRequest<ResponseType>(initialData);
    const navigator = useNavigate();
    const [keyword, setKeyword] = useState('');
    const lists = (data?.data || []).filter((item)=>{
        return item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1 
    }) ;

    function handleItemClick(latitude: string, longitude: string){
        localStorage.setItem('location', JSON.stringify({latitude, longitude}));
        navigator('/home');
    }

    return (
    <div className="page nearby-page">
        <div className="title">
            <Link to='/home'>
                <i className="pi pi-chevron-left title-icon"></i>
            </Link>
            Switch Store
        </div>
        <div className='search'>
            <i className='pi pi-search search-icon'></i>
            <input 
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            className="search-input" 
            placeholder='please enter address'/>   
        </div>
        <div className="subtitle">Nearby Store</div>
        <ul className="list">
            {
                lists.map((item)=>{
                    return(
                        <li 
                        onClick={()=>{handleItemClick(item.latitude, item.longitude)}}
                        key={item.id} 
                        className="list-item">
                            <div className="list-item-left">
                                <div className="list-item-title">{item.name}</div>
                                <p className="list-item-desc">{item.openHours}</p>
                                <p className="list-item-desc">{item.address}</p>
                            </div>
                            <div className="list-item-right">
                                <i className='pi pi-map-marker list-item-distance'></i>
                                {item.distance}
                            </div>
                        </li>
                    )
                })
            }
        </ul>
    </div>
    )
}

export default Nearby;