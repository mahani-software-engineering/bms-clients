/*
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

import {Chart, Line, Bar, Doughnut, Pie, Radar } from 'react-chartjs-2';

ChartJS.register(Chart, Line, Bar, Doughnut, Pie, Radar, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
*/

import React, { useState, useRef, useEffect } from "react";
import axios from "axios"
import { BACKEND_URL } from "./globals";
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

function GraphRevenueSourcesThisWeek() {
    const [chartOptions, setChartOptions] = useState({
                                                       responsive:true,
                                                       plugins: { 
                                                         legend:{position:"top"}, 
                                                         title:{display:false, text:"Customers this week"}
                                                       }
                                                    });
                                                    
    const [totalData, setTotalData] = useState([110, 80, 45, 70]);
    const [totalDataset, setTotalDataset] = useState({label: "Revenue sources this week", data: totalData,
    backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"] });
    //-------------- 
    const [chartLabels, setChartLabels] = useState(["Accomodation", "Bar", "Hotel", "Tours"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset] });
    const chartReference = useRef();
    const [departmentsList, setDepartmentsList] = useState([]);
    const [deptmentsTotals, setDeptmentsTotals] = useState([]);
    
    
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/revenue/sources/thisweek`,
            method: "get"
        }).then(function(response) {
            console.log("GraphRevenueSourcesThisWeek: response.data", response.data)
            const weekSequence = {
                Mon: {yest:"Sun", tomor:"Tue"},
                Tue: {yest:"Mon", tomor:"Wed"},
                Wed: {yest:"Tue", tomor:"Thu"},
                Thu: {yest:"Wed", tomor:"Fri"},
                Fri: {yest:"Thu", tomor:"Sat"},
                Sat: {yest:"Fri", tomor:"Sun"},
                Sun: {yest:"Sat", tomor:"Mon"}
            };
            let dtsets = {};
            
            let today = new Date();
            let dx = new Date(); 
            dx.setDate(dx.getDate() - 7);
            let date7daysAgo = new Date(dx.toString());
            
            let firstDay = getDayOfWeek(date7daysAgo.getDay()+1);
            let lastDay  = getDayOfWeek(today.getDay());
            
            response.data.Data.forEach((row, ix) => {
                let day = getDayOfWeek(row.date);
                //if row.department is not yet in dtsets, initialise all its days to zero values
                if(!dtsets[row.department]){
                    dtsets[row.department] = {};
                    let someDay = firstDay
                    while(someDay!==lastDay){
                        dtsets[row.department][someDay] = 0;
                        someDay = weekSequence[someDay].tomor;
                    }
                    dtsets[row.department][someDay] = 0;
                }
                let prevvalue = dtsets[row.department][day];
                dtsets[row.department][day] = prevvalue + Number(row.revenue);
            });
            
            let departments = Object.keys(dtsets);
            let days = Object.keys(dtsets[departments[0]]);
            
            let departmentsDatasets = departments.map(dp => days.map(dy => dtsets[dp][dy]) );
            
            let totals = departmentsDatasets.map(arr => arr.reduce((a,b) => a+b, 0));
            setDepartmentsList(departments);
            setDeptmentsTotals(totals);
            
            const chart = chartReference.current;
            chart.data.labels = departments;
            const colors = ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"];
            let backgroundColorsArr = [];
            totals.forEach((dpmtTotal, index) => {
                backgroundColorsArr.push(colors[index % colors.length]);
            });
            
            let generalDataset = {
               label: "Revenue sources this week", 
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
    
    return (
        <div className="w-full md:w-1/2 xl:w-1/3 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold uppercase text-gray-600">Revenue Sources this week</h5>
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


export default GraphRevenueSourcesThisWeek;













