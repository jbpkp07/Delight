"use strict";

const Sequelize = require("sequelize");

function defineInterests(sequelize) {

    class Interests extends Sequelize.Model { }

    const attributes = {

        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 255]
            }
        },
        fk_room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
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
        modelName: "Interests",
        timestamps: false
    };

    Interests.init(attributes, options);

    Interests.associate = (models) => {

        const associateOptions = {

            foreignKey: "fk_room_id",
            onDelete: "restrict",
            onUpdate: "restrict"
        };

        Interests.belongsTo(models.Rooms, associateOptions);
    };

    return Interests;
}


module.exports = defineInterests;