// code to dynamically create dropdown options
var leagueNames = ['EPL', 'Bundesliga', 'LaLiga', 'Ligue1', 'SerieA']
d3.select('#selDataset')   // select 'select' element from html with id = 'selDataset
    .selectAll('option')
    .data(leagueNames)
    .enter()
    .append('option')
    .attr('value', value => value)
    .text(value => value)

// create function to make the overall teams performance table

function teamTable(league) {
    // Get data for team performance
    d3.json(`/api/satisfaction_table/${league}`).then(data => {
    console.log(data)   

    let teamName = data.map(row => row.Squad)
    console.log(teamName)

      
    data.sort((a, b) => b.Points - a.Points);

    

    const teamTable = document.getElementById("team-table");
      teamTable.innerHTML = ""; // Clear previous data
      // const tableHeaders = Object.keys(data[0]);

      const tableHeaders = [
        'Squad',
        'Wins',
        'Draws',
        'Losses',
        'Points',
        'Goals_For',
        'Goals_Against',
        'Goal_Differential',
        'Possession',
        'Wages'
      ];
  
      // Create the table header row
      const headerRow = document.createElement("tr");

      headerRow.classList.add("header-row");
    
      tableHeaders.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      teamTable.appendChild(headerRow);
  
      // Create the table rows with data
      data.forEach(rowData => {
        const row = document.createElement("tr");

        if (rowData.Points >= 75) {
          row.classList.add("green-row");
        } else if (rowData.Points >= 25 && rowData.Points < 75) {
          row.classList.add("yellow-row");
        } else {
          row.classList.add("red-row");
        };
  
        tableHeaders.forEach(header => {
          const cell = document.createElement("td");
          cell.textContent = rowData[header];
          row.appendChild(cell);
        });
        teamTable.appendChild(row);
      });     

    // create team dropdown options

    const dropdown = document.getElementById("Teams");
    dropdown.innerHTML = ""; // Clear previous data
    
   
    d3.select('#Teams')   // select 'select' element from html with id = 'selDataset
    .selectAll('option')
    .data(teamName)
    .enter()
    .append('option')
    .attr('value', value => value)
    .text(value => value)
    });
    }

// create function to make the overall team prediction table

function predTable(team) {
    // Get data for predictions
    d3.json(`/api/cluster_table/${team}`).then(data => {
      console.log(data)
      const clusterTable = document.getElementById("cluster-table");
      clusterTable.innerHTML = ""; // Clear previous data
      // const tableHeaders = Object.keys(data[0]);

      const tableHeaders = [
        'Feature',
        'Predicted Performance',
        'Top Team Performance',
        'Percent Gap'
      ];
  
      // Create the table header row
      const headerRow = document.createElement("tr");
      tableHeaders.forEach(header => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
      });

      clusterTable.appendChild(headerRow);
  
      // Create the table rows with data
      data.forEach(rowData => {
        const row = document.createElement("tr");
        tableHeaders.forEach(header => {
          const cell = document.createElement("td");
          cell.textContent = rowData[header];
          row.appendChild(cell);
        });
        clusterTable.appendChild(row);
      });
    });
};


// creating function to plot Bullet chart using plotly

