import React, { useState } from "react";
import './App.css';
//import { Switch, Route } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';


function App() {

  const [userID, setUserID] = useState("1");
  const [userCountry, setUserCountry] = useState("Uganda");
  const [userLatitude, setUserLatitude] = useState("34.930001");
  const [userLongitude, setUserLongitude] = useState("2.00121");
    
  //window.location.reload(false);
  
  return (
    //<Switch>
     // <Route path="/">
        <Dashboard />
      //</Route>
   // </Switch>
  );
}

export default App;
