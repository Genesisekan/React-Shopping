import { useEffect, useState } from 'react';
import { ResponseType, ListItemType, CartSubmitArray, submitRequestType } from './types';
import Docker from '../../Components/Docker';
import './style.scss'
import useRequest from '../../hooks/useRequest';
import { message } from '../../utils/message';

const Cart = () => {

    const { request } = useRequest<ResponseType>({manual: true});
    const { request: submitRequest } = useRequest<submitRequestType>({manual: true});
    const [ lists, setLists ] = useState<ListItemType[]>([]);

    useEffect(() => {
        request({
            url: 'cart-product.json',
            method: 'GET'
        }).then((response) => {
            const newData = response.data;
            const newList = newData.map((list)=>{
                const newCartList = list.cartList.map((cartLists)=>{
                    return {...cartLists, selected: false};
                })
                return{shopId: list.shopId, shopName: list.shopName, cartList: newCartList};
            });
            setLists(newList);
        }).catch((e) => {
            message(e.message, 1500);
        })
    }, [request]);

    function handleCountChange(shopId: string, productId: string, e: string){
        const newList = [...lists];
        const shop = newList.find(shop => shop.shopId === shopId);
        const item = shop?.cartList.find(product => product.productId === productId);
        const countNumber = +e;
        if(item){
            item.count = Number.isNaN(countNumber) ? 0 : countNumber;
        }
        setLists(newList);
    }

    function handleItemClick(shopId: string, productId: string){
        const newList = [...lists];
        const shop = newList.find(shop => shop.shopId === shopId);
        let shopAllSelected = true;
        shop?.cartList.forEach((item)=>{
            if(item.productId === productId){
                item.selected = !item.selected;
            }
            if(!item.selected){
                shopAllSelected = false;
            }
        });
        shop!.selected = shopAllSelected;
        setLists(newList);
    }

    function handleShopClick(shopId: string){
        // 创建新列表的副本
        const newList = [...lists];

        // 找到点击的商店
        const shop = newList.find(shop => shop.shopId === shopId);
        
        // 确保 shop 存在
        if (shop) {
            // 检查该商店下的商品是否全部选中
            const allSelected = shop.cartList.every(item => item.selected);

            // 反转每个商品的 selected 状态
            shop.cartList = shop.cartList.map(item => ({
                ...item,
                selected: !allSelected // 如果所有商品都已选中，反选；否则全选
            }));

            // 更新商店的 selected 状态
            shop.selected = !allSelected;
        }

        // 更新列表状态
        setLists(newList);
    }


    function handleAllSelected() {
        const allSelected = lists.every(shop => shop.selected || shop.selected === undefined ? true : false);
        
        // 更新列表状态
        const newList = lists.map(shop => ({
            ...shop,
            selected: !allSelected, 
            cartList: shop.cartList.map(product => ({
                ...product,
                selected: !allSelected 
            }))
        }));
        
        setLists(newList);
    }

    function handleCartCheckout(){
         const param: CartSubmitArray = [];
         lists.forEach(shop => {
            shop.cartList.forEach(product => {
                if(product.selected){
                    param.push({
                        productId: product.productId,
                        count: product.count
                    })
                }
            })
         });
         if(param.length === 0){
            message('Please select at least one item', 1500);
         }else {
            submitRequest({
                url: '/cart-submit.json',
                method: 'POST',
                data: param 
            }).then((response) =>{
                const { orderId } = response.data;
            }).catch(e => message(e.message, 1500))
         }
    }
    
    const productNotSelected = lists.find(shop => !shop.selected);
    let count = 0;
    let totalPrice = 0;
    lists.forEach((shop)=>{
        shop.cartList.forEach((product)=>{
            if(product.selected){
                count += product.count;
                totalPrice += (product.price * product.count);  
            }
        })
    })
    

    return (
        <div className='page cart-page'>
            <div className='title'>
                Cart
            </div>
            { lists.map((shop) => {
                return(            
                <div className='shop' key={shop.shopId}>
                    <div className='shop-title'>
                        <div 
                        className={shop.selected ? 'radio radio-active' : 'radio'}
                        onClick={()=> handleShopClick(shop.shopId)}></div>
                        <i className='pi pi-shop'></i>
                        {shop.shopName}
                    </div>
    
                    {shop.cartList.map(item => {
                        return(                    
                        <div className='shop-products' key={item.productId}>
                            <div className='shop-product'>
                                <div 
                                className={item.selected ? 'radio radio-active' : 'radio'}
                                onClick={() => handleItemClick(shop.shopId, item.productId)}></div>
                                <img alt={item.title} src={item.imgUrl} className='shop-product-img' />
                                <div className='shop-product-content'>
                                    <div className='shop-product-title'>
                                        {item.title}
                                    </div>
                                    <div className='shop-product-kilo'>
                                        {item.weight}
                                    </div>
                                    <div className='shop-product-price'>
                                        <i className='pi pi-dollar'></i>
                                        {item.price}
                                    </div>
                                    <input 
                                    value={item.count} 
                                    className='shop-product-count'
                                    onChange={(e) => handleCountChange(shop.shopId, item.productId, e.target.value)}/>
                                </div>
                            </div>
                        </div>)
                    })}
                </div>)
            })}
        
            <div className='total-price'>
                <div className='select-all' onClick={handleAllSelected}>
                    <div className={productNotSelected ? 'radio' : 'radio radio-active'}></div>
                    <div 
                    className='select-all-text'>All</div>
                </div>
                <div className='total'>
                    <span className='total-text'>Subtotal:</span>
                    <div className='total-price-inner'>
                        <i className='pi pi-dollar'></i>
                        {totalPrice.toFixed(1)}
                    </div>
                </div>
                <div className='check' onClick={handleCartCheckout}>Checkout({count})</div>
            </div>
            <Docker activeName='Cart'/>
        </div>
    )
}

export default Cart;