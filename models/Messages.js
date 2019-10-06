"use strict";

const Sequelize = require("sequelize");

function defineMessages(sequelize) {

    class Messages extends Sequelize.Model { }

    const attributes = {

        fk_room_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        fk_user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                isInt: true
            }
        },
        time: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: new Date().toLocaleTimeString(),
            validate: {
                len: [1, 255]
            }
        },
        message: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
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
        modelName: "Messages",
        timestamps: false
    };

    Messages.init(attributes, options);

    Messages.associate = (models) => {

        const associateOptions1 = {

            foreignKey: "fk_room_id",
            onDelete: "restrict",
            onUpdate: "restrict"
        };

        Messages.belongsTo(models.Rooms, associateOptions1);

        const associateOptions2 = {

            foreignKey: "fk_user_id",
            onDelete: "restrict",
            onUpdate: "restrict"
        };

        Messages.belongsTo(models.Users, associateOptions2);
    };

    return Messages;
}


module.exports = defineMessages;