/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

import React, { useState, useRef, useEffect } from "react";
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
    const [totalDataset, setTotalDataset] = useState({label: "Annual Revenue sources", data: totalData,
    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"] });
    //-------------- 
    const [chartLabels, setChartLabels] = useState(["Accomodation", "Bar", "Hotel", "Tours"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset] });
    const chartReference = useRef();
    const [departmentsList, setDepartmentsList] = useState([]);
    const [deptmentsTotals, setDeptmentsTotals] = useState([]);
    
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/revenue/sources/annual`,
            method: "get"
        }).then(function(response) {
            console.log("GraphRevenueSources: response.data", response.data)
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
            
            response.data.Data.forEach((row, ix) => {
                let month = getMonthOfYear(row.date);
                //if row.department is not yet in dtsets, initialise all its days to zero values
                if(!dtsets[row.department]){
                    dtsets[row.department] = {};
                    let someMonth = firstMonth
                    while(someMonth!==lastMonth){
                        dtsets[row.department][someMonth] = 0;
                        someMonth = yearSequence[someMonth].tomor;
                    }
                    dtsets[row.department][someMonth] = 0;
                }
                let prevvalue = dtsets[row.department][month];
                dtsets[row.department][month] = prevvalue + Number(row.revenue);
            });
            //console.log("dtsets=", JSON.stringify(dtsets));
            
            let departments = Object.keys(dtsets);
            let months = Object.keys(dtsets[departments[0]]);
            
            let departmentsDatasets = departments.map(dp => months.map(m => dtsets[dp][m]) );
            
            console.log("departmentsDatasets=",JSON.stringify(departmentsDatasets));
            
            let totals = departmentsDatasets.map(arr => arr.reduce((a,b) => a+b, 0));
            setDepartmentsList(departments);
            setDeptmentsTotals(totals);
            console.log("totals=",totals);
            
            const chart = chartReference.current;
            chart.data.labels = departments;
            const colors = ["rgb(255, 159, 64)", "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"];
            let backgroundColorsArr = [];
            totals.forEach((dpmtTotal, index) => {
                backgroundColorsArr.push(colors[index % colors.length]);
            });
            
            let generalDataset = {
               label: "Annual Revenue sources", 
               data: totals, 
               backgroundColor: backgroundColorsArr 
            };
            chart.data.datasets[0] = generalDataset;
            
            chart.update();
        },(er)=>{ console.log(er); });
    };
    
    useEffect(() => {
        pullDataFromBackend();
    },[]);
    
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
                    <h5 className="font-bold uppercase text-gray-600">Annual Revenue Sources</h5>
                </div>
                <div className="p-5">
                    <Doughnut ref={chartReference} options={chartOptions} data={chartData} />
                </div>
                <p className="text-base font-light leading-relaxed mt-0 mb-4 text-pink-800" style={{marginLeft:"3%"}}>
                  {departmentsList.map((departmentname, index) => <span> {departmentname}: {deptmentsTotals[index]}, </span>)}
                </p>
            </div>
            
        </div>
    );
  
}


export default GraphRevenueSources;













