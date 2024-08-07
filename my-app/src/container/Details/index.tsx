import './style.scss'
import { useEffect, useRef, useState } from 'react';
import { type ResponseType, type CartResponseType } from './types';
import { CartChangeResponseType } from '../../types';
import useRequest from '../../hooks/useRequest';
import { useNavigate, useParams } from 'react-router-dom';
import Popover from '../../Components/Popover';
import { message } from '../../utils/message';



const Details = () => {
    const navigator = useNavigate();
    const [ showCart, setShowCart ] = useState(false);
    const params = useParams<{id: string}>();
    const requestData = useRef({
        url: '/details.json',
           method: 'GET',
           params: {
               id: params!.id
           }
   })
    const { data } = useRequest<ResponseType>(requestData.current);

    const [ count, setCount ] = useState(0);
    const [ tempCount, setTempCount ] = useState(0);
    const { request } = useRequest<CartResponseType>({manual: true});
    const result = data?.data || null;

    useEffect(()=>{
        request({
            url: '/cart.json',
            method: 'GET',
            params: {
               id: params!.id
           }
        }).then((response)=>{
            setCount(response.data.count);
            setTempCount(response.data.count);
        }).catch((e)=>{
            message("something went wrong", 1500);
        })
    },[request, params])

    function changeTempCount(tempCounts: number) {
        if(tempCounts < 0){
            setTempCount(0);
        }else{
            setTempCount(tempCounts);
        }
    }

    function handleCartCanceling(){
        setShowCart(false);
        setTempCount(count);
    }

    const { request: changeCartRequest } = useRequest<CartChangeResponseType>({manual: true});
    function changeCartInfo() {
        changeCartRequest({
            url: '/cart-change.json',
            method: 'GET',
            params: {
               id: params!.id,
               count: tempCount
           }
        }).then((response)=>{
            setShowCart(false);
            setCount(tempCount);
        }).catch((e)=>{
            message(e.message, 1500);
        })
    }

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
                    <i className='pi pi-shopping-cart iconfont'>
                        <span className='icon-count'>{count}</span>
                    </i>
                    <div className='icon-text'>
                        Cart 
                    </div>  
                </div>
                <div className='cart-button' onClick={()=> {setShowCart(true)}}>Add to cart</div>
            </div>
            <Popover show={showCart} blankClickCallBack={handleCartCanceling}>
                <div className='cart'>
                    <div className='cart-content'>
                        <img src={result.imgUrl} alt={result.title} className='cart-content-image' />
                        <div className='cart-content-info'>
                            <div className='cart-content-title'>{result.title}</div>
                            <div className='cart-content-price'>
                                <i className='pi pi-dollar cart-content-price-dollar'></i>
                                {result.price}
                            </div>
                        </div>
                    </div>
                    <div className='cart-count'>
                        <div className='cart-count-content'>
                            Amount
                            <div className='cart-count-counter'>
                                <div className='cart-count-button' onClick={()=>changeTempCount(tempCount-1)}>-</div>
                                <div className='cart-count-text'>{tempCount}</div>
                                <div className='cart-count-button' onClick={()=>changeTempCount(tempCount+1)}>+</div>  
                            </div>  
                        </div>
                    </div>
                    <div className='cart-button' onClick={changeCartInfo}>Add to cart</div>
                </div>
            </Popover>
        </div>
    ) : null
}

export default Details;