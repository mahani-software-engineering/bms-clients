/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

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
import { Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';
import faker from 'faker';

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

function GraphRevenueThisWeek() {
    const [chartOptions, setChartOptions] = useState({
                                                       responsive:true,
                                                       plugins: { 
                                                         legend:{position:"top"}, 
                                                         title:{display:false, text:"Customers this week"}
                                                       }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([65, 59, 80, 81, 56, 55, 66]);
    const [totalDataset, setTotalDataset] = useState({label: "Total revenue", data: totalData, borderColor: "rgb(75, 192, 192)", fill: false, lineTension: 0.1 });
    //-------------- 
                                                 
    const [chartLabels, setChartLabels] = useState(["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset] });
      
    const pullDataFormBackend = () => {
        axios({
            url: `/statistics/revenue/thisweek`,
            method: "get"
        }).then(function(response) {
            if(response.status === 200){
                if(response.data.totalData){ setTotalData(response.data.totalData); }
                if(response.data.chartLabels){ setChartLabels(response.data.chartLabels); }
            }
        },(er)=>{ console.log(er); });
    };
    pullDataFormBackend();
    
    return (
        <div className="w-full md:w-1/2 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold text-gray-600">Revenue (Dec 1st - Dec 7th)</h5>
                </div>
                <div className="p-5">
                    <Line options={chartOptions} data={chartData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphRevenueThisWeek;













