import React, { useState, useEffect } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import ErrorBox from "./error-box";
import loadingGif from "./images/ajax-loader.gif";
import ActionsBtn from "./actions-btn";
import PaymentCaseSelector from "./payment-case-selector";
import DashboardDisplay from './dashboard-display';
import Form from "./form";


function ViewAction(props) {
    const [dataFromBackend, setDataFromBackend] = useState([]);
    const [singleObjectDataFromBackend, setSingleObjectDataFromBackend] = useState([]);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    const [loading, setLoading] = useState(true);
    const [columNames, setColumNames] = useState(["colx1","colx2"]);
    const [recordsCount, setRecordsCount] = useState(0);
    const columnsBlacklistedFromDisplay = {
        payment:["updatedat","deletedat","itemid","instalment"],
        expense:["updatedat","deletedat"],
        sales:[],
        product:["updatedat","deletedat"],
        service:["updatedat","deletedat"],
        package:["updatedat","deletedat"],
        visit:["updatedat","deletedat"],
        order:["updatedat","deletedat"],
        booking:["updatedat","deletedat"],
        invoice:["updatedat","deletedat"],
        bill:["updatedat","deletedat"],
        stock:["updatedat","deletedat"],
        activity:["updatedat","deletedat"],
        message:["updatedat","deletedat"],
        notification:["updatedat","deletedat"],
        user:["updatedat","deletedat"],
        customer:["updatedat","deletedat"],
        guest:["updatedat","deletedat"]
    };
    
    useEffect(() => {
        let backend = `${props.endpoint}${props.itemid?"/"+props.itemid:""}`;
        console.log("view-action backend = ", backend);
        axios({
            url: backend,
            method: "get"
        }).then(function(response) {
            setLoading(false);
            if (response.status === 200) {
                if (response.data.Data){
                    if(Array.isArray(response.data.Data)){
                        let rowsCount = response.data.Data.length;
                        setRecordsCount(rowsCount);
                        console.log("rowsCount=", rowsCount);
                        if(rowsCount > 0){
                            let colsKey = props.endpoint.split("/")[1];
                            let blacklistedColms = columnsBlacklistedFromDisplay[colsKey];
                            let allData = response.data.Data;
                            let dataSingleRow = response.data.Data[0];
                            let colnames = Object.keys(dataSingleRow).filter(ky=>((typeof dataSingleRow[ky]) !== "object" && blacklistedColms && (!blacklistedColms.includes(ky.toLowerCase())) ));
                            setColumNames(colnames);
                            //return array of arrays of key-value pairs with exactly desired data 
                            let desiredData = allData.map(rowdata => colnames.map(k => ({key:k, value: rowdata[k]}) ));
                            setDataFromBackend(desiredData);
                        }else if(rowsCount <= 0){
                            setColumNames([]);
                        }
                    }else if((typeof response.data.Data === 'object') && (!Array.isArray(response.data.Data)) && (response.data.Data !== null)) {
                        let dataSingleObject = response.data.Data;
                        let colnames = Object.keys(dataSingleObject).filter(ky=>((typeof dataSingleObject[ky]) !== "object"));
                        setColumNames(colnames);
                        let desiredData = colnames.map(k => ({key:k, value: dataSingleObject[k]}) );
                        setSingleObjectDataFromBackend(desiredData);
                        console.log("desiredData = ", JSON.stringify(desiredData));
                    }
                }
                setResponseStatus(response.status);
            }else{
                setErrorFromBackend(response.data.Message);
                setResponseStatus(response.status);
            }
        },(er)=>{ console.log(er); });
    },[props.endpoint, props.itemid]);
    
    function loadAddForm () {
        //identify the entity to be added
        if(props.endpoint.includes("payment") || props.endpoint.includes("Payment")){
          props.updateActiveDisplay(<PaymentCaseSelector endpoint="createPayment" epcase={props.epcase} vwcase={props.vwcase} updateActiveDisplay={props.updateActiveDisplay}/>);
        }else{
          props.updateActiveDisplay(<Form endpoint={props.endpoint} epcase={props.epcase?props.epcase:"create"} vwcase={props.vwcase} updateActiveDisplay={props.updateActiveDisplay}/>);
        }
    }
    
    function goHome(){
        props.updateActiveDisplay(<DashboardDisplay updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    return (
        <>
        <div style={{background:"linen", paddingLeft: "1%"}}> 
            {props.endpoint.replace("/","").toUpperCase()} 
            {(props.epcase && (typeof props.epcase === "string") && props.epcase!=="")?": "+props.epcase : null} 
        </div>
        
        {loading? <div style={{textAlign:"center", paddingTop:"40px"}}>
            <img src={loadingGif} width="10%"/> 
          </div>
        :props.vwcase === "list" ? 
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                        {columNames.map((colname, index) => <th key={index} className="p-2 whitespace-nowrap">
                            <div className="font-semibold text-left">{colname}</div>
                        </th>)}
                        <th className="p-2 whitespace-nowrap">
                            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" style={{float:"right"}} onClick={loadAddForm}>
                              New +
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {/*generating rows*/ 
                     dataFromBackend.map((rowval, rowIndex) => <tr key={rowIndex}>
                        {/*generating columns*/ 
                            rowval.map((pair, index) => (<>
                            {((pair.key==="profilepic") && (pair.value !== "")) ?
                            <td key={index} className="p-2 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                                        <img className="rounded-full" src={pair.value} width="40" height="40"/>
                                    </div>
                                    {/*<div className="font-medium text-gray-800">Alex Shatov</div>*/}
                                </div>
                            </td>
                            :(pair.key==="amount" || pair.key==="Amount") ?
                              <td key={index} className="p-2 whitespace-nowrap">
                                <div className="text-left font-medium text-green-500"> {pair.value} </div>
                              </td>
                            :<td key={index} className="p-2 whitespace-nowrap">
                                <div className="text-left"> {pair.value} </div>
                              </td>
                            } 
                          </>)
                        )} {/* end generating columns */}
                        <td className="p-2 whitespace-nowrap" style={{textAlign:"right"}}>
                            <div className="text-lg text-center"> 
                               <ActionsBtn endpoint={props.endpoint} itemid={rowval[0].value} epcase={props.epcase} vwcase="single" updateActiveDisplay={props.updateActiveDisplay}/>                 
                            </div>
                        </td>
                     </tr>
                   )
                  } {/* end generating rows */}
                </tbody>
            </table>
         </div>
         
        :props.vwcase === "single" ?
        
         <div className="overflow-x-auto">
            <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                        <th colSpan="2" className="p-2 whitespace-nowrap">
                            <div className="border-b p-3 flex items-center justify-between" style={{paddingRight: "0", width:"100%"}}>
                                <button onClick={goHome} className="inline-flex items-center px-6 py-2 text-sm text-gray-800 rounded-lg shadow outline-none gap-x-1 hover:bg-gray-100" style={{background:"linen"}}>       
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"> 
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                                  </svg> 
                                  Back
                                </button>
                                <ActionsBtn endpoint={props.endpoint} epcase={props.epcase} vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                    {
                       singleObjectDataFromBackend.map((pair, index) =>
                       <tr key={index}>
                         <td className="p-2 whitespace-nowrap">
                             <div style={{fontWidth:"14px"}}> <b> {pair.key} </b> </div>
                         </td>
                         <td className="p-2 whitespace-nowrap">
                             <div style={{fontWidth:"14px"}}> {pair.value} </div>
                         </td>
                       </tr>
                       )
                     }
                </tbody>
            </table>
         </div>
         
        :null}
        
    </>);
}

export default ViewAction;













