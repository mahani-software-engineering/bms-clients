import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL, FORM_FORMATS } from "./globals";
import DashboardDisplay from './dashboard-display';
import FormStepContent from './form-step-content';


const Form = (props) => {
    const [loading, setLoading] = useState(false);
    const [errorFromServer, setErrorFromServer] = useState("Unexpected error");
    const [responseStatus, setResponseStatus] = useState("Unexpected error");
    const [formStepContentInstances, setFormStepContentInstances] = useState([]);
    //props: {endpoint:string, epcase:number}
    const inputReaders = useRef([]);
    const [currentStep, setCurrentStep] = useState(0);
    
    const formSteps = useRef({paths:[]});
    
    //"datalist" is a url path which the element can call internally for a list of select options if applicable
    const [activeFormCase, setActiveFormCase] = useState([]);
    //NOTE: always attach "createdby" at the root of the request data, where createdby=current_User_ID
    /*TODO: always check if "customerid" is available in the props, consider it as a root property*/
    
    //==============
    function selectNonExpandableOnly(fieldsList){
        if(Array.isArray(fieldsList)){
           return fieldsList.filter(inp=>((inp.type!="child") && (inp.type!="children")));
        }else{
            return [];
        }
    }
    
    let formEndpoint = props.endpoint.trim().startsWith("/")? props.endpoint.split("/")[1].trim() : props.endpoint.trim();
    
    function arrangeFormSteps(){
        let currentPath = "root";
        let Queue = [];
        let formSteps = [];
        
        console.log(">>> props.epcase = ", props.epcase);
        function expandField(field, currentPath){
          if(field.type === "child"){
             let tmp = field;
             tmp.path = currentPath+"_"+field.name;
             tmp.visited = false;
             Queue.push(tmp);
          }else if(field.type === "children"){
            field.datalist.forEach((child, indx) => {
                let tmp = {};
                tmp.path = currentPath+"_"+field.name+"_"+indx;
                tmp.label = field.label;
                tmp.name  = field.name;
                tmp.type  = field.type;
                tmp.datalist = child;
                tmp.visited = false;
                Queue.push(tmp);
                //the index of tmp when later inserted into activeFormCase will be Queue.length
                let tmpStepid = Queue.length;
                setFormStepContentInstances([...formStepContentInstances, tmpStepid]);
            });
            //field.datalist = [];
          }
          
          Queue.forEach((fieldsGroup, index) => {
            if(!fieldsGroup.visited){
                console.log("------------------------------------------------------");
                console.log("fieldsGroup=",fieldsGroup);
                console.log("...");
                fieldsGroup.datalist.forEach((field) => {
                    Queue[index].visited = true;
                    expandField(field, fieldsGroup.path);
                });
            }
          });
        } //end expandField
        
        
        let inputFields = [];
        
        if (formEndpoint && props.epcase){
           if (FORM_FORMATS[formEndpoint][props.epcase]){
             inputFields = FORM_FORMATS[formEndpoint][props.epcase];
           }else{
             alert("invalid form format: "+formEndpoint+", "+props.epcase);
             return;
           }
        }else if(formEndpoint){
           if (FORM_FORMATS[formEndpoint]){
             inputFields = FORM_FORMATS[formEndpoint];
           }else{
             alert("invalid form format: "+formEndpoint);
             return;
           }
        }else{
            alert("Unspecified form format");
            return;
        }
        
        inputFields.forEach(f=>expandField(f, currentPath));
        
        let firstFormStep = {};
            firstFormStep.path = currentPath;
            firstFormStep.label = FORM_FORMATS[formEndpoint].label;
            firstFormStep.datalist = selectNonExpandableOnly(inputFields);
        //formSteps.push(firstFormStep);
        setActiveFormCase([firstFormStep, ...Queue]);
    } //end arrangeFormSteps
    
    let numberOfSteps = activeFormCase.length;
    let lastStep = numberOfSteps-1;
    useEffect(() => {
        arrangeFormSteps();
        setCurrentStep(lastStep);
    },[]);
    //==============
    
    const requestData = useRef({});
    const registerInputReader = (readerFunc) => {
        inputReaders.current.push(readerFunc);
    };
    
    const submitForm = (e) => {
        e.preventDefault();
        //call all registered field readers
        inputReaders.current.forEach(readUserInput => {
            readUserInput();
        });
        //use axios to post requestData
        let multiCaseServerEndpoints = ["createPayment"];
        let backendd = `${FORM_FORMATS[formEndpoint].url}${multiCaseServerEndpoints.includes(props.endpoint.trim())?"/"+props.epcase:""}`;
        console.log("||||||backendd=",backendd," |||||data=",requestData.current);
        let requestBodyJson = requestData.current;
        requestBodyJson.customerid = props.customerid;
        requestBodyJson.createdby = props.createdby ? props.createdby : 1;
        let requestBody = JSON.stringify(requestBodyJson);
        axios({
            url: backendd,
            method: FORM_FORMATS[formEndpoint].method,
            data: requestBody
        }).then(function(response) {
            setLoading(false);
            if(response.status === 200){
                setResponseStatus(response.status);
                alert("Ok.");
            }else{
                 setResponseStatus(response.status);
                 setErrorFromServer(response.data.Message);
                 alert("Error:"+response.data.Message);
            }
         }, (error) => {
            console.log(error);
            alert("Server error!");
         });
    };
    
    const btnSetActiveStep = (btn) => {
        if (btn==="next"){
            if(currentStep >= lastStep){
                setCurrentStep(lastStep);
            }else if(currentStep > -1){
                setCurrentStep(currentStep+1);
            }
        }else if (btn==="back"){
            if(currentStep <= 1){
                setCurrentStep(0);
            }else if(currentStep<(lastStep+1)){
                setCurrentStep(currentStep-1);
            }
        }
    };
    
    function goHome(){
        props.updateActiveDisplay(<DashboardDisplay updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    function addStepContentInstance(stepid){
        setFormStepContentInstances([...formStepContentInstances, stepid]);
    }
    
    return (
        <>
            <div className="flex flex-col w-full text-center">
              <div className="py-6 bg-white sm:py-8 lg:py-12">
                <div className="px-4 mx-auto max-w-screen-2xl md:px-8">
                   
                   <form className="max-w-screen-md mx-auto" onSubmit={submitForm}>
                     {
                       activeFormCase.map((formStep, ky) =>
                       <div className="w-full xl:w-1/3 p-6 xl:max-w-4xl border-l-1 border-gray-300">
                          <div className="max-w-sm lg:max-w-3xl xl:max-w-5xl">
                            <div className="border-b p-3">
                                <h5 className="font-bold text-black"> {formStep.label} </h5>
                            </div>
                            {/*genereate formStep content instances*/
                             formStep.type === "children"?
                             formStepContentInstances.filter(stepid=>(stepid===ky)).map((v,k)=> 
                              <FormStepContent key={ky+""+k}  stepId={ky} instanceId={k} formStep={formStep} registerInputReader={registerInputReader} requestData={requestData} backend={FORM_FORMATS[formEndpoint].url}/>    
                             )
                             :<FormStepContent key={ky} stepId={ky} formStep={formStep} registerInputReader={registerInputReader} requestData={requestData} backend={FORM_FORMATS[formEndpoint].url}/>    
                            }
                            {formStep.type === "children"?
                              <button type="button" onClick={addStepContentInstance.bind(this, ky)} style={{background:"linen", border:"0", margin:"2px 0 2px 0", padding:"0", width:"100%"}} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                                + add {formStep.name}
                              </button>
                             :null
                            }
                          </div>
                        </div>
                       )
                     }
                     {/*==============form footer======*/}
                     <div className="flex items-center justify-between" style={{margin: "30px 0 0 0"}}>
                        {(currentStep<=0)?
                        <button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-100" onClick={btnSetActiveStep.bind(this,"back")} style={{background:"lightgray", color:"black"}}>    
                           Back
                        </button>
                        :<button type="button" className="bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" style={{background:"lightgray"}}>    
                           Back
                        </button>
                        }
                        
                        {currentStep < lastStep?
                         <button type="button" onClick={btnSetActiveStep.bind(this, "next")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" style={{background:"blue"}}>
                           Next
                         </button>
                         :
                         <button type="submit" onClick={submitForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded" style={{background:"blue"}}>
                           Submit
                         </button>
                        }
                     </div>
                     {/*==============/form footer======*/}
                   </form>
                </div>
              </div>
            </div>
        </>
    );
};

export default Form;


