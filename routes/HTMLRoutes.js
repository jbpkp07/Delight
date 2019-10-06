"use strict";

const terminal = require("terminal-kit").terminal;
const express = require("express");
const configPaths = require("../config/configPaths.js");


class HTMLroutes {

    constructor(delightDatabase) {

        this.delightDatabase = delightDatabase;

        this.router = express.Router();

        this.assignRouteListeners();
    }

    assignRouteListeners() {

        this.getHomePage();

        this.getAboutPage();
    }

    getHomePage() {

        this.router.get("/", (request, response) => {

            response.sendFile(configPaths.indexHTMLPath);
        });
    }

    getAboutPage() {

        this.router.get("/about", (request, response) => {
   
            response.sendFile(configPaths.aboutHTMLPath);
        });
    }
}


module.exports = HTMLroutes;