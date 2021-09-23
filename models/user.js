const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
});

module.exports = User;

// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define("user", {
//         email: {
//             type: DataTypes.STRING(100),
//             allowNull: false,
//             unique: true,
//         },
//         password: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         role: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             default: "user",
//         },
//     })
//     return User
// }