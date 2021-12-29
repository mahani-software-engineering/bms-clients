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
            if(response.status === 200){
                setResponseStatus(response.status);
                goHome(response.data.Data);
            }else{
                setErrorFromServer(response.data.Message);
                setResponseStatus(response.status);
                alert(response.data.Message);
            }
         }, (error) => {
            console.log(error);
            setErrorFromServer("Server error");
            alert("Server error");
         });
    };
    
    return (
        <div className='h-screen flex bg-gray-bg1'>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
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
