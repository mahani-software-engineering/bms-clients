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
    const chartReference = useRef();
      
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/revenue/thisweek`,
            method: "get"
        }).then(function(response) {
            if(response.status === 200){
                console.log("GraphRevenueThisWeek: response.data", response.data)
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
                
                let allValues = days.map(dy => departments.map(dp => dtsets[dp][dy]) );
                let departmentsDatasets = departments.map(dp => days.map(dy => dtsets[dp][dy]) );
                
                let totals = allValues.map(arr => arr.reduce((a,b) => a+b, 0));
                
                const chart = chartReference.current;
                chart.data.datasets[0].data = totals;
                chart.data.labels = days;
                /*
                const colors = ["rgb(54, 162, 235)", "rgb(54, 162, 64)", "rgb(14, 100, 64)"];
                
                departmentsDatasets.forEach((dpmtData, index) => {
                    let dpmtDataset = { 
                      type: "line", 
                      label: departments[index], 
                      data: dpmtData, 
                      fill: false, 
                      borderColor: colors[index % colors.length], 
                      order: index+2 
                    }
                    chart.data.datasets[index+1] = dpmtDataset;
                });
                */
                
                chart.update();
            }
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
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        //eg. dateString = "2021-12-31 00:00:00.000"
        if(!isNaN(dateString)){
           return monthNames[dateString];
        }
        const d = new Date(dateString);
        let month = d.getMonth();
        return monthNames[month];
    }
    
    function getSuperscript(num){
        let numInStr = `${num}`;
        return (numInStr.endsWith("1") && (!numInStr.endsWith("11"))) ? "st" : (numInStr.endsWith("2") && (!numInStr.endsWith("12"))) ? "nd" : (numInStr.endsWith("3") && (!numInStr.endsWith("13"))) ? "rd" : "th";
    }
    function getMonthAndDate(offset=0, duration="days"){
        let today = new Date();
        let dx = new Date();
        switch (duration) {
            case "days":
               if(!offset){
                   let todate = today.getDate();
                   let seperscript = getSuperscript(todate);
                   let month = getMonthOfYear(today.getMonth());
                   return `${month} ${todate}${seperscript}`;
               }else{
                   dx.setDate(dx.getDate() + offset);
                   let dateDaysAgo = new Date(dx.toString());
                   let odate = dateDaysAgo.getDate()+1;
                   let seperscript = getSuperscript(odate);
                   let month = getMonthOfYear(dateDaysAgo.getMonth());
                   return `${month} ${odate}${seperscript}`;
               }
               break;
            case "months":
               if(!offset){
                   let todate = today.getDate();
                   let seperscript = getSuperscript(todate);
                   let month = getMonthOfYear(today.getMonth());
                   return `${month} ${todate}${seperscript}`;
               }else{
                   dx.setDate(dx.getMonth() + offset);
                   let dateMonthsAgo = new Date(dx.toString());
                   let odate = dateMonthsAgo.getDate();
                   let seperscript = getSuperscript(odate);
                   let month = getMonthOfYear(today.getMonth());
                   return `${month} ${odate}${seperscript}`;
               }
            default:
               let todate = today.getDate();
               let seperscript = getSuperscript(todate);
               let month = getMonthOfYear(today.getMonth());
               return `${month} ${todate}${seperscript}`;
        }
    }
    
    return (
        <div className="w-full md:w-1/2 p-3">
            
            <div className="bg-white border rounded shadow">
                <div className="border-b p-3">
                    <h5 className="font-bold text-gray-600">Revenue ({getMonthAndDate(-7)} - {getMonthAndDate()})</h5>
                </div>
                <div className="p-5">
                    <Line ref={chartReference} options={chartOptions} data={chartData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphRevenueThisWeek;













