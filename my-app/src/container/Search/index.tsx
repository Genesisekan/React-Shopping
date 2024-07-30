import './style.scss'

const Search = () => {


    return (
    <div className="page search-page">
       <div className='search'>
            <i className="pi pi-chevron-left search-back"></i>
            <div className='search-area'>
                <i className='pi pi-search search-icon'></i>
                <input className='search-input' placeholder='Please Enter Product Name'/>
            </div>
       </div>
       <div className='title'>
        Recent Searches
        <i className='pi pi-times-circle title-close'></i>
       </div>
       <ul className='list'>
        <li className='list-item'>Large Shrimp</li>
        <li className='list-item'>Sirloin steak</li>
        <li className='list-item'>Salmon</li>
        <li className='list-item'>Brussel Sprouts</li>
        <li className='list-item'>Energy Drinks</li>
       </ul>
       <div className='title'>
        Top Searches
       </div>
       <ul className='list'>
        <li className='list-item'>Large Shrimp</li>
        <li className='list-item'>Sirloin steak</li>
        <li className='list-item'>Salmon</li>
        <li className='list-item'>Brussel Sprouts</li>
        <li className='list-item'>Energy Drinks</li>
       </ul>
    </div>
    )
}

export default Search;