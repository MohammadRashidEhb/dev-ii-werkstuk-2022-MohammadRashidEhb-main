"use strict";

const app = {
  init: function () {

    fetch('https://valorant-api.com/v1/agents')
    .then(response => {
    return response.json();
    }).then(data => {

     
    //Displays the agents
     displayAgents(data.data);
     //add chart to the page
     chartTable();
    }).catch(err => {
    //log the error
    console.log(err);
   });

  }

};

var role = "all";
var agentsRoles = [0, 0, 0, 0];
function displayAgents(agents) {
  document.getElementById('agentsList').innerHTML = "";

  for(let agent of agents)
      {
        if(agent.role !== null)
        {
          console.log(agent.role.displayName);
          if(agent.role.displayName === "Duelist")
          {
            agentsRoles[0]++
          }else if(agent.role.displayName === "Initiator")
          {
            agentsRoles[1]++
          }else if(agent.role.displayName === "Sentinel")
          {
            agentsRoles[2]++
          } else if(agent.role.displayName === "Controller")
          {
            agentsRoles[3]++
          }
          console.log(agentsRoles);
        }
             
        //console.log(agent.displayName); 
        if (agent.role == null) 
        { 
          console.log(undefined);
        }
        else if (role == 'all') {
          document.getElementById('agentsList').innerHTML += `
        <div class="agent" id=${agent.displayName}>
          <img src="${agent.displayIcon}" alt="${agent.displayName}">
          <h1>${agent.displayName}</1h>
        </div>
        `;
        }
        
        else if (agent.role.displayName.toLowerCase() == role.toLowerCase()) {
          document.getElementById('agentsList').innerHTML += `
        <div class="agent" id=${agent.displayName}>
          <img src="${agent.displayIcon}" alt="${agent.displayName}">
          <h1>${agent.displayName}</1h>
        </div>
        `;
        }

    }

    //add event listener to the agents
    const agentsBtn = document.getElementsByClassName('agent');
    for (let agentBtn of agentsBtn) {
      agentBtn.addEventListener('click', function () {
        console.log(this.id);
        
      });
    }
}

//make a chart table of the agents displayName
function chartTable() {
  
  const data = {
  labels: [
    "Duelist",
    "Initiator",
    "Sentinel",
    "Controller",
  ],
  datasets: [{
    label: 'My First Dataset',
    data: [agentsRoles[0], agentsRoles[1], agentsRoles[2], agentsRoles[3]],
    backgroundColor: [
      'rgba(255, 99, 132)',
      'rgba(255, 159, 64)',
      'rgba(255, 205, 86)',
      'rgba(75, 192, 192)'
    ]
  }]
 };

 const config = {
  type: 'bar',
  data: data
  };
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}
app.init();