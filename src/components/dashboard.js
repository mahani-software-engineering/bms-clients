import React, { useRef, useState, useEffect } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";

import logo from './images/cropped-victoria-forest-logo.png';

import Header from './header';
import Form   from  './form';
import Login   from  './login';
import Display   from  './display';
import DashboardDisplay from './dashboard-display';
import Footer from './footer';

const Dashboard = () => {
    const [activeDisplay, setActiveDisplay] = useState(<></>);
    
    useEffect(() => {
        //setActiveDisplay(<DashboardDisplay updateActiveDisplay={setActiveDisplay}/>);
        setActiveDisplay(<Login updateActiveDisplay={setActiveDisplay}/>);
    },[]);
    
    return (
     <>
        <Header updateActiveDisplay={setActiveDisplay}/>

        <div className="container w-full mx-auto pt-20">
          <Display updateActiveDisplay={setActiveDisplay}>
             {activeDisplay}
          </Display>
        </div>

        <Footer/>
     </>
    );
};

export default Dashboard;
