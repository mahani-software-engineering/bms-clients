import React from "react";
import ViewAction from "./view-action";
import EditAction from "./edit-action";
import DeleteAction from "./delete-action";

function Action(props) {
    
    function applyAction(){
        switch (props.name) {
            case "view":
                props.updateActiveDisplay(<ViewAction endpoint={props.endpoint} vwcase={props.vwcase} updateActiveDisplay={props.updateActiveDisplay}/>);
                break;
            case "edit":
                props.updateActiveDisplay(<EditAction endpoint={props.endpoint} epcase={props.epcase} updateActiveDisplay={props.updateActiveDisplay}/>);
                break;
            case "delete":
                props.updateActiveDisplay(<DeleteAction endpoint={props.endpoint} epcase={props.epcase} updateActiveDisplay={props.updateActiveDisplay}/>);  
                break;
            default:
                //do nothing
        }
    }
    
    return (
        <li onClick={() => {applyAction(); props.setShowOptions(false)}}>
            <a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">
                {props.name}
            </a>
        </li>
    );
}

export default Action;




