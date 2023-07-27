// import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import UserContext from './context';
// // ****--component--****
// import CreateAccount from './components/CreateAccount'
// import Login from './components/Login';
// import Home from './components/Home';
// import Deposit from './components/Deposit';
// import Withdraw from './components/Withdraw';
// import NavBar from './components/NavBar';
// import Transaction from './components/Transaction'
// // ****--styles--****
// import './styles/signup.css'
// import './styles/deposit.css'
// import './styles/withdraw.css'
// import './styles/navBar.css'
// import './styles/login.css'
// // import './styles/home.css'
// import './styles/cards.css'
// import './styles/transaction.css'


// function App() {
//   const [userData, setUserData] = useState(null);

//   return (
//     <BrowserRouter>
//       <UserContext.Provider value={{ userData, setUserData }}>
//         <NavBar />
//         <Routes>
//           <Route path='/createaccount' element={<CreateAccount />} />
//           <Route path='/login' element={<Login />}></Route>
//           <Route path='/deposit' element={<Deposit />}></Route>
//           <Route path='/withdraw' element={<Withdraw />}></Route>
//           <Route path='/transaction' element={<Transaction />}></Route>
//           <Route path='/home' element={<Home email={userData ? userData.email : ''} />}></Route>
//         </Routes>
//       </UserContext.Provider>
//     </BrowserRouter>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext  from './context';
// import { } from './UserProvider';

// ****--component--****
import CreateAccount from './components/CreateAccount'
import Login from './components/Login';
import Home from './components/Home';
import Deposit from './components/Deposit';
import Withdraw from './components/Withdraw';
import NavBar from './components/NavBar';
import Transaction from './components/Transaction'
// ****--styles--****
import './styles/signup.css'
import './styles/deposit.css'
import './styles/withdraw.css'
import './styles/navBar.css'
import './styles/login.css'
// import './styles/home.css'
import './styles/cards.css'
import './styles/transaction.css'


function App() {
  const [userData, setUserData] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <NavBar />
          <Routes>
            <Route path='/createaccount' element={<CreateAccount />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/deposit' element={<Deposit />}></Route>
            <Route path='/withdraw' element={<Withdraw />}></Route>
            <Route path='/transaction' element={<Transaction />}></Route>
            <Route path='/home' element={<Home email={userData ? userData.email : ''} />}></Route>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;