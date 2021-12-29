import React from "react";


function ErrorBox(props) {
    
    return (
        <div className="flex flex-row flex-wrap flex-grow mt-2">
            
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                <div className="bg-white border rounded shadow">
                    <div className="border-b p-3">
                        <h3 className="font-bold uppercase text-gray-600"> !! Error </h3>
                    </div>
                    <div className="p-5">
                        <h5 className="font-bold uppercase text-gray-600"> {props.errmessage} </h5>
                    </div>
                </div>
            </div>

        </div>
    );
  
}

export default ErrorBox;













