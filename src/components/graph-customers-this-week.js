import React, { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function GraphCustomersThisWeek() {
    const [chartOptions, setChartOptions] = useState({
                                                       responsive:true,
                                                       plugins: { 
                                                         legend:{position:"top"}, 
                                                         title:{display:false, text:"Customers this week"}
                                                       },
                                                       elements: {
                                                         line: { tension: 0.4 }
	                                                   }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([10, 20, 30, 40, 38, 48, 44]);
    const [totalDataset, setTotalDataset] = useState({label: "Total", data: totalData, borderColor: "rgb(255, 99, 132)", backgroundColor: "rgba(255, 99, 132, 0.2)", order: 1 });
    //-------------- 
    const [accomodationData, setAccomodationData] = useState([5, 15, 10, 30, 25, 27, 32]);
    const [accomodationDataset, setAccomodationDataset] = useState({ type: "line", label: "Accomodation", data: accomodationData, fill: false, borderColor: "rgb(54, 162, 235)", order: 2 });              
    //--------------                                                 
    const [barData, setBarData] = useState([14, 18, 10, 22, 24, 16, 17]);
    const [barDataset, setBarDataset] = useState({ label: "Bar", data: barData, type: "line", fill: false, borderColor: "rgb(54, 162, 64)", order: 3 });
    //--------------                                             
    const [chartLabels, setChartLabels] = useState(["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset, accomodationDataset, barDataset] });
    
    const [ordersCount, setOrdersCount] = useState(152);
    const [loading, setLoading] = useState(true);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    const pullDataFormBackend = () => {
        axios({
            url: `/statistics/customers/thisweek`,
            method: "get"
        }).then(function(response) {
            console.log("response.data=", response.data);
            setLoading(false);
            if(response.status === 200){
                if(response.data.totalData){ setTotalData(response.data.totalData); }
                if(response.data.accomodationData){ setAccomodationData(response.data.accomodationData); }
                if(response.data.barData){ setBarData(response.data.barData); }
                if(response.data.chartLabels){ setChartLabels(response.data.chartLabels); }
            }
        },(er)=>{ console.log(er); });
    };
    pullDataFormBackend();
    
    return (
        <div className="w-full md:w-1/2 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold text-gray-600">Customers (Dec 1st - Dec 7th)</h5>
                </div>
                <div className="p-5">
                    <Bar options={chartOptions} data={chartData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphCustomersThisWeek;













