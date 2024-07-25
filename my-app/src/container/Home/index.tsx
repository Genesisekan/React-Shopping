import './style.scss'
import 'swiper/css'
import 'primeicons/primeicons.css';
import type { ResponseType } from './types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useState } from 'react';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';




const locationValue = localStorage.getItem('location');
const locationHistory = locationValue ? JSON.parse(locationValue) : null;

const initialData = {
    url: '/home.json',
    method: 'POST',
    data: {
        latitude: locationHistory? locationHistory.latitude : 40.6618222,
        longitude: locationHistory? locationHistory.longitude : -74.088998
    }
}


const Home = () => {
    const [requestData, setRequestData] = useState(initialData);
    const { data } = useRequest<ResponseType>(requestData);


    //get user location
    useEffect(() => {
         if (navigator.geolocation && !locationValue) {
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
    }, []);
   
      


    const [page, setPage] = useState(1);
    return (
    <>
        <div className="page home-page">
            <div className='banner'>
                <h3 className='location'>
                    <span className='iconfont'>
                        <i className='pi pi-map-marker'></i>
                    </span>
                    {data?.data.location.address || '' }
                </h3>
                <div className='search'>
                    <span className='iconfont'>
                        <i className='pi pi-search'></i>
                    </span>
                    Please enter the content you need to search for
                </div>
                <div className='swiper-area'>
                    <Swiper
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(e: any) => {setPage(e.activeIndex + 1)}}
                    >
                        {
                            (data?.data.banners || []).map((item) =>{
                                return(
                                    <SwiperSlide key={item.id} className='swiper-item'>
                                        <div>
                                        <img className='swiper-item-image' src={item.url} alt='slidingPics' />
                                        </div>
                                    </SwiperSlide>
                                )
                            })
                        }
                    </Swiper>
                    <div className='pagination'>{page}/{data?.data.banners.length}</div>
                </div>
            </div>
            <div className='category'>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
                <div className='category-item'>
                    <img 
                    className='category-item-image'
                    alt='daily fruit' 
                    src='http://statics.dell-lee.com/shopping/category-1.png'/>
                    <p className='category-item-desc'>daiy fruit</p>
                </div>
            </div>
            <div className='cart'>
                <h3 className='cart-title'>
                    <img className='cart-title-image' src='http://statics.dell-lee.com/shopping/hot.png' />
                    Try New Products
                    <div className='card-title-more'>

                    </div>
                </h3>
            </div>
        </div>
    </>
    )
}

export default Home;
