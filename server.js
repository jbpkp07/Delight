"use strict";

const port = process.env.PORT || 3000;

const terminal = require("terminal-kit").terminal;
const express = require("express");
const expressHandlebars = require("express-handlebars");
const HTTP = require("http");

const configPaths = require("./config/configPaths.js");
const header = require(configPaths.printHeaderFunctionsPath);
const DelightDatabase = require(configPaths.delightDatabasePath);
const APIroutes = require(configPaths.apiRoutesPath);
const HTMLroutes = require(configPaths.htmlRoutesPath);
const DelightChatRooms = require(configPaths.delightChatRoomsPath);

const delightDatabase = new DelightDatabase();
const apiRoutes = new APIroutes(delightDatabase);
const htmlRoutes = new HTMLroutes(delightDatabase);

const expressApp = express();

expressApp.use(express.static(configPaths.publicAssetsPath));
expressApp.use(express.urlencoded({ extended: true }));
expressApp.use(express.json());
expressApp.use(apiRoutes.router);
expressApp.use(htmlRoutes.router);

expressApp.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
expressApp.set("view engine", "handlebars");

const http = HTTP.createServer(expressApp);

delightDatabase.connect().then(() => {

    header.printHeader();

    const delightChatRooms = new DelightChatRooms(http, delightDatabase);

    delightChatRooms.assignChatRoomsSockets().then(() => {
        
        http.listen(port, () => {

            terminal.white("  Webserver listening on port ► ").brightGreen(port + "\n\n");
        });

    }).catch((error) => {
        
        terminal.red(error);
    });

}).catch((error) => {

    terminal.red(error);
});
