import './App.css';
import Login from "./Login";
import {useEffect, useState} from "react";
import TestConponent from "./TestConponent";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setToken} from "./store";
function App() {
  const [isLogin, setLogin]=useState(false);
  return (
    <>
      {!isLogin && <Login onLogin={() => setLogin(true)}></Login>}
      {isLogin && <TestConponent></TestConponent>}
    </>
  );
}

// function App() {
//   return (
//       <>
//       <Login></Login>
//       </>
//   );
// }

export default App;
