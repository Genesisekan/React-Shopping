import './style.scss'

function Model(props: {children: string}){
    const {children} = props;
    return(
        <div className="model">
            <div className="model-text">An error has occured: {children}</div>
        </div>
    )
}

export default Model; 