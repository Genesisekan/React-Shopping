import './style.scss'
import { useEffect, useState } from 'react';
import { message } from '../../utils/message';
import Docker from '../../Components/Docker';
import { type CategoriesTagsResponseType, type ProductsType, type ProductsResponseType, type CartType, CartResponseType } from './types';
import useRequest from '../../hooks/useRequest';
import Popover from '../../Components/Popover';
import { CartChangeResponseType } from '../../types';
import { useNavigate } from 'react-router-dom';


const Category = () => {
    const navigator = useNavigate();
    //Storage of List Item Data
    const [ categories, setCategories ] = useState<Array<{id:string; name: string}>>([]);
    const [ tags, setTags ] = useState<Array<string>>([]);
    const [ products, setProducts ] = useState<Array<ProductsType>>([]);

    //Data Driving Request Sending
    const [ keyword, setKeyword ] = useState('');
    const [ currentCategory, setCurrentCategory ] = useState('');
    const [ currentTags, setCurrentTags ] = useState('');
    const [ showCart, setShowCart ] = useState(false);
    const [ cartProductInfo, setCartProductInfo ] = useState<CartType>({
        id: '',
        title: '',
        imgUrl: '',
        price: '',
        count: 0
    })

    //Sending request dynamically according to request
    const { request: CategoriesTagRequest } = useRequest<CategoriesTagsResponseType>({manual: true});
    const { request: ProductsRequest } = useRequest<ProductsResponseType>({manual: true});
    const { request: CartRequest } = useRequest<CartResponseType>({manual: true});
    const { request: changeCartRequest } = useRequest<CartChangeResponseType>({manual: true});
    
    useEffect(() => {
        ProductsRequest({
            url: '/category-search-list.json',
            method: 'POST',
            data: {
                tag: currentTags,
                keyword,
                category: currentCategory
            }
        }).then((response) => {
            if(response?.success){
               const result = response.data;
               setProducts(result);
            }
        }).catch((e) => {
            message(e?.message || 'Unknown error', 1500);
        })
        return () => {
            
        };
    }, [ProductsRequest, keyword, currentTags, currentCategory]);

    useEffect(() => {
        CategoriesTagRequest({
            url: '/category-list.json',
            method: 'GET',
        }).then((response) => {
            if(response?.success){
                setCategories(response.data.category);
                setTags(response.data.tag);
            }
        }).catch((e) => {
            message(e?.message || 'Unknown error', 1500);
        })
        return () => {
            
        };
    }, [CategoriesTagRequest]);

    //handle search input change
    function handleEnterEvent(key: string, target: EventTarget & HTMLInputElement) {
        if(key === 'Enter'){
            console.log(target);
            setKeyword(target.value);
        }
    }

    function handleItemClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>, productId: string){
        e.stopPropagation();
        CartRequest({
            url: '/cart-product-info.json',
            method: 'GET',
            params: {
                productId
            }
        }).then((response) => {
            if(response?.success){
                setCartProductInfo(response.data);
                setShowCart(true);
            }
        }).catch((e) => {
            message(e?.message || 'Unknown error', 1500);
        })
    }

    function handleCartCanceling(){
        setShowCart(false);
    }

    function handleCartItemChange(methods: string){
        const newCartProduct = { ...cartProductInfo};
        const { count } = newCartProduct;
        if(methods === 'minus'){
            newCartProduct.count = (count - 1) === 0 ? 0 : (count - 1);
        }else {
            newCartProduct.count = count + 1;
        }
        setCartProductInfo(newCartProduct);
    }

    function changeCartInfo() {
        changeCartRequest({
            url: '/cart-change.json',
            method: 'GET',
            params: {
               id: cartProductInfo.id,
               count: cartProductInfo.count
           }
        }).then((response)=>{
            setShowCart(false);
        }).catch((e)=>{
            message(e.message, 1500);
        })
    }

    return (
    <div className="page category-page">
        <div className='title'>
            Categories
        </div>
        <div className='search'>
            <div className='search-area'>
                <i className='pi pi-search search-icon'></i>
                <input 
                className='search-input' 
                placeholder='Please Enter Product Name'
                onKeyDown={(e)=>{handleEnterEvent(e.key, e.currentTarget)}}
                />
            </div>
       </div>
       <div className='category'>
        <div className= {(currentCategory === '') ? 
                        'category-item category-item-active': 'category-item'}
        onClick={() => setCurrentCategory('')}>All Products</div>
        {
            categories.map((item)=>{
                return(
                    <div 
                    key={item.id} 
                    className = {(currentCategory === item.id) ? 
                        'category-item category-item-active': 'category-item'}
                    onClick={()=>setCurrentCategory(item.id)}>{item.name}</div>
                )
            })
        }
        </div>
       <div className='tag'>
        <div className={(currentTags === '') ? 
                        'tag-item tag-item-active': 'tag-item'}
        onClick={() => setCurrentTags('')}>All</div>
        {
            tags.map((item,index)=>{
                return(
                    <div 
                    key={index + item} 
                    className= {(currentTags === item) ? 
                        'tag-item tag-item-active': 'tag-item'}
                    onClick={()=>setCurrentTags(item)}>{item}</div>
                )
            })
        }
       </div>
       <div className='products'>
        <div className='products-title'>
            Hot Topics({products.length})
        </div>
        {
            products.map((item)=>{
                return(
                <div 
                className='products-item' 
                key={item.id}
                onClick={()=>navigator(`/details/${item.id}`)}>
                    <img className='products-item-image' src={item.imgUrl} alt={item.title} />
                    <div className='products-item-content'>
                        <div className='products-item-title'>
                        {item.title} 
                        </div>
                        <div className='products-item-sales'>
                            Sold {item.sales}
                        </div>
                        <div className='products-item-price'>
                            <i className='pi pi-dollar'></i>
                            {item.price}
                        </div>
                        <div 
                        className='products-item-button'
                        onClick={(e) => handleItemClick(e,item.id)}>
                            Buy
                        </div>
                    </div>
                </div>)
            })
        }
    
       </div>
       <Docker activeName='Categories' />
       <Popover show={showCart} blankClickCallBack={handleCartCanceling}>
                <div className='cart'>
                    <div className='cart-content'>
                        <img src={cartProductInfo.imgUrl} alt={cartProductInfo.title} className='cart-content-image' />
                        <div className='cart-content-info'>
                            <div className='cart-content-title'>{cartProductInfo.title}</div>
                            <div className='cart-content-price'>
                                <i className='pi pi-dollar cart-content-price-dollar'></i>
                                {cartProductInfo.price}
                            </div>
                        </div>
                    </div>
                    <div className='cart-count'>
                        <div className='cart-count-content'>
                            Amount
                            <div className='cart-count-counter'>
                                <div className='cart-count-button' onClick={()=>{handleCartItemChange('minus')}}>-</div>
                                <div className='cart-count-text'>{cartProductInfo.count}</div>
                                <div className='cart-count-button' onClick={()=>{handleCartItemChange('plus')}}>+</div>  
                            </div>  
                        </div>
                    </div>
                    <div className='cart-buttons'>
                        <div className='cart-button cart-button-left' onClick={changeCartInfo}>Add to Cart</div>
                        <div className='cart-button cart-button-right'>Buy Now</div>
                    </div>
                </div>
            </Popover>
    </div>
    )
}

export default Category;