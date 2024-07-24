import { Swiper, SwiperSlide } from 'swiper/react';


import './style.scss'
import 'swiper/css'
import 'primeicons/primeicons.css';
import { useState } from 'react';


const Home = () => {
    



    const [page, setPage] = useState(1);
    return (
    <div className="page home-page">
        <div className='banner'>
            <h3 className='location'>
                <span className='iconfont'>
                    <i className='pi pi-map-marker'></i>
                </span>
                Costco(Bayonne)
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
                    <SwiperSlide className='swiper-item'>
                        <div>
                            <img className='swiper-item-image' src={require('../../images/burger.jpg')} alt='burger' />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-item'>
                            <img className='swiper-item-image' src={require('../../images/organic.png')} alt='organic' />
                        </div></SwiperSlide>
                    <SwiperSlide>
                        <div className='swiper-item'>
                            <img className='swiper-item-image' src={require('../../images/pizza.png')} alt='pizza' />
                        </div>
                    </SwiperSlide>
                </Swiper>
                <div className='pagination'>{page}/3</div>
            </div>
        </div>
    </div>
    )
}

export default Home;
