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
    const [userId, setUserId] = useState("");
    const [userSignedIn, setUserSignedIn] = useState(false);
    
    useEffect(() => {
        //setActiveDisplay(<DashboardDisplay updateActiveDisplay={setActiveDisplay}/>);
        if(userId === ""){
            let currentUserId = localStorage.getItem('currentUserId');
            setUserId(currentUserId);
            let userAccessRights = localStorage.getItem('userAccessRights');
            console.log("Dashboord: currentUserId=",currentUserId);
            console.log("Dashboord: userAccessRights=",userAccessRights);
            if(currentUserId === "" || currentUserId === null || (!currentUserId) || userAccessRights===null){
               setActiveDisplay(<Login updateActiveDisplay={setActiveDisplay} setUserId={setUserId}/>);
            }else{
               setUserSignedIn(true);
               setActiveDisplay(<DashboardDisplay updateActiveDisplay={setActiveDisplay}/>);
            }
        }else{
            setUserSignedIn(true);
        }
    },[userId]);
    
    return (
     <>
        {userSignedIn &&
        <Header updateActiveDisplay={setActiveDisplay} currentUserId={userId} /> 
        }
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



