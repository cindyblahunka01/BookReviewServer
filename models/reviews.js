// const { DataTypes } = require("sequelize");
// const db = require("../db");

// const Reviews = db.define("reviews", {
//     owner_id: {
//         type: DataTypes.INTEGER
//     },
//     isbn: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     review: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
// });

// module.exports = Reviews;

module.exports = (sequelize, DataTypes) => {
    const Reviews = sequelize.define("reviews", {
        owner_id: {
            type: DataTypes.INTEGER
        },
        isbn: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        review: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    })
    return Reviews
}