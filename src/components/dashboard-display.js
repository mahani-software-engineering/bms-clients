import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome ,
         faTasks, 
         faEnvelope, 
         faChartArea, 
         faWallet, 
         faUserPlus, 
         faNewspaper, 
         faBell, 
         faFile, faServer, 
         faChartPie } from '@fortawesome/free-solid-svg-icons';   

import userPhoto from "./images/my_pic_white.png";

import GraphCustomersThisWeek from "./graph-customers-this-week";
import GraphRevenueThisWeek from "./graph-revenue-this-week";
import GraphAnnualRevenue from "./graph-annual-revenue";
import GraphRevenueSources from "./graph-revenue-sources";
import GraphRevenueSourcesThisWeek from "./graph-revenue-sources-this-week";
import StockSales from "./stock-sales";
import PaymentsBanner from "./payments-banner";
import ExpensesBanner from "./expenses-banner";
import OrdersBanner from "./orders-banner";



function DashboardDisplay(props) {
    return (
        <>
           <div className="flex flex-wrap">
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    {/*<!--Metric Card-->*/}
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-green-600"><FontAwesomeIcon icon={faWallet}/></div>
                            </div>
                            <div className="flex-1 text-center md:center-center">
                                <h5 className="font-bold uppercase text-gray-500">Total Revenue</h5>
                                <h3 className="font-bold text-3xl">UGX 3,249,000 </h3>
                            </div>
                        </div>
                    </div>
                    {/*<!--/Metric Card-->*/}
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    {/*<!--Metric Card-->*/}
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-pink-600"><FontAwesomeIcon icon={faNewspaper}/></div>
                            </div>
                            <div className="flex-1 text-center md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">All customers</h5>
                                <h3 className="font-bold text-3xl">249 <span className="text-pink-500"><i className="fas fa-exchange-alt"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    {/*<!--/Metric Card-->*/}
                </div>
                <div className="w-full md:w-1/2 xl:w-1/3 p-3">
                    {/*<!--Metric Card-->*/}
                    <div className="bg-white border rounded shadow p-2">
                        <div className="flex flex-row items-center">
                            <div className="flex-shrink pr-4">
                                <div className="rounded p-3 bg-yellow-600"><FontAwesomeIcon icon={faUserPlus}/></div>
                            </div>
                            <div className="flex-1 text-center md:text-center">
                                <h5 className="font-bold uppercase text-gray-500">New Guests</h5>
                                <h3 className="font-bold text-3xl">8 <span className="text-yellow-600"><i className="fas fa-caret-up"></i></span></h3>
                            </div>
                        </div>
                    </div>
                    {/*<!--/Metric Card-->*/}
                </div>
                <OrdersBanner updateActiveDisplay={props.updateActiveDisplay}/>
                <ExpensesBanner updateActiveDisplay={props.updateActiveDisplay}/>
                <PaymentsBanner updateActiveDisplay={props.updateActiveDisplay}/>
            </div>

            {/*<!--Divider-->*/}
            <hr className="border-b-2 border-gray-400 my-8 mx-4"/>

            <div className="flex flex-row flex-wrap flex-grow mt-2">

                <GraphCustomersThisWeek/>
                <GraphRevenueThisWeek/>
                <GraphAnnualRevenue/>
                <GraphRevenueSources/>
                <GraphRevenueSourcesThisWeek/>
                <StockSales updateActiveDisplay={props.updateActiveDisplay}/>

            </div>

            {/*<!--/ Console Content-->*/}
        </>
    );
  
}

export default DashboardDisplay;

