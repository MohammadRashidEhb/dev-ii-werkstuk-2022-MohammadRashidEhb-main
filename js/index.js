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

let role = "all";
let agentsRoles;
function displayAgents(agents) {
  document.getElementById('agentsList').innerHTML = "";

  agentsRoles = [0, 0, 0, 0];

  for(let agent of agents)
      {
        if(agent.role !== null)
        {
         // console.log(agent.role.displayName);
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
        
        // display agent data
        for(let agent of agents)
        {
          if(agent.displayName == this.id)
          {
            //console.log(agent.displayName);
            getAgent(agent);
          }
        }

      });
    }

    //role buttons
    const rolesBtn = document.getElementsByClassName('radioIn');
    for (let roleBtn of rolesBtn) {
      roleBtn.addEventListener('click', function () {
        let agentRole = this.value;
        role = agentRole;
        displayAgents(agents);
        console.log(agentRole);
        
      });
    }
}

// pick agent data to display description
function getAgent(agent) {
  
  let agentDescriptionDiv =document.getElementById('agentDescription');
  agentDescriptionDiv.innerHTML = "";
  agentDescriptionDiv.innerHTML += `
  <div class="agentDescription" style= background-color: rgb(30, 30, 30)>
    <img src="${agent.displayIcon}" alt="${agent.displayName}">
    <h1>Name: ${agent.displayName}</1h>
    <h2>Role: ${agent.role.displayName}</2h>
    <h3>Description: ${agent.description}</3h>
    <h2>Abilities:</2h>
    <ul>
      <li>
       <h1>
       ${agent.abilities[0].displayName} 
       </h1>
       <p> ${agent.abilities[0].description}</p>
      </li>
      <li>
        <h1>
        ${agent.abilities[1].displayName}
        </h1>
        <p> ${agent.abilities[1].description}</p>
      </li>
      <li>
        <h1>
        ${agent.abilities[2].displayName}
        </h1>
        <p> ${agent.abilities[2].description}</p>
      </li>
      <li>
        <h1>
        ${agent.abilities[3].displayName}
        </h1>
        <p> ${agent.abilities[3].description}</p>
      </li>
      
    </ul>
   
  </div>`;

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