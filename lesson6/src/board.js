import Square from "./Square";
import { useState } from "react";

function Board(){
    const [state, setState] = useState(Array(9).fill(null));
    const onClick = (index) => {
        if(!state[index]){
            const filterSquare = state.filter((value)=> value === 'X' || value === 'O');
            const filterNumb = filterSquare.length;
            const letterFill = (filterNumb % 2 === 0) ? 'X' : 'O';
            const newState = state.slice();
            newState[index] = letterFill;
            setState(newState);
        }
    }
    return (
        <>
        <div className='board-row'></div>
            <Square value={state[0]} index={0} onClick={onClick} />
            <Square value={state[1]} index={1} onClick={onClick} />
            <Square value={state[2]} index={2} onClick={onClick} />
        <div className='board-row'></div>
            <Square value={state[3]} index={3} onClick={onClick} />
            <Square value={state[4]} index={4} onClick={onClick} />
            <Square value={state[5]} index={5} onClick={onClick} />
        <div className='board-row'></div>
            <Square value={state[6]} index={6} onClick={onClick} />
            <Square value={state[7]} index={7} onClick={onClick} />
            <Square value={state[8]} index={8} onClick={onClick} />
        </>
    )
}

export default Board;