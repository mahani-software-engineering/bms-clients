import React, {useState, useRef} from "react";
import FormInputField from "./form-input-field";

function FormStepContent(props) {
    //const [controlledParams, setControlledParams] = useState([]);
    const [itemsFilter, setItemsFilter] = useState("");
    console.log("itemsFilter=", itemsFilter);
    
    return (
        <>
           {
             props.formStep.datalist.map((fld, i) => 
             <>
               {(!Array.isArray(fld.datalist))?
               <FormInputField 
                   key={props.key+""+i} 
                   instanceId={props.instanceId} 
                   nestingPath={props.formStep.path} 
                   name={fld.name} 
                   type={fld.type} 
                   dl={(!fld.datalist.startsWith("path:")) ? fld.datalist: (itemsFilter!=="") ? "path:/"+itemsFilter : fld.datalist} 
                   label={fld.label} 
                   registerInputReader={props.registerInputReader} 
                   requestData={props.requestData} 
                   backend={props.backend} 
                   setItemsFilter={setItemsFilter}
               />
               :null
               }
             </>
             )
           }
        </>
    );
}

export default FormStepContent;













