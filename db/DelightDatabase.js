"use strict";

const configPaths = require("../config/configPaths.js");
const SequelizeDatabase = require(configPaths.sequelizeDatabasePath);
const seeds = require(configPaths.delightSeedsPath);


class DelightDatabase extends SequelizeDatabase {

    constructor() {

        super();
    }

    seedDatabase() {

        return new Promise((resolve, reject) => {

            this.database.Rooms.bulkCreate(seeds.rooms).then(() => {

                this.database.Interests.bulkCreate(seeds.interests).then(() => {

                    for (const user of seeds.users) {

                        user.password = this.database.Users.generateHash(user.password);
                    }

                    this.database.Users.bulkCreate(seeds.users).then(() => {

                        this.database.Messages.bulkCreate(seeds.messages).then(() => {

                            resolve();

                        }).catch((error) => {

                            reject(error);
                        });

                    }).catch((error) => {

                        reject(error);
                    });

                }).catch((error) => {

                    reject(error);
                });

            }).catch((error) => {

                reject(error);
            });
        });
    }

    login(creds) {

        return new Promise((resolve, reject) => {

            const options = {
                raw: true,
                where: {
                    name: creds.name
                }
            };

            this.database.Users.findOne(options).then((user) => {

                if (user === null) {

                    reject("Error: User name does not exist");
                    return;
                }

                if (!this.database.Users.isValidPassword(creds.password, user.password)) {

                    reject("Error: User password is incorrect");
                    return;
                }

                this.getRandomInterestsRooms(50, 5).then((interestsRooms) => {

                    const response = {
                        userId: user.id,
                        user: user.name,
                        interestsRooms
                    };

                    resolve(response);

                }).catch((error) => {

                    reject(error);
                });

            }).catch((error) => {

                reject(error);
            });
        });
    }

    signUp(creds) {

        return new Promise((resolve, reject) => {

            const options = {
                raw: true,
                where: {
                    name: creds.name
                }
            };

            this.database.Users.findOne(options).then((user) => {

                if (user !== null) {

                    reject("Error: User name already exists");
                    return;
                }

                creds.password = this.database.Users.generateHash(creds.password);

                this.database.Users.create(creds).then((user) => {

                    this.getRandomInterestsRooms(50, 5).then((interestsRooms) => {
          
                        const response = {
                            userId: user.id,
                            user: user.name,
                            interestsRooms
                        };
    
                        resolve(response);

                    }).catch((error) => {

                        reject(error);
                    });

                }).catch((error) => {

                    reject(error);
                });

            }).catch((error) => {

                reject(error);
            });
        });
    }

    getRandomInterestsRooms(totalCount, groupCount) {

        return new Promise((resolve, reject) => {

            const options = {
                raw: true,
                attributes: [["id", "interestId"], ["name", "interest"]],
                include: [{ model: this.database.Rooms, attributes: ["id", "name"] }],
                order: [["id"]]
            };

            this.database.Interests.findAll(options).then((interestsRooms) => {

                for (const interestRoom of interestsRooms) {

                    interestRoom.room = interestRoom["Room.name"];  //Tidy object because attribute aliases don't work well with raw: true
                    interestRoom.roomId = interestRoom["Room.id"];

                    delete interestRoom["Room.name"];
                    delete interestRoom["Room.id"];
                }

                const randomIds = new Set();  //Helps keep it close to O(1) time complexity

                while (randomIds.size < totalCount) {

                    const randomId = Math.floor(Math.random() * interestsRooms.length);

                    if (!randomIds.has(randomIds)) {

                        randomIds.add(randomId);
                    }
                }

                const randomizedInterestsRooms = [];

                let randomizedGroup = [];

                for (const randomId of randomIds.values()) {

                    randomizedGroup.push(interestsRooms[randomId]);   //Helps keep it close to O(1) time complexity

                    if (randomizedGroup.length === groupCount) {

                        randomizedInterestsRooms.push(randomizedGroup);

                        randomizedGroup = [];
                    }
                }

                resolve(randomizedInterestsRooms);

            }).catch((error) => {

                reject(error);
            });
        });
    }

    getMessagesForRoom(roomId) {

        return new Promise((resolve, reject) => {

            const options = {
                raw: true,
                attributes: ["time", "message"],
                limit: 100,
                where: {
                    fk_room_id: roomId
                },
                include: [{ model: this.database.Users, attributes: ["name"] }],
                order: [["id", "DESC"]]
            };

            this.database.Messages.findAll(options).then((messages) => {

                for (const message of messages) {

                    message.name = message["User.name"];  //Tidy object because attribute aliases don't work well with raw: true
                    delete message["User.name"];
                }

                messages.reverse();  //After sorting by 'id' DESC and limiting to 100 messages, we reverse the array to get message order back to normal

                resolve(messages);

            }).catch((error) => {

                reject(error);
            });
        });
    }

    saveNewMessage(message) {

        //No promise returned. Just save it while chat messages flow between users.

        const newMsgObj = {
            fk_room_id: message.roomId,
            fk_user_id: message.userId,
            time: message.time,
            message: message.message
        };

        this.database.Messages.create(newMsgObj);
    }

    getAllChatRoomNames() {

        return new Promise((resolve, reject) => {

            const options = {
                raw: true,
                attributes: ["name"]
            };

            this.database.Rooms.findAll(options).then((rooms) => {

                const roomsArray = [];

                for (const room of rooms) {

                    roomsArray.push(room.name);
                }

                resolve(roomsArray);

            }).catch((error) => {

                reject(error);
            });
        });
    }
}


module.exports = DelightDatabase;