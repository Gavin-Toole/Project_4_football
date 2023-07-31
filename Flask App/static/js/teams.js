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
      const tableHeaders = Object.keys(data[0]);
  
      // Create the table header row
      const headerRow = document.createElement("tr");
      tableHeaders.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      teamTable.appendChild(headerRow);
  
      // Create the table rows with data
      data.forEach(rowData => {
        const row = document.createElement("tr");
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
      const tableHeaders = Object.keys(data[0]);
  
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
});