/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

import React, { useState } from "react";
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

function GraphRevenueSources() {
    const [chartOptions, setChartOptions] = useState({
                                                       responsive:true,
                                                       plugins: { 
                                                         legend:{position:"top"}, 
                                                         title:{display:false, text:"Customers this week"}
                                                       }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([170, 50, 100, 70]);
    const [totalDataset, setTotalDataset] = useState({label: "Revenue sources", data: totalData,
    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"] });
    //-------------- 
    const [chartLabels, setChartLabels] = useState(["Accomodation", "Bar", "Hotel", "Tours"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset] });
      
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/revenue/sources/annual`,
            method: "get"
        }).then(function(response) {
            //TODO: check if status is 200 OK
            //update the data state variables
            //in case labels have changed, update their state variables as well
        },(er)=>{ console.log(er); });
    };
    pullDataFromBackend();
    
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Annual Revenue Sources</h5>
                </div>
                <div className="p-5">
                    <Doughnut options={chartOptions} data={chartData} />
                </div>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-pink-800" style={{marginLeft:"3%"}}>
                  Accomodation: 170,000,000 Bar: 50,000,000 Hotel: 100,000,000 Tours: 70,000,000
                </p>
            </div>
            
        </div>
    );
  
}


export default GraphRevenueSources;













