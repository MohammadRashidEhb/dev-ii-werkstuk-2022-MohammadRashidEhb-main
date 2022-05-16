"use strict";

export class Agent {
    constructor(name, role, image, description,abilities) {
        this.name = this.getName(name);
        this.role = this.getRole(role);
        this.image = image;
        this.description = this.getDescription(description);
        this.abilities = abilities;
        this.DisplayName = name;
    }

    getName(name) {
        return 'name: ' + name;
    }

    getRole(role) {
        return 'role: ' + role;
     }

    getDescription(description) {
        return 'description: ' + description;
    }
    
}

