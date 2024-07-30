import { CategoriesType } from "../types";

const Categories = (props: {categories: CategoriesType | undefined}) => {
    const {categories} = props;
    return(
        <div className='category'>
            {
                (categories || []).map((item) =>{
                    return(
                        <div key={item.id} className='category-item'>
                            <img 
                            className='category-item-image'
                            alt={item.name}
                            src={item.imgUrl}/>
                            <p className='category-item-desc'>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Categories;