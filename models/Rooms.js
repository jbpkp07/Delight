"use strict";

const Sequelize = require("sequelize");

function defineRooms(sequelize) {

    class Rooms extends Sequelize.Model { }

    const attributes = {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        createdAt: {
            type: "TIMESTAMP",
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
        }
    };

    const options = {

        sequelize,
        modelName: "Rooms",
        timestamps: false
    };

    Rooms.init(attributes, options);

    Rooms.associate = (models) => {

        const associateOptions1 = {

            foreignKey: "fk_room_id",
            onDelete: "restrict",
            onUpdate: "restrict"
        };

        Rooms.hasMany(models.Interests, associateOptions1);

        const associateOptions2 = {

            foreignKey: "fk_room_id",
            onDelete: "restrict",
            onUpdate: "restrict"
        };

        Rooms.hasMany(models.Messages, associateOptions2);
    };

    return Rooms;
}


module.exports = defineRooms;