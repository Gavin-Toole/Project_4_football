
// code to dynamically create dropdown options
var leagueNames = ['EPL', 'Bundesliga', 'LaLiga', 'Ligue1', 'SerieA']
d3.select('#selDataset')   // select 'select' element from html with id = 'selDataset
    .selectAll('option')
    .data(leagueNames)
    .enter()
    .append('option')
    .attr('value', value => value)
    .text(value => value)


// Create the createMarkers function.
function createMarkers(myData) {
  
  let stadiums = myData.features

  // Initialize an array to hold the Stadium markers.
  let stadiumMarkers = []
 

  // Loop through the stadiums array.
  for (let i = 0; i < stadiums.length; i++) {
    let stadium = stadiums[i]
    console.log(stadium)
    let stadCoords = [stadium.geometry.coordinates[0], stadium.geometry.coordinates[1]]
    

    let soccerIcon = L.icon({
      iconUrl: '../static/football_marker.png',
      iconSize: [30, 30], // Adjust the size of the icon as needed
    });


    // For each Stadium, create a marker, and bind a popup with the Stadiums's details.
    let stadiumMarker = L.marker((stadCoords), { icon: soccerIcon }).bindPopup(`<h5>Name: ${stadium.properties.stadium_name}</h5><hr>\
    <h6>Team: ${stadium.properties.squad_name}</h6><hr>Capacity: ${stadium.properties.capacity}<hr>Fact: ${stadium.properties.stadium_fact}`).openPopup()

    stadiumMarkers.push(stadiumMarker)
  }
  
  console.log(stadiumMarkers)

  return L.layerGroup(stadiumMarkers)

}


// function to create leaflet map
var myMap;
function updateLeaflet(league) {
 
  if(myMap) {
    myMap.remove();
  }
  
  switch (league) {
    case "EPL":
      myMap = L.map("map-id").setView([52.3555, 1.1743], 6);
      break;
    case "Bundesliga":
      myMap = L.map("map-id").setView([50.1109, 8.6821], 6);    
      break;
    case "LaLiga":
      myMap = L.map("map-id").setView([40.4168, 3.7038], 6);  
      break;  
    case "Ligue1":
      myMap = L.map("map-id").setView([46.2276, 2.2137], 6);      
      break;
    case "SerieA":
      myMap = L.map("map-id").setView([41.8719, 12.5674], 6);    
      break;
  }

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  url = "/api/stadiums/" + league
  d3.json(url).then(data => {
  response = data
  let stadiumGroup = createMarkers(response)
  stadiumGroup.addTo(myMap)
})
}
// create sunburst chart function

function updateSunburst(league) {
  url = "/api/goals/" + league

  d3.json(url).then(data => {
  console.log(data)
  
  let dataSunburst = [{
    type: "sunburst",
    labels: data.labels,
    parents: data.parents,
    values: data.values,
    outsidetextfont: { size: 20, color: "#377eb8" },
    // leaf: {opacity: 0.4},
    marker: { line: { width: 2 } },
  }];

  let layoutSunburst = {
    title: 'Total Goals by Teams and Top 2 players in the teams',
    // width: 800,
    height: 600
  }

  Plotly.newPlot('sunburst', dataSunburst, layoutSunburst)//, sunlayout);

})
}

// Create bar + line chart

function updateBarLine(league) {
  url = "/api/wages/points/" + league
  d3.json(url).then(data => {
    console.log(data)
    let leagueWagePoints = data

    let xPoints = leagueWagePoints.points.slice(0, 6); // avg points for all the seasons for top 6 teams
    let xWage = leagueWagePoints.avg_wage.slice(0, 6); // avg wage for all the seasons for top 6 teams
    let yLabels = leagueWagePoints.squad_name.slice(0, 6); // Top 6 team labels

    for (let i = 0; i < xPoints.length; i++) {
      xPoints[i] = xPoints[i].toFixed(2)
    }
    let colorMarker;
    let colorMarkerLine;

    if (leagueWagePoints.league === 'EPL') {
      colorMarker = 'rgba(204,0,0,0.6)'
      colorMarkerLine = 'rgba(204,0,0,1.0)'
    } else if (leagueWagePoints.league === 'Bundesliga') {
      colorMarker = 'rgba(255,204,0,0.6)'
      colorMarkerLine = 'rgba(255,204,0,1.0)'
    } else if (leagueWagePoints.league === 'SerieA') {
      colorMarker = 'rgba(0,146,70,0.6)'
      colorMarkerLine = 'rgba(0,146,70,1.0)'
    } else if (leagueWagePoints.league === 'LaLiga') {
      colorMarker = 'rgba(170,0,0,0.6)'
      colorMarkerLine = 'rgba(170,0,0,1.0)'
    } else if (leagueWagePoints.league === 'Ligue1') {
      colorMarker = 'rgba(0,35,150,0.6)'
      colorMarkerLine = 'rgba(0,35,150,1.0)'
    }

    let traceBar = {
      x: xPoints,
      y: yLabels,
      xaxis: 'x1',
      yaxis: 'y1',
      type: 'bar',
      marker: {
        color: colorMarker,  // color based on league
        line: {
          color: colorMarkerLine,
          width: 1
        }
      },
      name: 'Points',
      orientation: 'h'
    };

    let traceLine = {
      x: xWage,
      y: yLabels,
      xaxis: 'x2',
      yaxis: 'y1',
      mode: 'lines+markers',
      line: {
        color: colorMarker //  color based on league
      },
      name: 'Wage in USD Million'
    };
    var data = [traceBar, traceLine];

    let layoutBarLine = {
      title: 'Average Points and Wage for top 6 teams in 5 seasons(2017-2022)',
      xaxis1: {
        range: [Math.min(xPoints) - 10, Math.max(xPoints) + 10],
        domain: [0, 0.5],
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true
      },
      xaxis2: {
        range: [Math.min(xWage) - 20, Math.max(xWage) + 20],
        domain: [0.5, 1],
        zeroline: false,
        showline: false,
        showticklabels: true,
        showgrid: true,
        side: 'top',
        dtick: 20
      },
      legend: {
        x: 0.029,
        y: 1.238,
        font: {
          size: 10
        }
      },
      margin: {
        l: 100,
        r: 20,
        t: 200,
        b: 70
      },
      // width: 800,
      height: 600,
      // paper_bgcolor: 'rgb(248,248,255)',
      // plot_bgcolor: 'rgb(248,248,255)',
      annotations: []
    };

    for (let i = 0; i < xPoints.length; i++) {
      let result1 = {
        xref: 'x1',
        yref: 'y1',
        x: xPoints[i] + 10,
        y: yLabels[i],
        text: xPoints[i],
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(128,128,128)'
        },
        showarrow: false,
      };
      let result2 = {
        xref: 'x2',
        yref: 'y1',
        x: xWage[i] + 15,
        y: yLabels[i],
        text: xWage[i] + 'M',
        font: {
          family: 'Arial',
          size: 12,
          color: 'rgb(128,128,128)'
        },
        showarrow: false
      };
      layoutBarLine.annotations.push(result1, result2);
    }

    Plotly.newPlot('barline', data, layoutBarLine);
  })
}


// Populate charts for the default league value EPL when page loads
updateLeaflet("EPL");
updateBarLine("EPL"); 
updateSunburst("EPL");

// event handler on selection drop down option

d3.selectAll('#selDataset').on('change', function () {
  console.log(this.value);
  updateLeaflet(this.value);
  updateBarLine(this.value);
  updateSunburst(this.value); 
})


