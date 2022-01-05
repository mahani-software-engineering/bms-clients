import React, { useState, useRef } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import DashboardDisplay from './dashboard-display';

const Login = (props) => {
    const emailRef = useRef(<></>);
    const passwordRef = useRef(<></>);
    const [errorFromServer, setErrorFromServer] = useState("Login failed");
    const [responseStatus, setResponseStatus] = useState(200);
    
    function goHome(data){
        props.updateActiveDisplay(<DashboardDisplay currentUser={data} updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        let username    = emailRef.current.value;
        let password = passwordRef.current.value;

        axios({
            url: `/user/login`,
            method: 'post',
            data: {username, pxwd: password}
        }).then(function(response) {
            console.log("Login : response.data.Data=",response.data.Data);
            setResponseStatus(response.status);
            props.setUserId(response.data.Data.ID);
            localStorage.setItem("currentUserId", response.data.Data.ID);
            localStorage.setItem("userAccessRights", response.data.Data.accessRights);
            goHome(response.data.Data);
         }, (error) => {
            console.log("response = ", JSON.stringify(error));
            alert("Access denied");
         });
    };
    
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-2 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account 
                </h1>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='username'>Email or Phone</label>
                        <input ref={emailRef}
                            type="text"
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='username'
                            placeholder='Your Email or Phone'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input ref={passwordRef}
                            type='password'
                            className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-green py-2 px-4 text-sm text-white rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;


/*TODO:
Method 1:
----------
When the user first logs in successfully create a 'sessionStorage' instance to indicate that there is an active session:

window.sessionStorage.setItem(sessionKey, stringifiedUserToken);
If the page gets refreshed then check for this session item and re-register the active session:

const activeSession = window.sessionStorage.getItem(sessionKey);
if (activeSession) {
  // fire register user session action
}
If the user logs out then kill the session storage token.

All the server interaction still requires the cookie which will be passed along, so this is purely a front-end concern.

Session storage will clear at the end of the browser session, so this naive approach may not work for "permanent" sessions. 
It does have great browser support though: http://caniuse.com/#search=sessionStorage

Method 2:
---------
Session storage is a "native" feature of browsers. You simply access it via the window. attachment. :) 
Yep, local storage and session storage to my knowledge essentially work the same way, 
except that session storage is flushed between browser sessions. I had to go for session storage as there was 
no way for me to know if a user session stored in local session is actually still active if the user closed and 
reopened their browser. This is because I couldn't access cookies to verify. 
With my session storage I had login/logout hooks so I felt safe there

*/









