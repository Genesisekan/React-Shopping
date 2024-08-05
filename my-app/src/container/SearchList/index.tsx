import { ResponseType } from './types';
import { Link, useParams } from 'react-router-dom';
import './style.scss'
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';

const SearchList = () => {
    

    const params = useParams<{shopId: string, keyword: string}>();
    const [ keyword , setKeyword ] = useState(params.keyword);
    const [ tabs , setTabs ] = useState('Best Match');
    const [ requestData, setRequestData] =useState({
        url: '/shop-search-list.json',
        method: 'GET',
        params: {
            keyword,
            searchId: params.shopId,
            type: tabs 
        }    
    });

    const {data} = useRequest<ResponseType>(requestData);

    const result = data?.data || [];

    function handleClearEvent() {
        setKeyword('');
    }


    function handleKeyDown(e: string){
        if(e === 'Enter' && keyword){
            const localSearch = localStorage.getItem('search-list');
            const localSearchHistory: string[] = localSearch ? JSON.parse(localSearch) : [];
                
            const repetiveIndex = localSearchHistory.findIndex(value => value === keyword);
            const newHistoryKeyword = [...localSearchHistory];
            if(repetiveIndex > -1){
                newHistoryKeyword.splice(repetiveIndex, 1);
            }
            newHistoryKeyword.unshift(keyword);
            if(newHistoryKeyword.length > 10){
                newHistoryKeyword.length = 10;
            }
            localStorage.setItem('search-list', JSON.stringify(newHistoryKeyword));
            const newRequestData = {...requestData};
            newRequestData.params.keyword = keyword;
            setRequestData(newRequestData);
        }
    }

    function handleTabsChenge(types: string){
        setTabs(types);
        const newRequestData = {...requestData};
        newRequestData.params.type = types;
        setRequestData(newRequestData);
    }

    return (
    <div className="page search-list-page">
       <div className='search'>
        <Link to={`/search/${params.shopId}`}>
            <i className="pi pi-chevron-left search-back"></i>
        </Link>
            <div className='search-area'>
                <i className='pi pi-search search-icon'></i>
                <input 
                value = {keyword}
                className='search-input' 
                placeholder='Please Enter Product Name' 
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e.key)}/>
                <i
                className='pi pi-times-circle search-clear'
                onClick={handleClearEvent}></i>
            </div>
       </div>
        <div className='tab'>
            <div 
            className={tabs === 'Best Match' ? 'tab-item tab-item-active' : 'tab-item'}
            onClick={() => handleTabsChenge('Best Match')}>Best Match</div>
            <div className={tabs === 'Best Seller' ? 'tab-item tab-item-active' : 'tab-item'}
            onClick={() => handleTabsChenge('Best Seller')}>Best Seller</div> 
            <div className={tabs === 'Price Low' ? 'tab-item tab-item-active' : 'tab-item'}
            onClick={() => handleTabsChenge('Price Low')}>Price Low</div>
        </div>
        <div className='list'>
            {
                result.map((item => {
                    return(
                        <Link to={`/details/${item.id}`}>
                            <div className='list-item' key={item.id}>
                                <img className='list-item-img' alt={item.title} src={item.imgUrl} ></img>
                                <div className='list-item-content'>
                                    <p className='list-item-title'>{item.title}</p>
                                    <div className='list-item-price'>
                                        <i className='pi pi-dollar list-item-price-dollar'></i>
                                        {item.price}
                                    </div>
                                    <div className='list-item-sales'>{item.sales} bought</div>
                                </div>
                            </div>
                        </Link>
                    )
                }))
            }
        </div>
        <div className='bottom'>
                -End of Page-
            </div>
    </div>
    )
}

export default SearchList;