function bulletChart(team) {

  d3.json(`/api/bubble_chart/${team}`).then(data => {
  console.log(data);
  
  let clusterLabel = [];
  clusterLabel =  data.map(row => row['cluster_label'])  
  console.log(clusterLabel);

  console.log(data[0]['Points'])
  console.log(data[5]['Points'])

//   let points = [];
//   data.forEach(row => {
//   let point = row['Points']
//   points.push(point)
//   }); 
//   console.log(points);

//   let sortedPoints = points.sort((a, b) => a - b);
//   console.log(sortedPoints)

//   let wins = [];
//   data.forEach(row => {
//     let win = row['Wins']
//     wins.push(win)
//     });
//   console.log(wins);

//   let sortedWins = wins.sort((a, b) => a - b);
  
//   let goalsFor = []
//   data.forEach(row => {
//     let goalF = row['Goals_For']
//     goalsFor.push(goalF)
//     });
//   console.log(goalsFor);


//   let sortedGoalsFor = goalsFor.sort((a, b) => a - b);

//   let goalsAgainst = [];
//   data.forEach(row => {
//     let goalA = row['Goals_Against']
//     goalsAgainst.push(goalA)
//     }); 
//   console.log(goalsAgainst);

//   let sortedGoalsAgainst = goalsAgainst.sort((a, b) => a - b)

// //   // removing h4 from the bubble-container if any

// //   d3.select('.bubble-container').select('h4').remove();

// //   // clearing existing plotly chart

//   Plotly.purge('bubble-chart');

// //   if (clusterLabel[0] === "1st") {
// //   const h4Element = document.createElement("h4");
// //   h4Element.innerHTML = "I am Top of the League<br>Catch Me If You Can";

// //   const h4container = document.getElementById("bubble-container");
// //   h4container.appendChild(h4Element);
// //   } else {
  var chartData = [
    {
      type: "indicator",
      mode: "number+gauge+delta",
      value: data[0]['Points'],
      // value: points[0],
      delta: { reference: data[5]['Points']},
      domain: { x: [0.25, 1], y: [0.05, 0.20] },
      title: { text: "Points" },
      gauge: {
        shape: "bullet",
        axis: { range: [null, data[5]['Points']+10] },
        // threshold: {
        //   line: { color: "black", width: 2 },
        //   thickness: 0.75,
        //   value: 170
        // },
        // steps: [
        //   { range: [0, sortedPoints[0]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedPoints[0], sortedPoints[1]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedPoints[1], sortedPoints[2]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedPoints[2], sortedPoints[3]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedPoints[3], sortedPoints[4]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedPoints[4], sortedPoints[5]], color: "white", line: {color: "black",  width: 2}}           
        // ],
        bar: { color: "black" }
      }
    },
    {
      type: "indicator",
      mode: "number+gauge+delta",
      value: data[0]['Wins'],
      // value: wins[0],
      delta: { reference: data[5]['Wins']},
      domain: { x: [0.25, 1], y: [0.35, 0.5] },
      title: { text: "Wins" },
      gauge: {
        shape: "bullet",
        axis: { range: [null, data[5]['Wins']+5] },
        // threshold: {
        //   line: { color: "black", width: 2 },
        //   thickness: 0.75,
        //   value: 170
        // },
        // steps: [
        //   { range: [0, sortedWins[0]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedWins[0], sortedWins[1]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedWins[1], sortedWins[2]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedWins[2], sortedWins[3]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedWins[3], sortedWins[4]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedWins[4], sortedWins[5]], color: "white", line: {color: "black",  width: 2}}           
        // ],
        bar: { color: "black" }
      }
    },
    {
      type: "indicator",
      mode: "number+gauge+delta",
      value: data[0]['Goals_For'],
      // value: goalsFor[0],
      delta: { reference: data[5]['Goals_For']},
      domain: { x: [0.25, 1], y: [0.6, 0.75] },
      title: { text: "Goals For" },
      gauge: {
        shape: "bullet",
        axis: { range: [null, data[5]['Goals_For']+10] },
        // threshold: {
        //   line: { color: "black", width: 2 },
        //   thickness: 0.75,
        //   value: 170
        // },
        // steps: [
        //   { range: [0, sortedGoalsFor[0]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsFor[0], sortedGoalsFor[1]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsFor[1], sortedGoalsFor[2]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsFor[2], sortedGoalsFor[3]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsFor[3], sortedGoalsFor[4]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsFor[4], sortedGoalsFor[5]], color: "white", line: {color: "black",  width: 2}}           
        // ],
        bar: { color: "black" }
      }
    },
    {
      type: "indicator",
      mode: "number+gauge+delta",
      value: data[0]['Goals_Against'],
      // value: goalsAgainst[0],
      delta: { reference: data[5]['Goals_Against']},
      domain: { x: [0.25, 1], y: [0.85, 1] },
      title: { text: "Goals Against" },
      gauge: {
        shape: "bullet",
        axis: { range: [null, data[5]['Goals_Against']+10] },
        // threshold: {
        //   line: { color: "black", width: 2 },
        //   thickness: 0.75,
        //   value: 170
        // },
        // steps: [
        //   { range: [0, sortedGoalsAgainst[0]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsAgainst[0], sortedGoalsAgainst[1]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsAgainst[1], sortedGoalsAgainst[2]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsAgainst[2], sortedGoalsAgainst[3]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsAgainst[3], sortedGoalsAgainst[4]], color: "white", line: {color: "black",  width: 2}},
        //   { range: [sortedGoalsAgainst[4], sortedGoalsAgainst[5]], color: "white", line: {color: "black",  width: 2}}           
        // ],
        bar: { color: "black" }
      }
    }
  ];

  var layout = {
    width: 700, height: 250,
    margin: { t: 10, r: 25, l: 25, b: 10 },
    // xaxis: {
    //   tickvals: [
    //     [0, sortedPoints[0],sortedPoints[1],sortedPoints[2],sortedPoints[3],sortedPoints[4],sortedPoints[5] ],
    //     [0, sortedWins[0],sortedWins[1],sortedWins[2],sortedWins[3],sortedWins[4],sortedWins[5]],
    //     [0, sortedGoalsFor[0],sortedGoalsFor[1],sortedGoalsFor[2],sortedGoalsFor[3],sortedGoalsFor[4],sortedGoalsFor[5]],
    //     [0, sortedGoalsAgainst[0], sortedGoalsAgainst[1], sortedGoalsAgainst[2], sortedGoalsAgainst[3], sortedGoalsAgainst[4], sortedGoalsAgainst[5]]
    //   ],
    //   ticktext: [
    //     [0, sortedPoints[0],sortedPoints[1],sortedPoints[2],sortedPoints[3],sortedPoints[4],sortedPoints[5] ],
    //     [0, sortedWins[0],sortedWins[1],sortedWins[2],sortedWins[3],sortedWins[4],sortedWins[5]],
    //     [0, sortedGoalsFor[0],sortedGoalsFor[1],sortedGoalsFor[2],sortedGoalsFor[3],sortedGoalsFor[4],sortedGoalsFor[5]],
    //     [0, sortedGoalsAgainst[0], sortedGoalsAgainst[1], sortedGoalsAgainst[2], sortedGoalsAgainst[3], sortedGoalsAgainst[4], sortedGoalsAgainst[5]]
    //   ]
    // }
  };

  Plotly.newPlot('bubble-chart', chartData, layout);
// // }

})
};

// Initialize the table with default league EPL

teamTable('EPL');

// event listener and function to call when event listener is triggered

d3.selectAll('#selDataset').on('change', function () {
    console.log(this.value);
    teamTable(this.value); 
    const clusterTable = document.getElementById("cluster-table");
    clusterTable.innerHTML = ""

});

d3.selectAll('#Teams').on('change', function () {
    console.log(this.value);
    predTable(this.value); 
    bulletChart(this.value);
});