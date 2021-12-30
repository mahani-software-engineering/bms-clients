import React, { useState } from "react";
import dotsIconHoriz from "./images/icons/ic_more_horiz_black_48dp.png";
import loadingGif from "./images/ajax-loader.gif";
import Action from "./action";


function ActionsBtn(props) {
    const [actionOptions, setActionOptions] = useState(["view", "edit", "delete"]);
    const [showOptions, setShowOptions] = useState(false);
    
    function displayOptions(){
        setShowOptions(!showOptions)
    }
    
    return (
        <div className="relative" style={{width:"40px", height:"40px", padding:"0", margin:"0", float:"right"}}>
            <img src={dotsIconHoriz} width="100%" onClick={displayOptions} />
            {showOptions?
            <div id="actionOptions" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 max-w-40 z-50" style={{background:"white", border:"1px solid lenen"}}>
                <ul className="list-reset">
                    {actionOptions.map((acn, k) => <Action name={acn} key={k} setShowOptions={setShowOptions} endpoint={props.endpoint} itemid={props.itemid} epcase={props.epcase?props.epcase:""} vwcase={props.vwcase} updateActiveDisplay={props.updateActiveDisplay}/>)}      
                </ul>
            </div>
            :null}
        </div>
    );
  
}

export default ActionsBtn;













