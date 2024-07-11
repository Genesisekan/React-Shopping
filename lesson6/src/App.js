import Board from "./board";
import './style.css'
import History from "./history";
import { useState } from "react";

function pickWinner(state){
  const winningIndex = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
  ];
  for(let i = 0; i < winningIndex.length; i++){
      const [a, b, c] = winningIndex[i];
      if(state[a] && state[a] === state[b] && state[b] === state[c]){
          return state[a];
      }
  }
  const filterSquare = state.filter((value)=> value === 'X' || value === 'O');
  if(filterSquare.length === 9){
      return 'Nobody';
  }
  return null;
}

function App() {
  const [state, setState] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [winner, setWinner] = useState(undefined);

  if(!winner){
    const result = pickWinner(state);
    if(result){
      setWinner(result);
    }
  }

  const changeHandler = (newState) => {
    setState(newState);
    setHistory([...history, newState]);
  }

  const historyHandler = (index) => {
    const newState = history[index];
    setState(newState);
  }



  return (
    <div className="game">
      <div className="board-section"> 
        <Board state={state} setState={changeHandler} winner={winner} />
      </div>
      <div className="history-section">
        {winner ? <History history={history} onClick={historyHandler} /> : null}
      </div>
    </div>
  );
}

export default App;
