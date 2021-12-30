import React, { useState, useEffect } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import loadingGif from "./images/ajax-loader.gif";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function StockSales() {
    const [loading, setLoading] = useState(true);
    const [dataFromBackend, setDataFromBackend] = useState([]);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    
    useEffect(() => {
        axios({
            url: `/sales/ledger`,
            method: "get"
        }).then(function(response) {
            setLoading(false);
            if(response.status === 200){
                setDataFromBackend(response.data.Data);
                console.log("==StockSales=> response.data.Data=", response.data.Data);
                
                setResponseStatus(response.status);
            }else{
                setErrorFromBackend(response.data.Message);
                setResponseStatus(response.status);
            }
        },(er)=>{ console.log(er); });
    },[]);
    
    return (
        <div className="w-full p-3">
            {/*<!--Table Card-->*/}
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Stock / Sales</h5>
                </div>
                <div className="p-5" style={{overflowX:"scroll", maxWidth:"100vw"}}>
                    <table className="w-full p-5 text-gray-700">
                        <thead>
                            <tr>
                                <th className="text-left text-blue-900">Date</th>
                                <th className="text-left text-blue-900">Commodity</th>
                                <th className="text-left text-blue-900">Opening stock</th>
                                <th className="text-left text-blue-900">Added</th>
                                <th className="text-left text-blue-900">Sold</th>
                                <th className="text-left text-blue-900">Rate</th>
                                <th className="text-left text-blue-900">Closing stock</th>
                                <th className="text-left text-blue-900">Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                          {
                            loading? 
                             <tr> 
                                 <td colSpan="5"> 
                                    <img src={loadingGif} width="30px"/> 
                                 </td> 
                             </tr>
                            :responseStatus !== 200?
                                <tr><td colSpan="6"> <p> {errorFromBackend} </p> </td></tr> 
                            :dataFromBackend.map((v, k) => <tr key={k}>
                                    <td> {v.yyyy}-{v.mm}-{v.dd} </td>
                                    <td> {v.commodity} </td>
                                    <td> {v.openingstock} {v.units} </td>
                                    <td> {v.newstock} </td>
                                    <td> {v.sales} </td>
                                    <td> {v.rate} </td>
                                    <td> {(v.openingstock+v.newstock)-v.sales} </td>
                                    <td> {v.revenue} /=</td>
                                </tr>)
                          }
                        </tbody>
                    </table>

                </div>
            </div>
            {/*<!--/table Card-->*/}
        </div>
    );
  
}


export default StockSales;



/*
{
  commodity: prdt.Category,   
  openingStock:txn.OldQuantity,    
  new:txn.Quantity(add), 
  sales:txn.Quantity(remove),	
  closingStock:txn.NewQuantity,	
  revenue: calculated-value (sales * prices) 
 }
 
  txn
  -----
  productCategory:"soda",
  product: "",
  OldQuantity       uint    `json:"oldQuantity"`
  Quantity          uint    `json:"quantity"`
  NewQuantity       uint    `json:"newQuantity"`
  CreatedBy         uint    `json:"createdby"`
  
  prdt
  -----
  Name             string  `json:"name" gorm:"size:150"`
  Category         string  `json:"category" gorm:"size:40"`      //soda
  Brand            string  `json:"brand" gorm:"size:20"`         //fanta, crest, etc
  Type             string  `json:"type" gorm:"size:20"`          //plastic, bottled, etc
  Price            uint    `json:"price"`                        //4000
  Quantity         uint    `json:"quantity"`                     //450
  QuantityUnits
 
*/









