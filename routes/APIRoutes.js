"use strict";

const terminal = require("terminal-kit").terminal;
const express = require("express");


class APIroutes {

    constructor(delightDatabase) {

        this.delightDatabase = delightDatabase;

        this.router = express.Router();

        this.assignRouteListeners();
    }

    assignRouteListeners() {

        this.getAPIDelightMessagesByRoomId();

        this.postAPIDelightLoginOrSignUp();
    }

    getAPIDelightMessagesByRoomId() {

        this.router.get("/api/delight/messages/:id", (request, response) => {

            const id = request.params.id;

            this.delightDatabase.getMessagesForRoom(id).then((messages) => {
                
                response.json(messages);

            }).catch((error) => {
                
                terminal.red(`${error}\n`);

                response.status(404).send(`${error}\n`);   //RoomId not found
            });
        });
    }

    postAPIDelightLoginOrSignUp() {

        this.router.post("/api/delight/login", (request, response) => {

            const creds = request.body;

            if (creds.isSignUp === "true") {
    
                this.delightDatabase.signUp(creds).then((interestsRooms) => {

                    response.json(interestsRooms);

                }).catch((error) => {
                    
                    terminal.red(`${error}\n`);

                    response.status(409).send(`${error}\n`);  //Conflict: User name already exists
                });
            }
            else  {
       
                this.delightDatabase.login(creds).then((interestsRooms) => {

                    response.json(interestsRooms);

                }).catch((error) => {
                    
                    terminal.red(`${error}\n`);

                    response.status(401).send(`${error}\n`);   //Unauthorized (bad username or password)
                });
            }
        });
    }
}


module.exports = APIroutes;