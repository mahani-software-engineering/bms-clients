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
import RevenuesBanner from "./revenues-banner";
import CustomersBanner from "./customers-banner";
import GuestsBanner from "./guests-banner";
import PaymentsBanner from "./payments-banner";
import ExpensesBanner from "./expenses-banner";
import OrdersBanner from "./orders-banner";

import { access } from "./globals";


function DashboardDisplay(props) {
    let userAccessRights = localStorage.getItem('userAccessRights');
    let currentUserId = localStorage.getItem('currentUserId');
    console.log("DashboardDisplay: currentUserId =",currentUserId);
    console.log("DashboardDisplay: userAccessRights=",userAccessRights);
    console.log("access.CanViewRevenueBanner=",access.CanViewRevenueBanner);
    console.log("userAccessRights & access.CanViewRevenueBanner=",userAccessRights & access.CanViewRevenueBanner);
    return (
        <>
           <div className="flex flex-wrap">
                {(userAccessRights & access.CanViewRevenueBanner) || 
                 (userAccessRights & access.IsSystemAdmin) || 
                 (userAccessRights & access.IsStaffAdmin) ?
                 <>
                 <RevenuesBanner updateActiveDisplay={props.updateActiveDisplay}/>
                 <CustomersBanner updateActiveDisplay={props.updateActiveDisplay}/>
                 <GuestsBanner updateActiveDisplay={props.updateActiveDisplay}/>
                 </>
                :null}
                {(userAccessRights & access.CanViewOrdersBanner) || 
                 (userAccessRights & access.IsSystemAdmin) || 
                 (userAccessRights & access.IsStaffAdmin) || (userAccessRights & access.IsStaff)?
                 <>
                 <OrdersBanner updateActiveDisplay={props.updateActiveDisplay}/>
                 <ExpensesBanner updateActiveDisplay={props.updateActiveDisplay}/>
                 </>
                :null}
                {(userAccessRights & access.CanViewPaymentsBanner) || 
                 (userAccessRights & access.IsSystemAdmin) || (userAccessRights & access.IsStaffAdmin)?
                <PaymentsBanner updateActiveDisplay={props.updateActiveDisplay}/>
                :null}
            </div>

            {/*<!--Divider-->*/}
            <hr className="border-b-2 border-gray-400 my-8 mx-4"/>

            <div className="flex flex-row flex-wrap flex-grow mt-2">

                {(userAccessRights & access.CanViewStockTransactions) || 
                 (userAccessRights & access.IsSystemAdmin) || (userAccessRights & access.IsStaffAdmin)?
                <>
                <GraphCustomersThisWeek/>
                <GraphRevenueThisWeek/>
                <GraphAnnualRevenue/>
                <GraphRevenueSources/>
                <GraphRevenueSourcesThisWeek/>
                <StockSales updateActiveDisplay={props.updateActiveDisplay}/>
                </>
                :null}

            </div>

            {/*<!--/ Console Content-->*/}
        </>
    );
  
}

export default DashboardDisplay;

