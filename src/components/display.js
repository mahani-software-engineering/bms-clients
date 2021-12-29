import React from "react";


function Display(props) {
    return (
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
           {props.children}
        </div>
    );
  
}

export default Display;













