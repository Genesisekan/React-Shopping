import { forwardRef, useImperativeHandle, useRef, useState, useEffect } from 'react';
import './style.scss'
import { createPortal } from 'react-dom';

export type ModelInterfaceType = {
    showMessage: (message: string) => void;
}

const Model = forwardRef<ModelInterfaceType>((props, ref) => {
    const [showModel, setShowModel] = useState(false);
    const [message, setMessage] = useState('');

    const divRef = useRef(document.createElement('div'));

    
    useImperativeHandle(ref, ()=>{
        return{
            showMessage(msg: string) {
                setShowModel(true);
                setMessage(msg);
                setTimeout(() => {
                    setShowModel(false);
                }, 1500);
            }
        } 
    }, []);

    useEffect(() => {
        const divContainer = divRef.current;
        if(showModel){
            document.body.appendChild(divContainer);
        }else if (divContainer.parentNode) {
            document.body.removeChild(divContainer);
        }

        return () => {
            if(divContainer.parentNode){
                document.body.removeChild(divContainer);
            }
        };
    }, [showModel]);


    return (showModel) ? createPortal(
        <div className="model">
            <div className="model-text">{message}</div>
        </div>
    , divRef.current) : null;
}

);  

export default Model; 