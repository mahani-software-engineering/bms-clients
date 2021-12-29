//alert("using-chart.js");
window.onload = function(){
    
  new Chart(document.getElementById("chartjs-7"), {
    "type": "bar",
    "data": {
        "labels": ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
        "datasets": [{
            "label": "Total",
            "data": [10, 20, 30, 40, 38, 48, 44],
            "borderColor": "rgb(255, 99, 132)",
            "backgroundColor": "rgba(255, 99, 132, 0.2)"
        }, {
            "label": "Accomodation",
            "data": [5, 15, 10, 30, 25, 27, 32],
            "type": "line",
            "fill": false,
            "borderColor": "rgb(54, 162, 235)"
        }, {
            "label": "Bar",
            "data": [14, 18, 10, 22, 24, 16, 17],
            "type": "line",
            "fill": false,
            "borderColor": "rgb(54, 162, 64)"
        }]
    },
    "options": {
        "scales": {
            "yAxes": [{
                "ticks": {
                    "beginAtZero": true
                }
            }]
        }
    }
 });
 //=============================================================
 
 new Chart(document.getElementById("chartjs-0"), {
        "type": "line",
        "data": {
            "labels": ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"],
            "datasets": [{
                "label": "Total revenue",
                "data": [65, 59, 80, 81, 56, 55, 66],
                "fill": false,
                "borderColor": "rgb(75, 192, 192)",
                "lineTension": 0.1
            }]
        },
        "options": {}
  });                           
  //=============================================================
    
  new Chart(document.getElementById("chartjs-1"), {
        "type": "bar",
        "data": {
            "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            "datasets": [{
                "label": "Income",
                "data": [65, 59, 66, 81, 56, 55, 40, 65, 59, 70, 81, 80],
                "fill": false,
                "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
                "borderWidth": 1
            }]
        },
        "options": {
            "scales": {
                "yAxes": [{
                    "ticks": {
                        "beginAtZero": true
                    }
                }]
            }
        }
    });  
    //=============================================================
    
    new Chart(document.getElementById("chartjs-4"), {
        "type": "doughnut",
        "data": {
            "labels": ["Accomodation", "Bar", "Hotel", "Tours"],
            "datasets": [{
                "label": "Issues",
                "data": [170, 50, 100, 70],
                "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"]
            }]
        }
    });
    //=============================================================
    
    new Chart(document.getElementById("chartjs-4"), {
        "type": "doughnut",
        "data": {
            "labels": ["Accomodation", "Bar", "Hotel", "Tours"],
            "datasets": [{
                "label": "Issues",
                "data": [170, 50, 100, 70],
                "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(255, 159, 64)"]
            }]
        }
    });
    
                                      
}  //end onload event        











   
            
