"use strict";

import { Agent } from "./class.js";

const agentsList= [];

let counter = -1;
const app = {
  
  init: function () {
    fetch('https://valorant-api.com/v1/agents')
    .then(response => {
    return response.json();
    }).then(data => {

      for(let agent of data.data)
      {
        if(agent.role !== null)
        {
          counter++;
          agentsList[counter] = new Agent(agent.displayName, agent.role.displayName, 
            agent.displayIcon, agent.description, agent.abilities);
          
        }
        
      }
     
    //Displays the agents
     displayAgents(agentsList);
     //add chart to the page
     chartTable();
    }).catch(err => {
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
        
         // console.log(agent.role.displayName);
          if(agent.role.includes("Duelist"))
          {
            agentsRoles[0]++
          }else if(agent.role.includes("Initiator"))
          {
            agentsRoles[1]++
          }else if(agent.role.includes("Sentinel"))
          {
            agentsRoles[2]++
          } else if(agent.role.includes("Controller"))
          {
            agentsRoles[3]++
          }
         
       
        //console.log(agent.displayName); 
        
         if (role == 'all') {
         // console.log(agent);
          document.getElementById('agentsList').innerHTML += `
         <div class="agent" id=${agent.DisplayName}>
          <img src="${agent.image}" alt="${agent.name}">
          <h1>${agent.DisplayName}</1h>
        </div>
        `;
        }
        
        else if (agent.role.toLowerCase().includes(role.toLowerCase()) ) {
          document.getElementById('agentsList').innerHTML += `
          <div class="agent" id=${agent.DisplayName}>
          <img src="${agent.image}" alt="${agent.name}">
          <h1>${agent.DisplayName}</1h>
        </div>
        `;
        }
      
    }

    //add event listener to the agents
    const agentsBtn = document.getElementsByClassName('agent');
    for (let agentBtn of agentsBtn) {
      agentBtn.addEventListener('click', function () {
        //console.log(this.id);
        
        //display agent data
        for(let agent of agentsList)
        {
             
          if(agent.DisplayName == this.id)
          {
            console.log(this.id);    
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
  
  console.log(agent);
  
  let agentDescriptionDiv =document.getElementById('agentDescription');
  agentDescriptionDiv.innerHTML = "";
  agentDescriptionDiv.innerHTML += `
  <div class="agentDescription" >
    <img src="${agent.image}" alt="${agent.displayName}">
    <h1>${agent.name}</1h>
    <h2>${agent.role}</2h>
    <h3>${agent.description}</3h>
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
    label: "" ,
    data: [agentsRoles[0], agentsRoles[1], agentsRoles[2], agentsRoles[3]],
    backgroundColor: [
      'rgba(255, 99, 132)',
      'rgba(255, 159, 64)',
      'rgba(255, 205, 86)',
      'rgba(75, 192, 192)'
    ],
    borderColor: [
      'rgba(255, 99, 132)',
      'rgba(255, 159, 64)',
      'rgba(255, 205, 86)',
      'rgba(75, 192, 192)'
    ],
    borderWidth: 1
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