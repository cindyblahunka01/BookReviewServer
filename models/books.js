const { DataTypes } = require("sequelize");
const db = require("../db");

const Books = db.define("books", {
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

// module.exports = (sequelize, DataTypes) => {
//     const Books = sequelize.define("books", {
//         title: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         author: {
//             type: DataTypes.STRING,
//             allowNull: false
//         },
//         description: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         isbn: {
//             type: DataTypes.INTEGER,
//             allowNull: true
//         },
//     })
//     return Books
// }
