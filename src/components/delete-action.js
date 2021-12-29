import React, { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import ErrorBox from "./error-box";

function DeleteAction(props) {
    const [dataFromBackend, setDataFromBackend] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const pullDataFromBackend = () => {
        
        axios({
            url: `${BACKEND_URL}${props.endpoint}`,
            method: "get"
        }).then(function(response) {
            console.log(response.data);
            setLoading(false);
            if (response.statusCode == 200) {
                if (response.data.data){
                    setDataFromBackend(response.data.data);
                }
            }else{
                props.updateActiveDisplay(<ErrorBox errmessage={response.data.message}/>);
            }
        },(er)=>{ console.log(er); });
    };
    pullDataFromBackend();
    
    return (
          <div>
            {/* display a form with input fields prefilled using the data that was pulled from the backend */}
          </div>
    );
}

export default DeleteAction;













