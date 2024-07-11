import Square from "./Square";


function getNextLetter(state){
    const filterSquare = state.filter((value)=> value === 'X' || value === 'O');
    const filterNumb = filterSquare.length;
    const letterFill = (filterNumb % 2 === 0) ? 'X' : 'O';
    return letterFill;
}

function Board({state, setState, winner}){
    const letterFill = getNextLetter(state);
    let status = letterFill;

    status = (winner) ? `${winner} is the winner!` : `${status} goes next`;

    const onClick = (index) => {
        if(!state[index] && !winner){
            const newState = state.slice();
            newState[index] = letterFill;
            setState(newState);
        }
    }
    return (
        <>
        <div className="status">
            {status}
        </div>
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