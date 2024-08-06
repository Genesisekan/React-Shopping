import './style.scss'
import 'swiper/css'
import 'primeicons/primeicons.css';
import type { ResponseType } from './types';
import { useEffect, useState } from 'react';
import Docker from '../../Components/Docker';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';
import Banner from './components/Banner';
import Categories from './components/Categories';
import Card from './components/Card';




const initialData = {  
    url: '/home.json',
    method: 'POST',
    data: {
        latitude: 40.6618222,
        longitude: -74.088998
    }
}


const Home = () => {
    const [requestData, setRequestData] = useState(initialData);
    const { data } = useRequest<ResponseType>(requestData);

    const locationValue = localStorage.getItem('location');
    const locationHistory = locationValue ? JSON.parse(locationValue) : null;
    if(locationHistory){
        initialData.data.latitude = locationHistory.latitude;
        initialData.data.longitude = locationHistory.longitude;
    }

    //get user location
    useEffect(() => {
         if (navigator.geolocation && !locationHistory) {
            console.log('location get');
            navigator.geolocation.getCurrentPosition(
            (position) => {
                const {coords: {latitude, longitude}} = position;
                localStorage.setItem('location', JSON.stringify({latitude, longitude}));
                setRequestData({
                    ...initialData,
                    data: {latitude, longitude}
                });
            },
            (error) => {
               message(error.message, 1500);
            },{timeout:500});
        }
        return () => {
            
        };
    }, [locationHistory]);
   
    let location, banners, categories, freshes = undefined;
    const dataResult = data?.data;
    if(dataResult){
        location = dataResult.location;
        banners = dataResult.banners;
        categories = dataResult.categories;
        freshes = dataResult.freshes;
    }

    return (
    <>
        <div className="page home-page">
            <Banner location={location} banners={banners}/>
            <Categories categories={categories} />
            <Card title='New Products' freshes={freshes} />
            <div className='bottom'>
                -End of Page-
            </div>
            <Docker activeName='Home' />
        </div>
    </>
    )
}

export default Home;
