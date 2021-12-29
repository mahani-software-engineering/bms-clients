import React, { useState, useRef } from "react";
import logo from './images/cropped-victoria-forest-logo.png';
import userPhoto from "./images/my_pic_white.png";
import moreIcon from "./images/icons/ic_more_horiz_black_48dp.png";
import DashboardDisplay from './dashboard-display';
import ViewAction from "./view-action";

function Header(props) {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const [mobileNavMenuOpen, setMobileNavMenuOpen] = useState(false);
    const [menuButtonClicked, setMenuButtonClicked] = useState(false);
    
    //=========================
    //var userMenuDiv = document.getElementById("userMenu");
    const userMenuDiv = useRef(<></>);
    //var userMenu = document.getElementById("userButton");
    const userMenu = useRef(<></>);
    
    const navMenuDiv = useRef(<></>);
    
    function toggleMenuDiv(){
        if(mobileNavMenuOpen){
            setMobileNavMenuOpen(false);
            navMenuDiv.current.style.display = "none";
        }else{
            setMobileNavMenuOpen(true);
            navMenuDiv.current.style.display = "block";
        }
    }
    
    document.onclick =  (e) => {
        if(mobileNavMenuOpen){
            setMobileNavMenuOpen(false);
            navMenuDiv.current.style.display = "none";
        }
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
    function displayMessages(){
        props.updateActiveDisplay(<ViewAction endpoint="/message" vwcase="list" updateActiveDisplay={props.updateActiveDisplay}/>);
    }
    
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
                            <button ref={userMenu} className="flex items-center focus:outline-none mr-3">
                                <img className="w-8 h-8 rounded-full mr-4" src={userPhoto} alt="Avatar of User"/> <span className="hidden md:inline-block">Jackson K </span>
                            </button>
                            <div ref={userMenuDiv} className="bg-white rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30 invisible">
                                <ul className="list-reset">
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">My account</a></li>
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Manage account</a></li>
                                    <li>
                                        <hr className="border-t mx-2 border-gray-400"/>
                                    </li>
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-400 no-underline hover:no-underline">Logout</a></li>
                                </ul>
                            </div>
                        </div>


                        <div className="block lg:hidden pr-4">
                            <button onClick={toggleMenuDiv} className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                                <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <title>Menu</title>
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                </div>


                <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20" ref={navMenuDiv}>
                    <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                        <li className="mr-6 my-2 md:my-0" onClick={goHome}>
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-pink-600 no-underline hover:text-gray-900 border-b-2 border-orange-600 hover:border-orange-600">
                                <i className="fas fa-home fa-fw mr-3 text-pink-600"></i><span className="pb-1 md:pb-0 text-sm">Home</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayProducts} >
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-pink-500">
                                <i className="fas fa-tasks fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Stock</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayInvoinces} >
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-green-500">
                                <i className="fas fa-chart-area fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Invoices</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayBills}>
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-red-500">
                                <i className="fa fa-wallet fa-fw mr-3"></i><span className="pb-1 md:pb-0 text-sm">Bills</span>
                            </a>
                        </li>
                        <li className="mr-6 my-2 md:my-0" onClick={displayMessages}>
                            <a href="#" className="block py-1 md:py-3 pl-1 align-middle text-gray-500 no-underline hover:text-gray-900 border-b-2 border-white hover:border-purple-500">
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
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-800 no-underline hover:no-underline" onClick={()=>{setShowMoreOptions(false); displayPayments();}}> Payments </a></li>
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-800 no-underline hover:no-underline" onClick={()=>{setShowMoreOptions(false); displayOrders();}}> Orders </a></li>
                                    <li><a href="#" className="px-4 py-2 block text-gray-900 hover:bg-gray-800 no-underline hover:no-underline" onClick={()=>{setShowMoreOptions(false); displayExpenses();}}> Expenses </a></li>
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













