"use strict";

const socketIO = require("socket.io");


class DelightChatRooms {

    constructor(http, delightDatabase) {

        this.io = socketIO(http);

        this.namespace = this.io.of(`/delight/chat`);

        this.delightDatabase = delightDatabase;

        this.chatRoomNames = [];
    }

    assignChatRoomNames() {

        return new Promise((resolve, reject) => {
           
            this.delightDatabase.getAllChatRoomNames().then((rooms) => {
                
                this.chatRoomNames = rooms;

                resolve();
    
            }).catch((error) => {
                
                reject(error);
            });
        });
    }

    assignChatRoomsSockets() {

        return new Promise((resolve, reject) => {
            
            this.assignChatRoomNames().then(() => {

                this.namespace.on("connection", (socket) => {
        
                    for (const room of this.chatRoomNames) {
                    
                        socket.on(room, (message) => {
        
                            if (message.isJoinLeave === false) {

                                this.delightDatabase.saveNewMessage(message);  //No promise returned. Just save it while chat messages flow between users.
                            }

                            this.namespace.emit(room, message);
                        });
                    }
                });

                resolve();

            }).catch((error) => {
                
                reject(error);
            });
        });
    }
}


module.exports = DelightChatRooms;