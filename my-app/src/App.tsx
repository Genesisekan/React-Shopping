import 'primeicons/primeicons.css';
import './styles/base.css'
import './styles/border.css'
import { createHashRouter, RouterProvider } from 'react-router-dom';

import Guide from './container/Guide';
import Login from './container/Account/Login';
import Register from './container/Account/Register';
import Account from './container/Account';
import Home from './container/Home';
import Nearby from './container/Nearby';
import Search from './container/Search';

const router = createHashRouter([
  {
    path: "/",
    element: <Guide />,
  },
  {
    path: "account",
    element: <Account />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />
      }
    ]
  },{
    path: "home",
    element: <Home />
  },{
    path: "nearby",
    element: <Nearby />
  },{
    path: "search",
    element: <Search />
  }
]);


const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;