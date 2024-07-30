import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { BannersType, LocationType } from '../types';
import { useNavigate } from 'react-router-dom';

// type BannerType = {
//     location: LocationType | undefined;
//     banners: BannersType | undefined;
// }

const Banner = (props: {location: LocationType | undefined, banners: BannersType | undefined}) => {
    const [page, setPage] = useState(1);
    const {location, banners} = props;
    const navigator = useNavigate();

    function handleClick() { 
        navigator('/nearby');
    }

    return (
        <div className='banner'>
            <h3 className='location' onClick={handleClick}>
                <span className='iconfont'>
                    <i className='pi pi-map-marker'></i>
                </span>
                {location?.address || '' }
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
                        (banners || []).map((item) =>{
                            return(
                                <SwiperSlide key={item.id} className='swiper-item'>
                                    <div>
                                    <img className='swiper-item-image' src={item.imgUrl} alt='slidingPics' />
                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <div className='pagination'>{page}/{banners?.length}</div>
            </div>
        </div>
    )
}

export default Banner;