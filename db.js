const {Sequelize} = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

module.exports = sequelize;


// const {Sequelize} = require('sequelize');

// const db = new Sequelize(process.env.DATABASE_URL || `postgresql://postgres:${encodeURIComponent(process.env.PASS)}@localhost/book-review`, {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// });

// module.exports = db;


// const { Sequelize } = require('sequelize')

// const sequelize = new Sequelize(
//     process.env.DB_DBNAME,
//     process.env.DB_USER,
//     process.env.DB_PASS,
//     {
//         host: process.env.DB_HOST,
//         dialect: 'postgres'
//     }
// )

// async function synceDb(sequelize, options){
//     const { force, alter} = options
//     try {
//         if (force)
//             await sequelize.sync({force: true})
//         else if (alter)
//             await sequelize.sync({alter: true})
//         else
//             await sequelize.sync()
//     } catch (err){
//         console.log(err)
//     }
// }


// module.exports = {
//     sequelize,
//     synceDb
// }