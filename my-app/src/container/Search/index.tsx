import { ResponseType } from './types';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './style.scss'
import { useState } from 'react';
import useRequest from '../../hooks/useRequest';


const initialData = {  
    url: '/hotsearch.json',
    method: 'GET',
    params: { shopId: '' }
}


const Search = () => {
    const navigator = useNavigate();
    const localSearch = localStorage.getItem('search-list');
    const localSearchHistory: string[] = localSearch ? JSON.parse(localSearch) : [];    

    const [keyword, setKeyword] = useState('');
    const [historyKeyword, setHistoryKeyword] = useState(localSearchHistory);
    const params = useParams<{shopId: string}>();
    if(params.shopId) {
        initialData.params.shopId = params.shopId;
    }

    const { data } = useRequest<ResponseType>(initialData);
    const hotlist = data?.data || [];

    function handleEnterEvent(e: string) {
        if(e === 'Enter' && keyword){
            const repetiveIndex = historyKeyword.findIndex(value => value === keyword);
            const newHistoryKeyword = [...historyKeyword];
            if(repetiveIndex > -1){
                newHistoryKeyword.splice(repetiveIndex, 1);
            }
            newHistoryKeyword.unshift(keyword);
            if(newHistoryKeyword.length > 10){
                newHistoryKeyword.length = 10;
            }
            setHistoryKeyword(newHistoryKeyword);
            localStorage.setItem('search-list', JSON.stringify(newHistoryKeyword));
            navigator(`/searchList/${params.shopId}/${keyword}`)
            setKeyword('');
        }
    }

    function handleClearEvent() {
        setHistoryKeyword([]);
        localStorage.setItem('search-list', JSON.stringify([]));
    }

    function handleKeywordClick(item: string){
        navigator(`/searchList/${params.shopId}/${item}`);
    }

    return (
    <div className="page search-page">
       <div className='search'>
        <Link to={'/home'}>
            <i className="pi pi-chevron-left search-back"></i>
        </Link>
            <div className='search-area'>
                <i className='pi pi-search search-icon'></i>
                <input 
                value={keyword}
                className='search-input' 
                placeholder='Please Enter Product Name'
                onChange={(e)=>{setKeyword(e.target.value); }}
                onKeyDown={(e)=>{handleEnterEvent(e.key)}} />
            </div>
       </div>
       {
        historyKeyword.length ? (
            <>
                <div className='title'>
                    Recent Searches
                    <i className='pi pi-times-circle title-close' onClick={handleClearEvent}></i>
                </div>
                <ul className='list'>
                    {
                        historyKeyword.map((item,index)=>{
                            return (
                                <li 
                                key={item + index} 
                                className='list-item'
                                onClick={() => handleKeywordClick(item)}>{item}</li>
                            )
                        })
                    }
                </ul>
            </>
        ) : null
       }
       {
        hotlist.length ? (
            <>
                <div className='title'>
                Top Searches
                </div>
                <ul className='list'>
                    {
                        hotlist.map((item)=>{
                            return(<li 
                                key={item.id} 
                                className='list-item'
                                onClick={() => handleKeywordClick(item.name)}>{item.name}</li>);
                        })
                    }
                </ul>
            </>) : null
       }
    </div>
    )
}

export default Search;