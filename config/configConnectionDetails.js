"use strict";

require("dotenv").config();

module.exports =
{
    development: {
        username: process.env.DELIGHT_DB_USER || "root",
        password: process.env.DELIGHT_DB_PASS || "",
        database: "delight_db",
        host:     "localhost",
        dialect:  "mysql",
        logging:  false
    },
    test: {
        username: process.env.DELIGHT_DB_USER || "root",
        password: process.env.DELIGHT_DB_PASS || "",
        database: "delight_db",
        host:     "localhost",
        dialect:  "mysql",
        logging:  false
    },
    production: {
        use_env_variable: "JAWSDB_URL",
        dialect: "mysql",
        logging: false
    }
};