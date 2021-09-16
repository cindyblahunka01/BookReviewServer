const { DataTypes } = require("sequelize");
const db = require("../db");

const Books = db.define("books", {
    owner_id: {
        type: DataTypes.INTEGER
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

});

module.exports = Books;