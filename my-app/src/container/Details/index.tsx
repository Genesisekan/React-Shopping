import type { ResponseType } from './types';
import useRequest from '../../hooks/useRequest';
import { useNavigate, useParams } from 'react-router-dom';
import './style.scss'

const request = {
     url: '/details.json',
        method: 'GET',
        params: {
            id: ""
        }
}

const Details = () => {
    const navigator = useNavigate();
    const params = useParams<{id: string}>();
    if(params.id){
        request.params.id = params.id;
    }

    const { data } = useRequest<ResponseType>(request);
    const result = data?.data || null;

    return result? (
        <div className='page details-page'>
            <div className='title'>
                <i className="pi pi-chevron-left search-back" onClick={()=>navigator(-1)}></i>
                Product Details
            </div>
            <img className='image' src={result.imgUrl} alt={result.title} />
            <div className='main'>
                <div className='main-price'>
                    <i className='pi pi-dollar main-price-dollar'></i>
                    {result.price}
                </div>
                <div className='main-sales'>{result.sales} Sold</div>
                <div className='main-content'>
                    <div className='main-content-title'>{result.title}</div>
                    <p className='main-content-subtitle'>{result.subtitle}</p>
                </div>
            </div>
            <div className='spec'>
                <div className='spec-title'>Product Information</div>
                <div className='spec-content'>
                    <div className='spec-content-left'>
                        <p className='spec-content-item'>Origin of ingredients</p>
                        <p className='spec-content-item'>Quantity</p>
                    </div>
                    <div className='spec-content-right'>
                        <p className='spec-content-item spec-content-item1'>{result.origin}</p>
                        <p className='spec-content-item spec-content-item2'>{result.specification}</p>
                    </div>
                </div>
            </div>
            <div className='details'>
                <div className='details-title'>Product Description</div>
                <div className='details-content'>
                {result.detail}
                </div>
            </div>
            <div className='docker'>
                <div className='docker-cart'> 
                  <i className='pi pi-shopping-cart iconfont'></i>
                  <div className='icon-text'>Cart</div>  
                </div>
                <div className='cart-button'>Add to cart</div>
            </div>
        </div>
    ) : null
}

export default Details;