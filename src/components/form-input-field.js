import React, { useState, useEffect, useRef } from "react";
import loadingGif from "./images/ajax-loader.gif";
import axios from "axios";

function FormInputField(props) {
    const inputFieldRef = useRef(<></>);
    const inputFieldValue = useRef("");
    const [selectOptions, setSelectOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    //--------------------
    const [selectedItemType, setSelectedItemType] = useState("");
    //--------------------
    
    function setInputFieldValue(ev){
        let val = ev.target.value;
        inputFieldValue.current = val;
    }
    
    function handleChangeOfSelectedItemType(ev){
        let val = ev.target.value;
        setSelectedItemType(val);
        props.setItemsFilter(val);
        setInputFieldValue(ev);
    }
    
    function reader (){
        console.log("reader() called.");
        let val = inputFieldRef.current.value;
        //try to get the value from inputFieldValue
        if(val === ""){
            //try to access and read the field yourself
            val = val = inputFieldValue.current; 
            
            //if still the value is empty, throw an alert at the user to fill all fields
            if (val==="" || val===null){
                alert("please fill every field. All input fields are required");
                return;
            }
        }
        
        //sanitize val appropriately
        val = val && ((typeof val)==="string")? val.trim() : val;
        val = ((props.type === "number") || (props.type.endsWith("id")))? Number(val) : val;
        val = (val==="Yes")? true : (val==="No")? false: val;
        //end sanitizing
        
        let pathLevels = [];

        if(props.nestingPath==="root"){
            pathLevels = ["root"];
        }else if(props.nestingPath.includes("_")){
            pathLevels = props.nestingPath.split("_");
            //if this input field has "props.instanceId" defined, then 
            //its last part of the props.nestingPath must be the instance index.
            //update if the two don't match.
            if(props.instanceId){
                let lastPartOfNestingPath = pathLevels[ pathLevels.length-1 ];
                if(!isNaN(lastPartOfNestingPath)){
                  pathLevels[ pathLevels.length-1 ] = (Number(lastPartOfNestingPath)!==props.instanceId) ? `${props.instanceId}` : lastPartOfNestingPath; 
                }
            }
        }else{
            console.log("Invalid nestingPath '"+props.nestingPath+"' of the input field");
            alert("Oops! your app failed to read some input data. Please contact the software engineer on +256781224508.");
            return;
        }
        
        //===========define a function for inserting into the requestData==========
        let requestData = props.requestData.current;
        
        function insertDataIntoRequestBody( ancesterKeyIndex ){
            //confirm wheteher requestData is defined
            if ( !requestData ) {
                console.log("<< requestData >> is required by user input readers, but it's not defined.");
                alert("Oops! your app can't read any input data. Please contact the software engineer on +256781224508.");
                return;
            }
            
            var ancesterKey          = pathLevels[ancesterKeyIndex];
            var parentKeyIndex       = pathLevels.length-1;
            var parentKey            = pathLevels[parentKeyIndex];
            var ancesterKeyIsNumber  = isNaN(ancesterKey) === false;
            
            let ancesterExists = false;
            
            if(ancesterKeyIndex <= 0){
                //we are at the root!
                ancesterExists = true;
            }else{
                //checking for existance of ancester in the requestData
                switch (ancesterKeyIndex) {
                    case 1: 
                        let k1 = ancesterKey;
                        if(requestData[k1]){ ancesterExists = true; }
                        break;
                    case 2: 
                        let ky1 = pathLevels[1];
                        let ky2 = ancesterKey;
                        if(requestData[ky1] && requestData[ky1][ky2]){ ancesterExists = true; }
                        break;
                    case 3: 
                        let key1 = pathLevels[1];
                        let key2 = pathLevels[2];
                        let key3 = ancesterKey;
                        if(requestData[key1] && requestData[key1][key2] && requestData[key1][key2][key3]){ ancesterExists = true; }
                        break;
                    case 4: 
                        let keyy1 = pathLevels[1];
                        let keyy2 = pathLevels[2];
                        let keyy3 = pathLevels[3];
                        let keyy4 = ancesterKey;
                        if(requestData[keyy1] && requestData[keyy1][keyy2] && requestData[keyy1][keyy2][keyy3] && requestData[keyy1][keyy2][keyy3][keyy4]){ ancesterExists = true; }
                        break;
                    case 5: 
                        let keeyy1 = pathLevels[1];
                        let keeyy2 = pathLevels[2];
                        let keeyy3 = pathLevels[3];
                        let keeyy4 = pathLevels[4];
                        let keeyy5 = ancesterKey;
                        if(requestData[keeyy1] && requestData[keeyy1][keeyy2] && requestData[keeyy1][keeyy2][keeyy3] && requestData[keeyy1][keeyy2][keeyy3][keeyy4] && requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5]){ ancesterExists = true; }
                        break;
                    default:
                        console.log("The form input fields are too deeply nested. MAX=4Levels, got:", ancesterKeyIndex);
                        alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                        return;
                }
            }
            
            if( !ancesterExists ){
                console.log("ancesterExists is false, ancesterKeyIndex-1= ", ancesterKeyIndex-1);
                insertDataIntoRequestBody(ancesterKeyIndex - 1);
            }
            console.log("after recursion ancesterExists: ancesterKeyIndex =", ancesterKeyIndex);
            let fieldname = props.name;
            
            var ancesterIsParrent = ancesterKeyIndex === parentKeyIndex;
            console.log("ancesterIsParrent = ", ancesterIsParrent);
            if( ancesterIsParrent ){
                //key in the key-value pair in question (key=fieldname=props.name, value=val),
                //where  val  is the value read from the user input field
                switch (ancesterKeyIndex) {
                    case 0:
                        requestData[fieldname] = val;
                        break;
                    case 1: 
                        let k1 = ancesterKey;
                        requestData[k1][fieldname] = val;
                        break;
                    case 2: 
                        let ky1 = pathLevels[1];
                        let ky2 = ancesterKey;
                        requestData[ky1][ky2][fieldname] = val;
                        break;
                    case 3: 
                        let key1 = pathLevels[1];
                        let key2 = pathLevels[2];
                        let key3 = ancesterKey;
                        requestData[key1][key2][key3][fieldname] = val;
                        break;
                    case 4: 
                        let keyy1 = pathLevels[1];
                        let keyy2 = pathLevels[2];
                        let keyy3 = pathLevels[3];
                        let keyy4 = ancesterKey;
                        requestData[keyy1][keyy2][keyy3][keyy4][fieldname] = val;
                        break;
                    case 5: 
                        let keeyy1 = pathLevels[1];
                        let keeyy2 = pathLevels[2];
                        let keeyy3 = pathLevels[3];
                        let keeyy4 = pathLevels[4];
                        let keeyy5 = ancesterKey;
                        requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5][fieldname] = val;
                        break;
                    default:
                        console.log("The form input fields are too deeply nested. MAX=4Levels, got:", ancesterKeyIndex);
                        alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                        return;
                }
            }else{
                ///create ancester's child either as an empty array or empty object whose key is the child's key
                let childsKey      = pathLevels[ancesterKeyIndex+1];
                let grandChildsKey = pathLevels[ancesterKeyIndex+2] ? pathLevels[ancesterKeyIndex+2] : fieldname;
                
                console.log("childsKey = ", childsKey, "grandChildsKey=",grandChildsKey);
                if( !isNaN(grandChildsKey) ){
                    //this means the child to be created should be an array
                    //key in (to this ancester), the ancester's child and assign it an empty array 
                    switch (ancesterKeyIndex) {
                        case 0:
                            requestData[childsKey] = [];
                            break;
                        case 1: 
                            let k1 = ancesterKey;
                            console.log("[]ancesterKeyIndex=",ancesterKeyIndex, "requestData[k1][childsKey] = requestData["+k1+"]["+childsKey+"]");
                            requestData[k1][childsKey] = [];
                            
                            break;
                        case 2: 
                            let ky1 = pathLevels[1];
                            let ky2 = ancesterKey;
                            requestData[ky1][ky2][childsKey] = [];
                            break;
                        case 3: 
                            let key1 = pathLevels[1];
                            let key2 = pathLevels[2];
                            let key3 = ancesterKey;
                            requestData[key1][key2][key3][childsKey] = [];
                            break;
                        case 4: 
                            let keyy1 = pathLevels[1];
                            let keyy2 = pathLevels[2];
                            let keyy3 = pathLevels[3];
                            let keyy4 = ancesterKey;
                            requestData[keyy1][keyy2][keyy3][keyy4][childsKey] = [];
                            break;
                        case 5: 
                            let keeyy1 = pathLevels[1];
                            let keeyy2 = pathLevels[2];
                            let keeyy3 = pathLevels[3];
                            let keeyy4 = pathLevels[4];
                            let keeyy5 = ancesterKey;
                            requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5][childsKey] = [];
                            break;
                        default:
                            console.log("The form input fields are too deeply nested. MAX=4Levels, got:", ancesterKeyIndex);
                            alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                            return;
                    }
                }else{
                    //this means the child to be created should be an object
                    //key in (to this ancester), the ancester's child and assign it an empty object 
                    switch (ancesterKeyIndex) {
                        case 0:
                            requestData[childsKey] = {};
                            break;
                        case 1: 
                            let k1 = ancesterKey;
                            console.log("{}ancesterKeyIndex=",ancesterKeyIndex, "requestData[k1][childsKey] = requestData["+k1+"]["+childsKey+"]");
                            requestData[k1][childsKey] = {};
                            break;
                        case 2: 
                            let ky1 = pathLevels[1];
                            let ky2 = ancesterKey;
                            requestData[ky1][ky2][childsKey] = {};
                            break;
                        case 3: 
                            let key1 = pathLevels[1];
                            let key2 = pathLevels[2];
                            let key3 = ancesterKey;
                            requestData[key1][key2][key3][childsKey] = {};
                            break;
                        case 4: 
                            let keyy1 = pathLevels[1];
                            let keyy2 = pathLevels[2];
                            let keyy3 = pathLevels[3];
                            let keyy4 = ancesterKey;
                            requestData[keyy1][keyy2][keyy3][keyy4][childsKey] = {};
                            break;
                        case 5: 
                            let keeyy1 = pathLevels[1];
                            let keeyy2 = pathLevels[2];
                            let keeyy3 = pathLevels[3];
                            let keeyy4 = pathLevels[4];
                            let keeyy5 = ancesterKey;
                            requestData[keeyy1][keeyy2][keeyy3][keeyy4][keeyy5][childsKey] = {};
                            break;
                        default:
                            console.log("The form input fields are too deeply nested. MAX=4Levels, got:", ancesterKeyIndex);
                            alert("Oops! your app can't read any input data. Please contact your IT specialist for help.");
                            return;
                    }
                }
            }
        }
        //===========//==========
        
        //call the function just defined
        insertDataIntoRequestBody( pathLevels.length-1 );
        
        console.log("<><><> finally: requestData = ", JSON.stringify(requestData));
        
        //now write the result back to requestData
        props.requestData.current = requestData;
    }
    
    useEffect(() => {
        if(props.type!=="child" && props.type!=="children"){
          props.registerInputReader( reader );
        }
        
        if(props.dl){
           if((typeof props.dl) === "string"){
               if (props.dl==="none"){
                  setSelectOptions("none");
               }else if(props.dl.startsWith("default:")){
                  let val = props.dl.split(":")[1];
                  setSelectOptions(val);
               }else if(props.dl.startsWith("path:")){
                  //make a call to the backend for a data list; use the "props.dl"
                  let pathsConcat = props.dl.split(":")[1];
                  if(pathsConcat.includes(",")){
                    let pathsList = pathsConcat.split(",");
                    setLoading(true);
                    pathsList.forEach((backend) => {
                        axios({
                            url: `/options${backend}`,
                            method: "get"
                        }).then(function(response) {
                            setLoading(false);
                            if(response.status === 200){
                                if(response.data.Data){
                                    let receivedData = response.data.Data;
                                    setSelectOptions(receivedData.concat(selectOptions));
                                    console.log("==(pushed)=selectOptions=> response.data.Data=", selectOptions);
                                    setResponseStatus(response.status);
                                }else{
                                    console.log("response.data.Data is not found in the response from backend");
                                }
                            }else{
                                setErrorFromBackend(response.data.Message);
                                setResponseStatus(response.status);
                            }
                            setLoading(false);
                        },(er)=>{ console.log(er); });
                    });
                  }else{
                    setLoading(true);
                    let backend = pathsConcat.replace(" ","");
                    axios({
                        url: `/options${backend}`,
                        method: "get"
                    }).then(function(response) {
                        setLoading(false);
                        if(response.status === 200){
                            console.log("===> backend=", backend);
                            if(response.data.Data){
                              setSelectOptions(response.data.Data);
                              console.log("==selectOptions=> response.data.Data=", response.data.Data);
                              console.log("==selectOptions=> response.data=", response.data);
                              setResponseStatus(response.status);
                            }else{
                              console.log("response.data.Data is not in the response from server");
                            }
                        }else{
                            setErrorFromBackend(response.data.Message);
                            setResponseStatus(response.status);
                        }
                        setLoading(false);
                    },(er)=>{ console.log(er); });
                  } 
               }else if(props.dl.includes(",")){
                  let options = props.dl.split(",");
                  setSelectOptions(options);
                  setSelectedItemType(options[0]);
               }
           }
        }
    },[props.dl]);
    
    return (
        <>
        {props.type==="number"?
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor="version">{props.label}</label>
              {((props.dl !== "none") && (!isNaN(props.dl)))?
               <input ref={inputFieldRef} type="number" value={props.dl} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              :<input ref={inputFieldRef} type="number" className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              }        
            </div>
        :((typeof props.type==="string") && (props.type.startsWith("text")))?
            <div className="mt-2">
              <label className="block text-sm text-gray-600" htmlFor={props.name+props.key}>{props.label}</label>
              {(selectOptions === "none")?
               <input ref={inputFieldRef} type="text" id={props.name+props.key} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
              :((typeof selectOptions) === "string")?
               <div className="mt-2">
                 <label className="block text-sm text-gray-600" htmlFor={props.name+props.key}>{props.label}</label>
                 <input ref={inputFieldRef} type="text" value={selectOptions} id={props.name+props.key} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
               </div>
              :(Array.isArray(selectOptions) && (selectOptions.length>0) && (typeof selectOptions[0] === "string"))?
                  <div className="mt-2">
                      <label className="block text-sm text-gray-600" htmlFor={props.name+props.key}>{props.label}</label>
                      <input ref={inputFieldRef} type="text" datalist="searchableOptions" id={props.name+props.key} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                      <datalist id="searchableOptions">
                        {selectOptions.map((option, index)=> <option key={index} value={(props.type.endsWith(",id"))?index:option}> {option} </option>)}
                      </datalist>
                  </div>
              :(Array.isArray(selectOptions) && (selectOptions.length>0) && (typeof selectOptions[0] === "object"))?
                  <div className="mt-2">
                      <label className="block text-sm text-gray-600" htmlFor={props.name+props.key}>{props.label}</label>
                      <input ref={inputFieldRef} type="text" datalist="searchableOptions" id={props.name+props.key} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
                      <datalist id="searchableOptions">
                        {selectOptions.map((option, index)=> <option key={index} value={(props.type.endsWith(",id"))?option.id:option.value}> {option.value} </option>)}
                      </datalist>
                  </div>
               :null
              }        
            </div>
        :((typeof props.type==="string") && (props.type.startsWith("select")))?
            <div className="mb-3 xl:w-96">
                <label className="block text-sm text-gray-600" htmlFor={props.name+props.key}>{props.label}</label>
                 { ((typeof selectOptions) === "string")?
                   <select ref={inputFieldRef} id={props.name+props.key} className={`form-select form-select-sm appearance-none block w-full px-2 py-1 text-sm font-normal text-gray-700
                    bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example`}>
                   <option value={selectOptions}> {selectOptions} </option>
                   </select>
                  :(Array.isArray(selectOptions) && (selectOptions.length>0) && (typeof selectOptions[0] === "string"))?
                    <select ref={inputFieldRef} value={selectedItemType} onChange={handleChangeOfSelectedItemType} id={props.name+props.key} className={`form-select form-select-sm appearance-none block w-full px-2 py-1 text-sm font-normal text-gray-700
                    bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example`}>
                    {selectOptions.map((option, index) => <option key={index} value={(props.type.endsWith(",id"))?index:option}> {option} </option>)}
                    </select>
                  :(Array.isArray(selectOptions) && (selectOptions.length>0) && (typeof selectOptions[0] === "object"))?
                    <select ref={inputFieldRef} id={props.name+props.key} className={`form-select form-select-sm appearance-none block w-full px-2 py-1 text-sm font-normal text-gray-700
                    bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0
                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example`}>
                    {loading?
                     <option> <img src={loadingGif} width="30px"/> </option>
                     :selectOptions.map((option, index)=> <option key={index} value={(props.type.endsWith(",id"))?option.id:option.value}> {option.value} </option>)
                    }
                    </select>
                  :null
                 }
            </div>
        :null
        }
      </>
    );
}

export default FormInputField;


/*
    type                dl
    -----              --------------
    number              - none
    number              - default:xxxxxx
    text                - none
    text                - default:xxxxxx
    text,id             - path:/somepath
    text,value          - one, two, three, four, five, ...
    select,value        - default:somevalue
    select,value        - one, two, three
    select,value        - path:/something
    select,id           - one, two, three
    select,id           - path:/something
*/










