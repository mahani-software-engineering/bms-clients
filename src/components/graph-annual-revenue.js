/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

import React, { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
import userPhoto from "./images/my_pic_white.png";
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
import { Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

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

function GraphAnnualRevenue() {
    const [chartOptions, setChartOptions] = useState({
                                                       responsive:true,
                                                       plugins: { 
                                                         legend:{position:"top"}, 
                                                         title:{display:false, text:"Customers this week"}
                                                       }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([65, 59, 66, 81, 56, 55, 40, 65, 59, 70, 81, 80]);
    const [totalDataset, setTotalDataset] = useState({label: "Income", data: totalData, fill: false,
    backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
    borderWidth: 1});
    //--------------
    const [totalMonthlyData, setTotalMonthlyData] = useState([65, 59, 66, 81]);
    const [totalMonthlyDataset, setTotalMonthlyDataset] = useState({label: "Income per quarter", data: totalData, borderColor: "rgb(75, 192, 192)", fill: false,
    backgroundColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)","rgb(200, 99, 130)", "rgb(255, 99, 132)"],
    borderWidth: 1});
    //-------------- 
    //--------------                             
    const [chartLabels, setChartLabels] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset] });
    //--------------
    const [chartMonthlyLabels, setChartMonthlyLabels] = useState(["Jan-mar", "Apr-Jun", "Jul-Sep", "Oct-Dec"]);
    const [chartMonthlyData, setChartMonthlyData] = useState({labels:chartMonthlyLabels, datasets: [totalMonthlyDataset] });
    
    
      
    const pullDataFormBackend = () => {
        axios({
            url: `/statistics/annual/revenue`,
            method: "get"
        }).then(function(response) {
            //TODO: check if status is 200 OK
            //update the data state variables
            //in case labels have changed, update their state variables as well
        },(er)=>{ console.log(er); });
    };
    pullDataFormBackend();
    
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Annual revenue</h5>
                </div>
                <div className="p-5">
                    <Bar options={chartOptions} data={chartData} />
                </div>
            </div>
            <br/>
            <div className="bg-white border rounded shadow">
                <div className="p-5">
                    <Bar options={chartOptions} data={chartMonthlyData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphAnnualRevenue;













