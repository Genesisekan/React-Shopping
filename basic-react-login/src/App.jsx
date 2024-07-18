import { useReducer} from "react";

function reducer(state, action){
  const newState = { ...state} ;
  switch (action.type) {
    case 'changeInput':
      newState.inputValue = action.value;
      return newState;
    case 'add':
      newState.list = [...newState.list, {
        id: newState.inputValue,
        value: newState.inputValue
      }];
      newState.inputValue = '';
      return newState;
    case 'delete':
      newState.list = [...newState.list]
      newState.list.splice(action.value, 1);
      return newState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    inputValue: '',
    list: []
  });

  function clickHandler() {
    const action = {type: 'add'};
    dispatch(action);
  }

  function changeHandler(e){
    const action = {type: 'changeInput', value: e.target.value};
    dispatch(action);
  }

  function deleteItemHandler(index){
    const action = {
      type: 'delete',
      value: index
    }
    dispatch(action);
  }

  return (
    <div>
      <div><input value={state.inputValue} onChange={changeHandler}/><button onClick={clickHandler}>Submit</button></div>
      <ur>
        {state.list.map((value,index) => {
          return <li key={value.id} onClick={() => deleteItemHandler(index)}>{value.value}</li>
        })}
      </ur>
    </div>
  );
}

export default App;
