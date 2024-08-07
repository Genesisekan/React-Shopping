import { ReactNode } from 'react';
import './style.scss';

interface PopoverProps {
    show: boolean;
    blankClickCallBack: () => void
    children: ReactNode
}

function Popover(props: PopoverProps) {

    const { show, blankClickCallBack, children } = props;
    return  show ? (
    <div className="popover" >
          <div className='popover-mask' onClick={blankClickCallBack}></div>
          <div className='popover-content'>
            {children}
          </div>
    </div>) : null;
}

export default Popover;