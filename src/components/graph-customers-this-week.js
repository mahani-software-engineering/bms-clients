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
    const [chartLabels, setChartLabels] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]);
    const [chartData, setChartData] = useState({labels:chartLabels, datasets: [totalDataset, accomodationDataset, barDataset] });
    
    const [ordersCount, setOrdersCount] = useState(152);
    const [loading, setLoading] = useState(true);
    const [errorFromBackend, setErrorFromBackend] = useState("server error");
    const [responseStatus, setResponseStatus] = useState(200);
    const chartReference = useRef();
      
    const pullDataFromBackend = () => {
        axios({
            url: `/statistics/customers/thisweek`,
            method: "get"
        }).then(function(response) {
            setLoading(false);
            if(response.status === 200){
                console.log("GraphCustomersThisWeek: response.data", response.data);
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
                    dtsets[row.department][day] = prevvalue + Number(row.number);
                });
                
                let departments = Object.keys(dtsets);
                let days = Object.keys(dtsets[departments[0]]);
                
                let daysDatasets = days.map(dy => departments.map(dp => dtsets[dp][dy]) );
                let departmentsDatasets = departments.map(dp => days.map(dy => dtsets[dp][dy]) );
                
                let totals = daysDatasets.map(arr => arr.reduce((a,b) => a+b, 0));
                
                const chart = chartReference.current;
                chart.data.datasets[0].data = totals;
                chart.data.labels = days;
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
                    <h5 className="font-bold text-gray-600">Customers ({getMonthAndDate(-7)} - {getMonthAndDate()})</h5>
                </div>
                <div className="p-5">
                    <Bar ref={chartReference} options={chartOptions} data={chartData} />
                </div>
            </div>
            
        </div>
    );
  
}


export default GraphCustomersThisWeek;













