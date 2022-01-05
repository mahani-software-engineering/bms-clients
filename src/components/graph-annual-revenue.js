/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

import React, { useState, useRef, useEffect } from "react";
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
                                                         title:{display:false}
                                                       }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([65, 59, 66, 81, 56, 55, 40, 65, 59, 70, 81, 80]);
    const [totalDataset, setTotalDataset] = useState({label: "Income per month", data: totalData, fill: false,
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
    const chartReference = useRef();
    const quarterChartReference = useRef();
    
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/annual/revenue`,
            method: "get"
        }).then(function(response) {
            console.log("GraphAnnualRevenue: response.data", response.data)
            const yearSequence = {
                Jan: {yest:"Dec", tomor:"Feb"},
                Feb: {yest:"Jan", tomor:"Mar"},
                Mar: {yest:"Feb", tomor:"Apr"},
                Apr: {yest:"Mar", tomor:"May"},
                May: {yest:"Apr", tomor:"Jun"},
                Jun: {yest:"May", tomor:"Jul"},
                Jul: {yest:"Jun", tomor:"Aug"},
                Aug: {yest:"Jul", tomor:"Sep"},
                Sep: {yest:"Aug", tomor:"Oct"},
                Oct: {yest:"Sep", tomor:"Nov"},
                Nov: {yest:"Oct", tomor:"Dec"},
                Dec: {yest:"Nov", tomor:"Jan"}
            };
            let dtsets = {};
            
            let today = new Date();
            let dx = new Date(); 
            dx.setDate(dx.getDate() - 365);
            let date12MonthsAgo = new Date(dx.toString());
            
            let firstMonth = getMonthOfYear(date12MonthsAgo.getMonth()+2);
            let lastMonth  = getMonthOfYear(today.getMonth()+1);
            console.log("firstMonth=",firstMonth,"lastMonth=",lastMonth);
            
            let someMonth = firstMonth
            while(someMonth!==lastMonth){
                dtsets[someMonth] = 0;
                someMonth = yearSequence[someMonth].tomor;
            }
            dtsets[someMonth] = 0;
            response.data.Data.forEach((row, ix) => {
                let month = getMonthOfYear(row.date);
                dtsets[month] = Number(row.amount);
            });
            console.log("=dtsets=>", JSON.stringify(dtsets));
            
            let months = Object.keys(dtsets);
            let monthsData = months.map(m => dtsets[m]) ;
            const quarterIndeces = [[0,1,2],[3,4,5],[6,7,8],[9,10,11]];
            let quarterNames = [`${months[0]}-${months[2]}`, `${months[3]}-${months[5]}`, `${months[6]}-${months[8]}`, `${months[9]}-${months[11]}`];
            let quartersData = quarterIndeces.map(ar => ar.map(i => monthsData[i]).reduce((a,b) => a+b, 0));
            
            console.log("monthsData=",JSON.stringify(monthsData));
            
            const chart = chartReference.current;
            chart.data.datasets[0].data = monthsData;
            chart.data.labels = months;
            const chart2 = quarterChartReference.current;
            chart2.data.datasets[0].data = quartersData;
            chart2.data.labels = quarterNames;
            
            chart.update();
            chart2.update();
        },(er)=>{ console.log(er); });
    };
    
    useEffect(() => {
        pullDataFromBackend();
    },[]);
    
    function getDayOfWeek(dateString){
        const days = {1: "Mon", 2: "Tue", 3: "Wed", 4: "Thu", 5: "Fri", 6: "Sat", 7:"Sun"};
        //eg. dateString = "2021-12-31 00:00:00.000"
        if(!isNaN(dateString)){
            return days[dateString];
        }
        const d = new Date(dateString);
        let day = d.getDay()
        return days[day];
    }
    
    function getMonthOfYear(dateString){
        const monthNames = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun",7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12:"Dec"};
        //eg. dateString = "2021-12-31 00:00:00.000"
        if(!isNaN(dateString)){
           return monthNames[dateString];
        }
        const d = new Date(dateString);
        let month = d.getMonth()+1;
        return monthNames[month];
    }
    
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Annual revenue</h5>
                </div>
                <div className="p-5">
                    <Bar ref={chartReference} options={chartOptions} data={chartData} />
                </div>
            </div>
            <br/>
            <div className="bg-white border rounded shadow">
                <div className="p-5">
                    <Bar ref={quarterChartReference} options={chartOptions} data={chartMonthlyData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphAnnualRevenue;













