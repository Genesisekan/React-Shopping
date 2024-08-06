import { useNavigate } from 'react-router-dom';
import './style.scss'

const items = [{
    url: '/home',
    icon: 'pi pi-home',
    name: 'Home'
},{
    url: '/category',
    icon: 'pi pi-th-large',
    name: 'Categories'
},{
    url: '/cart',
    icon: 'pi pi-shopping-cart',
    name: 'Cart'
},{
    url: '/user',
    icon: 'pi pi-user',
    name: 'Me'
}]

interface DockerProps {
    activeName: string;
}

function Docker(props: DockerProps) {
    const { activeName } = props;
    const navigator = useNavigate();
    return(
        <div className='docker'>
            {
                items.map((items)=>(
                    <div 
                    key={items.url}
                    className={(activeName === items.name) ? 'docker-item docker-item-active' : 'docker-item' }
                    onClick={()=> navigator(items.url)}>
                        <i className= {`${items.icon} docker-item-icon`}></i>
                        <p className='docker-item-title'>{items.name}</p>
                    </div>
                ))
            }
        </div>
    
  )
}

export default Docker;