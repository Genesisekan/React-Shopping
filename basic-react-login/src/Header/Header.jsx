import nameContext from "../nameContext";
import { useContext } from "react";

function Header(){
    const name = useContext(nameContext);

    return(
        <div style={{borderBottom: '1px solid black'}}>
            Header: {name}
        </div>
    )
}

export default Header;