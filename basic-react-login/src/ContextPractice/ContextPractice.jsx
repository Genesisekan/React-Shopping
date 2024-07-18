import Body from '../Body';
import Header from '../Header/Header'
import nameContext from '../nameContext';

function ContextPractice(){
    return(
        <div>
            <nameContext.Provider value='dell'>
                <Header />
                <Body />
            </nameContext.Provider>
        </div>
    )

}

export default ContextPractice;