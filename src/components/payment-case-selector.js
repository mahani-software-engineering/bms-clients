import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./globals";
import loadingGif from "./images/ajax-loader.gif";

import Form   from  './form';
import ErrorBox from "./error-box";


function PaymentCaseSelector(props) {
    const [loading, setLoading] = useState(true);
    const [existanceChecked, setExistanceChecked] = useState(false);
    const [customerExists, setCustomerExists] = useState(false);
    const [customerName, setCustomerName] = useState("Unregistered");
    const [customerID, setCustomerID] = useState(0);
    
    const [customerDetailsWillBeProvided, setCustomerDetailsWillBeProvided] = useState(false);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    
    const phoneInputRef = useRef(<></>);
    const customerDetailsRef = useRef(<></>);
    const payingForOrderRef = useRef(<></>);
    const payingForInvoiceRef = useRef(<></>);
    const payingForBillRef = useRef(<></>);
    const payingForNoneRef = useRef(<></>);
    const newItemRef = useRef(<></>);
    const existingItemRef = useRef(<></>);
    
    const checkCustomerExistance = () => {
        let phoneOrEmail = phoneInputRef.current.value;
        axios({
            url: `/user/${phoneOrEmail}`,
            method: "get"
        }).then(function(response) {
            console.log("response.data=", response.data);
            setLoading(false);
            setExistanceChecked(true);
            if (response.status === 200) {
                if (response.data.Data){
                    let cname = response.data.Data.firstname+" "+response.data.Data.lastname;
                    let cid = response.data.Data.ID;
                    setCustomerExists(true);
                    setCustomerName(cname);
                    setCustomerID(cid);
                }
                setResponseStatus(response.status);
            }else{
                setErrorFromBackend(response.data.Message);
                setResponseStatus(response.status);
            }
        },(er) => {
            console.log("er-response = ", JSON.stringify(er));
            console.log(er);
        });
    };
    
    function doIdentifyFormCase(){
        let customerDetailsGiven = customerDetailsRef.current.checked;
        let payingForOrder = payingForOrderRef.current.checked;
        let payingForInvoice = payingForInvoiceRef.current.checked;
        let payingForBill = payingForBillRef.current.checked;
        let payingForNone = payingForNoneRef.current.checked;
        let payingFor = payingForOrder ? "order" : payingForInvoice? "invoice" : payingForBill? "bill" : payingForNone? "none" : "no choice";          
        let newItem = newItemRef.current.checked;
        let itemExists = existingItemRef.current.checked;
        let identifiedCase = "0";
        if(customerExists){
            if(newItem){
                switch (payingFor) {
                  case "order":
                    identifiedCase = "21";
                    break; 
                  case "invoice":
                    identifiedCase = "22";
                    break; 
                  case "bill":
                    identifiedCase = "23";
                    break; 
                  default: 
                    //user did not choose option
                    alert("Please choose an option (Order, Invoice, Bill)");
                }
            }else if(itemExists){
                switch (payingFor) {
                  case "order":
                    identifiedCase = "17";
                    break; 
                  case "invoice":
                    identifiedCase = "18";
                    break; 
                  case "bill":
                    identifiedCase = "19";
                    break;
                  default: 
                    //user did not choose option
                    alert("Please choose an option (Order, Invoice, Bill)");
                }
            } else {
                alert("Please choose an option (New or Exists)");
            }
        } else { //customer does not exist
            if (customerDetailsGiven){
                if(newItem){ //order in the request
                    switch (payingFor) {
                      case "order":
                        identifiedCase = "13";
                        break; 
                      case "invoice":
                        identifiedCase = "14";
                        break; 
                      case "bill":
                        identifiedCase = "15";
                        break;
                      default: 
                        //user did not choose option
                        alert("Please choose an option (Order, Invoice, Bill)");
                    }
                }else if(itemExists){
                    switch (payingFor) {
                      case "order":
                        identifiedCase = "9";
                        break; 
                      case "invoice":
                        identifiedCase = "10";
                        break; 
                      case "bill":
                        identifiedCase = "11";
                        break;
                      default: 
                        //user did not choose option
                        alert("Please choose an option (Order, Invoice, Bill)");
                    }
                }else{
                    if(payingForNone){
                        identifiedCase = "8";
                    }else{
                        alert("Please choose an option: (New or Exists), or None");
                    }
                }
            }else{
                switch (payingFor) {
                  case "order":
                    identifiedCase = "5";
                    break; 
                  case "invoice":
                    identifiedCase = "6";
                    break; 
                  case "bill":
                    identifiedCase = "7";
                    break; 
                  case "none": 
                    //unexpected case! "May be user is just donating to the company, or saving with us"
                    //present form case that asks for reason of paying (ie a "reason" field)
                    identifiedCase = "1";
                    break;
                  default: 
                    //user did not choose option
                    alert("Please choose an option (Order, Invoice, Bill, None)");
                }
            }
        }
        //Now set the global "activeDisplay" to load the appropriate form case on the display
        if(identifiedCase !== "0"){
            if(customerID > 0){
                props.updateActiveDisplay(<Form endpoint="createPayment" epcase={identifiedCase} updateActiveDisplay={props.updateActiveDisplay} customerid={customerID}/>);
            }else{
                props.updateActiveDisplay(<Form endpoint="createPayment" epcase={identifiedCase} updateActiveDisplay={props.updateActiveDisplay}/>);
            }
        }else{
            alert("Please choose options.");
        }
    }
    
    return (
        <div className="flex flex-row flex-wrap flex-grow mt-2">
            
            <div className="w-full p-3">
                   <div className="flex justify-center"> CUSTOMER REGISTERED? CHECK FIRST </div>
                <div className="bg-white rounded shadow">
                    {/* phone number input */}
                    
                    <div className="flex items-center max-w-md mx-auto bg-white rounded-full " x-data="{ search: '' }">
                        <div className="w-full" style={{padding:"8px", border:"2px solid lightgray", borderRadius:"8px 0 0 8px"}}>
                            <input type="search" ref={phoneInputRef} className="w-full px-4 py-1 text-gray-900 rounded-full focus:outline-none" placeholder="phone or email" x-model="search"/>
                        </div>
                        <div style={{border:"2px solid lightgray", borderRadius:"0 8px 8px 0", padding:"0 8px 0 8px", background:"lightgray"}}> {/* check existance button */}
                            <button type="submit" className="flex items-center justify-center w-12 h-12 text-gray-100 rounded-full bg-purple-500" style={{Background:"purple"}} onClick={checkCustomerExistance}>
                                Check
                            </button>
                        </div>
                     </div>
                     <div className="flex items-start items-center mb-4">
                       {existanceChecked?
                          <>
                           {(responseStatus === 200)? customerName : errorFromBackend }
                          </>
                         :<small> not yet checked </small> 
                       }
                    </div>
                    {/* Customer details provided */}
                    <div className="flex items-center mb-4">
                        <input ref={customerDetailsRef} id="checkbox-2" aria-describedby="checkbox-2" type="checkbox" className="bg-gray-50 border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded" onClick={setCustomerDetailsWillBeProvided.bind(this,!customerDetailsWillBeProvided)}/>
                        <label htmlFor="checkbox-2" className="text-sm ml-3 font-medium text-gray-900"> Customer details provided (registered customers will be remebered by this system forever) </label>
                    </div>
                    {/* Paying for */}
                    <div className="flex justify-center">
                          <h5 ><b>Paying for :</b></h5>
                          <div className="form-check form-check-inline" style={{margin:"0 5px 0 5px", border:"2px solid lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                            <input ref={payingForOrderRef} className="" type="radio" name="paymentItem" id="case1" value="order"/>
                            <label className="form-check-label inline-block text-gray-800" htmlFor="case1"> Order</label>
                          </div>
                          <div className="form-check form-check-inline" style={{margin:"0 5px 0 5px", border:"2px solid lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                            <input ref={payingForInvoiceRef} className="" type="radio" name="paymentItem" id="case2" value="invoice"/>
                            <label className="form-check-label inline-block text-gray-800" htmlFor="case2"> Invoice</label>
                          </div>
                          <div className="form-check form-check-inline" style={{margin:"0 5px 0 5px", border:"2px solid lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                            <input ref={payingForBillRef} className="" type="radio" name="paymentItem" id="case3" value="bill"/>
                            <label className="form-check-label inline-block text-gray-800" htmlFor="case3"> Bill</label>
                          </div>
                          {(!customerExists)?
                          <div className="form-check form-check-inline" style={{margin:"0 5px 0 5px", border:"2px solid lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                            <input ref={payingForNoneRef} className="" type="radio" name="paymentItem" id="case4" value="none" disabled />
                            <label className="form-check-label inline-block text-gray-800 opacity-50" htmlFor="case4"> None </label>
                          </div> 
                          :<div className="form-check form-check-inline" style={{margin:"0 5px 0 5px", border:"2px solid lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                            <input ref={payingForNoneRef} className="" type="radio" name="paymentItem" id="case4" value="none"/>
                            <label className="form-check-label inline-block text-gray-800 opacity-100" htmlFor="case4"> None </label>
                          </div>
                          }
                     </div> 
                     
                      <hr style={{border:"1px solid lightgray"}}/> <br/>
                      {/* New / Exists */}
                      <div className="flex justify-center">
                          <button style={{background:"lightgray", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", borderRadius:"6px"}}>
                              <div className="form-check form-check-inline">
                                <input ref={newItemRef} className="" type="radio" name="newExists" id="case01" value="new"/>
                                <label className="form-check-label inline-block text-gray-800" htmlFor="case01">New</label>
                              </div>
                          </button>
                          <button style={{background:"linen", margin:"0 5Px 3px 5px", padding:"2px 5px 2px 4px", border:"2px solid lightgray", borderRadius:"6px"}}>
                              <div className="form-check form-check-inline">
                                <input ref={existingItemRef} className="" type="radio" name="newExists" id="case02" value="exists"/>
                                <label className="form-check-label inline-block text-gray-800" htmlFor="case02">Exists</label>
                              </div>
                          </button>
                      </div>
                    {/* "Next" button */}
                    <hr style={{border:"1px solid lightgray"}}/> <br/>
                    <button style={{background:"blue", color:"white", width:"40%", margin:"0 5Px 3px 5px", padding:"2px 10px 2px 10px", borderRadius:"6px"}} onClick={doIdentifyFormCase}>
                      <center>NEXT</center>
                    </button>
                </div>
            </div>

        </div>
    );
  
}

export default PaymentCaseSelector;













