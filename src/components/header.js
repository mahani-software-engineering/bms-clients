import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import logo from './images/cropped-victoria-forest-logo.png';
import userPhoto from "./images/my_pic_white.png";
import defaultUserPicture from "./images/icons/ic_person_gray.png";
import moreIcon from "./images/icons/ic_more_horiz_black_48dp.png";
import DashboardDisplay from './dashboard-display';
import ViewAction from "./view-action";
import { access } from "./globals";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 

function Header(props) {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [showStockOptions, setShowStockOptions] = useState(false);
    const [mobileNavMenuOpen, setMobileNavMenuOpen] = useState(false);
    const [menuButtonClicked, setMenuButtonClicked] = useState(false);
    const [userMenuActive, setUserMenuActive] = useState(false);
    const [navMenuActive, setNavMenuActive] = useState(false);
    const [userProfilePicture, setUserProfilePicture] = useState(defaultUserPicture);
    const [userProfileName, setUserProfileName] = useState("Guest User");
    
    function toggleUserMenuDiv(){
        setUserMenuActive(!userMenuActive);
    }
    
    function toggleNavMenuDiv(){
        setNavMenuActive(!navMenuActive);
    }
    
    function goHome(){
        props.updateActiveDisplay(<DashboardDisplay updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayPayments(){
        props.updateActiveDisplay(<ViewAction endpoint="/payment" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayExpenses(){
        props.updateActiveDisplay(<ViewAction endpoint="/expense" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayOrders(){
        props.updateActiveDisplay(<ViewAction endpoint="/order" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    function displayInvoinces(){
        props.updateActiveDisplay(<ViewAction endpoint="/invoice" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayBills(){
        props.updateActiveDisplay(<ViewAction endpoint="/bill" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayProducts(){
        props.updateActiveDisplay(<ViewAction endpoint="/product" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayStockTransactions(){
        props.updateActiveDisplay(<ViewAction endpoint="/stock" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayMessages(){
        props.updateActiveDisplay(<ViewAction endpoint="/message" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayPackages(){
        props.updateActiveDisplay(<ViewAction endpoint="/package" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayServices(){
        props.updateActiveDisplay(<ViewAction endpoint="/service" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    function displayUsers(){
        props.updateActiveDisplay(<ViewAction endpoint="/user" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
    function clearStoredCredentials(){
        localStorage.setItem("userAccessRights","");
        localStorage.setItem("currentUserId","");
    }
    
    let currentUserId = localStorage.getItem('currentUserId');
    let userAccessRights = localStorage.getItem('userAccessRights');
    
    
    useEffect(() => {
        let id = props.currentUserId;
        if(id && (id !== "")){
          axios({
              url: `/user/${id}`,
              method: "get"
          }).then(function(response) {
              setUserProfileName(response.data.Data.lastname);
              if(response.data.Data.profilepicture &&  
                 (response.data.Data.profilepicture !== "xxxxx") && 
                 (response.data.Data.profilepicture !== "")
                ){
                setUserProfilePicture(response.data.Data.profilepicture);
              }
          },(er)=>{ console.log(er); });
        }
    },[]);
    
    return (
        <>
            <nav id="header" className="bg-white fixed w-full z-10 top-0 shadow">

            <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">

                <div className="w-1/2 pl-2 md:pl-0">
                    <a className="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold" href="#">
                        <table onClick={goHome}> 
                          <tbody>
                            <tr>
                                <td>
                                    <img src={logo} width="40px"/>
                                </td>
                                <td>
                                    <span style={{fontSize:"3vw"}}> Victoria Forest Resort </span>
                                </td>
                            </tr>
                          </tbody>
                        </table>
                    </a>
                </div>
                <div className="w-1/2 pr-0">
                    <div className="flex relative inline-block float-right">

                        <div className="relative text-sm">
                            <button className="flex items-center focus:outline-none mr-3" onClick={toggleUserMenuDiv}>
                                <img className="w-8 h-8 rounded-full mr-4 border-solid border-2 border-green-600" src={userProfilePicture} alt="User"/> 
                                <span className="hidden md:inline-block"> {userProfileName} </span>
                            </button>
                            <div className={`bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 
                                ${!userMenuActive && "invisible"}
                            `}>
                                <ul className="list-reset">
                                    <li><a href="#" onClick={toggleUserMenuDiv} className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</a></li>
                                    <li><a href="#" onClick={toggleUserMenuDiv} className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Manage account</a></li>
                                    <li>
                                        <hr className="border-t mx-2 border-gray-400"/>
                                    </li>
                                    <li onClick={{clearStoredCredentials}}>
                                     <a href="#" onClick={toggleUserMenuDiv} className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>


                        <div className="block lg:hidden pr-4">
                            <button onClick={toggleNavMenuDiv} id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>


                <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${!navMenuActive && "hidden"}  lg:block mt-2 lg:mt-0 bg-white z-20`}>
                    <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                        <li className="mr-6 my-2 md:my-0" onClick={goHome}>
                            <a href="#" onClick={toggleNavMenuDiv} className="block py-1 md:py-3 pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600">
                                <i className="fas fa-home fa-fw mr-3 text-pink-600"></i><span className="pb-1 md:pb-0 text-sm">Home</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={setShowStockOptions.bind(this,!showStockOptions)} >
                            <a href="#" onClick={toggleNavMenuDiv} className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500">
                                <i className="fas fa-tasks fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Stock</span>
                            </a>
                            {showStockOptions?
                            <div id="" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-10 right-0 min-w-full overflow-auto z-30">
                                <ul className="list-reset">
                                    <li onClick={()=>{setShowStockOptions(false); displayProducts();}}><a href="#" onClick={toggleNavMenuDiv} className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline"> Products </a></li>
                                    <li onClick={()=>{setShowStockOptions(false); displayStockTransactions();}}><a href="#" onClick={toggleNavMenuDiv} className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline"> Transactions </a></li>
                                </ul>
                            </div>
                            :null}
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayInvoinces} >
                            <a href="#" onClick={toggleNavMenuDiv} className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500">
                                <i className="fas fa-chart-area fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Invoices</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayBills}>
                            <a href="#" onClick={toggleNavMenuDiv} className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500">
                                <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Bills</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayMessages}>
                            <a href="#" onClick={toggleNavMenuDiv} className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                                <i className="fa fa-envelope fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Messages</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0">
                            <a href="#" onClick={setShowMoreOptions.bind(this,!showMoreOptions)} className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
                                <img src={moreIcon} width="30px" height="30px"/>
                            </a>
                            {showMoreOptions?
                            <div id="" className="bg-white rounded shadow-md mt-2 absolute mt-12 top-10 right-0 min-w-full overflow-auto z-30">
                                <ul className="list-reset">
                                    <li onClick={()=>{setShowMoreOptions(false); displayPayments();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Payments </a></li>
                                    <li onClick={()=>{setShowMoreOptions(false); displayOrders();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Orders </a></li>
                                    <li onClick={()=>{setShowMoreOptions(false); displayExpenses();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Expenses </a></li>
                                    {(userAccessRights & access.IsSystemAdmin)?
                                    <>
                                    <li onClick={()=>{setShowMoreOptions(false); displayPackages();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Packages </a></li>
                                    <li onClick={()=>{setShowMoreOptions(false); displayServices();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Services </a></li>
                                    <li onClick={()=>{setShowMoreOptions(false); displayUsers();}}><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-green-600 hover:text-white no-underline hover:no-underline" onClick={toggleNavMenuDiv}> Users </a></li>
                                    </>
                                    :null}
                                </ul>
                            </div>
                            :null}
                        </li>
                        
                        <li className="mr-6 my-2 md:my-0">
                            <select>
                                <option> Today </option>
                                <option> This week </option>
                                <option> This month </option>
                                <option> This year </option>
                            </select>
                        </li>
                    </ul>

                    <div className="relative pull-right pl-4 pr-4 md:pr-0">
                        
                    </div>

                </div>

            </div>
        </nav>
     </>
    );
  
}

export default Header;













