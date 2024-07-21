import 'primeicons/primeicons.css';
import './styles/base.css'
import './styles/border.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Guide from './container/Guide';
import Login from './container/Login';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Guide />} />
        <Route path='/login' element={<Login />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;