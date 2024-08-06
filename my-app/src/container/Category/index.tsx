import './style.scss'
import { useEffect, useState } from 'react';
import Docker from '../../Components/Docker';
import type { CategoriesTagsResponseType, ProductsType, ProductsResponseType } from './types';
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';

const Category = () => {

    //Storage of List Item Data
    const [ categories, setCategories ] = useState<Array<{id:string; name: string}>>([]);
    const [ tags, setTags ] = useState<Array<string>>([]);
    const [ products, setProducts ] = useState<Array<ProductsType>>([]);

    //Data Driving Request Sending
    const [ keyword, setKeyword ] = useState('');
    const [ currentCategory, setCurrentCategory ] = useState('');
    const [ currentTags, setCurrentTags ] = useState('');

    //Sending request dynamically according to request
    const { request: CategoriesTagRequest } = useRequest<CategoriesTagsResponseType>({manual: true});
    const { request: ProductsRequest } = useRequest<ProductsResponseType>({manual: true});

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
                <div className='products-item' key={item.id}>
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
                        <div className='products-item-button'>
                            Buy
                        </div>
                    </div>
                </div>)
            })
        }
    
       </div>
       <Docker activeName='Categories' />
    </div>
    )
}

export default Category;