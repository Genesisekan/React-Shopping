import { useNavigate } from "react-router-dom";
import { FreshesType } from "../types"

const Card = (props: {title: string, freshes: FreshesType | undefined}) => {
    const {title, freshes} = props;
    const navigator = useNavigate();

    function handleItemClick(itemId: string){
        navigator(`/details/${itemId}`);
    }
    return(
        <div className='card'>
            <h3 className='card-title'>
                    <img alt={title}
                    className='card-title-image' 
                    src='http://statics.dell-lee.com/shopping/hot.png' />
                    {title}
                    <div className='card-title-more'>
                        More 
                        <span className='iconfont'>
                            <i className='pi pi-arrow-circle-right'></i>
                        </span>
                    </div>
            </h3>
            <div className='card-content'>
            {
                (freshes || []).map((item) => {
                    return(
                        <div 
                        key={item.id} 
                        className='card-content-item'
                        onClick={() => handleItemClick(item.id)}>
                            <img 
                            alt={item.name}
                            className='card-content-item-img'
                            src={item.imgUrl}/>
                            <p className='card-content-item-desc'>{item.name}</p>
                            <div className='card-content-item-price'>
                                <i className='pi pi-dollar card-content-item-dollar'></i>
                                {item.price}
                                <div className='iconfont'>
                                    <i className='pi pi-plus-circle'></i>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div> 
        </div>
    )
}

export default Card;