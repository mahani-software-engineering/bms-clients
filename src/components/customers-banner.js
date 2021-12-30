import React, { useState, useEffect } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import ErrorBox from "./error-box";
import loadingGif from "./images/ajax-loader.gif";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';
import ViewAction from "./view-action";

function CustomersBanner(props) {
    const [customersCount, setCustomersCount] = useState(152);
    const [loading, setLoading] = useState(true);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    
    function displayCustomers(){
        props.updateActiveDisplay(<ViewAction endpoint="/customer" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    useEffect(() => {
        axios({
            url: `/customers/count`,
            method: "get"
        }).then(function(response) {
            console.log("/customers/count: response.data=", response.data);
            setLoading(false);
            if (response.status === 200) {
                if (!isNaN(response.data.Data)){
                    setCustomersCount(response.data.Data);
                    setResponseStatus(response.status);
                }
            }else{
                setErrorFromBackend(response.data.Message);
                setResponseStatus(response.status);
            }
        },(er)=>{ console.log(er); });
    },[]);
    
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-3" onClick={displayCustomers}>
            {/*<!--Metric Card-->*/}
            <div className="bg-white border rounded shadow p-2">
                <div className="flex flex-row items-center">
                    <div className="flex-shrink pr-4">
                        <div className="rounded p-3 bg-pink-600"><FontAwesomeIcon icon={faNewspaper}/></div>
                    </div>
                    <div className="flex-1 text-center md:text-center">
                        <h5 className="font-bold uppercase text-gray-500">All customers</h5>
                        <h3 className="font-bold text-3xl"> 
                        {
                         loading? 
                          <span style={{textAlign:"center", paddingTop:"1px"}}>
                            <img src={loadingGif} width="20px"/> 
                          </span>
                          :responseStatus === 200?
                            customersCount 
                          :<small> {errorFromBackend} </small>
                        }
                        <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span>
                        </h3>
                    </div>
                </div>
            </div>
            {/*<!--/Metric Card-->*/}
        </div>
    );
  
}

export default CustomersBanner;













