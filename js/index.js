"use strict";

const role = "Sentinel";

const app = {
    init: function () {
        fetch('https://valorant-api.com/v1/agents')
            .then(response => {
                return response.json();
            }).then(data => {
                //Shows the agents
                displayAgents(data.data);
            });
    }
};

function displayAgents(agents) {
    document.getElementById('agentsLineup').innerHTML = "";
    for (let agent of agents) {
        console.log(agent.displayName);
        if (role == "all") {
            document.getElementById('agentsLineup').innerHTML += `
        <div class="agent" id=${agent.displayName}>
          <img src="${agent.displayIcon}" alt="${agent.displayName}">
          <h1>${agent.displayName}</1h>
        </div>
        `;
        } else if (agent.role == null) {
            console.log(undefined);
        } else if (agent.role.displayName) {
            document.getElementById('agentsLineup').innerHTML += `
        <div class="agent" id=${agent.displayName}>
          <img src="${agent.displayIcon}">
          <h1>${agent.displayName}</1h>
        </div>
        `;
        }
    }
}
app.init();