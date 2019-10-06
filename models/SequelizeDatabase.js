"use strict";

require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const configPaths = require("../config/configPaths.js");
const connectionDetails = require(configPaths.configConnectionDetailsPath);


class SequelizeDatabase {

    constructor() {

        this.thisFileName = path.basename(configPaths.sequelizeDatabasePath);

        this.env = process.env.NODE_ENV || "development";

        this.connectionDetails = connectionDetails[this.env];

        this.connection = null;

        this.database = {};

        this.assignConnection();

        this.gatherModels();

        this.buildAssociations();

        this.finalizeDatabase();
    }

    assignConnection() {

        const productionEnv = this.connectionDetails.use_env_variable;

        if (productionEnv) {

            this.connection = new Sequelize(process.env[productionEnv], this.connectionDetails);
        }
        else {

            this.connection = new Sequelize(this.connectionDetails.database, this.connectionDetails.username, this.connectionDetails.password, this.connectionDetails);
        }
    }

    gatherModels() {

        fs.readdirSync(__dirname)

            .filter(file => this.isValidModelFile(file))

            .forEach(file => {

                const model = this.connection.import(path.join(__dirname, file));

                this.database[model.name] = model;
            });
    }

    isValidModelFile(file) {

        if (file.indexOf(".") === 0) {

            return false;
        }

        if (file === this.thisFileName) {

            return false;
        }

        if (file.slice(-3) !== ".js") {

            return false;
        }

        return true;
    }

    buildAssociations() {

        Object.keys(this.database).forEach(modelName => {

            if (this.database[modelName].associate) {

                this.database[modelName].associate(this.database);
            }
        });
    }

    finalizeDatabase() {

        this.database.connection = this.connection;

        this.database.Sequelize = Sequelize;
    }

    connect() {

        if (process.env.SEQUELIZE_DB_FORCE_SYNC_AND_SEED === "true") {

            const options = 
            {
                force: true
            };

            return new Promise((resolve, reject) => {
                    
                this.database.connection.sync(options).then(() => {  //Forced overwriting
                    
                    this.seedDatabase().then(() => {  //Seed database (implemented in derived class)
                        
                        resolve();

                    }).catch((error) => {
                        
                        reject(error);
                    });

                }).catch((error) => {
                    
                    reject(error);
                });
            });
        }

        const promise = this.database.connection.sync();  //IF NOT EXIST ADD TABLE's (no forced overwriting, no data seeding)

        return promise;
    }

    seedDatabase() {

        throw new TypeError("SequelizeDatabase.seedDatabase(): Promise has not yet been implemented in the derived class.");
    }
}


module.exports = SequelizeDatabase;