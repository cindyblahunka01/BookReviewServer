const UserModel = require("./user");
const BooksModel = require("./books");
const ReviewsModel = require("./reviews");

// Define Associations
UserModel.hasMany(BooksModel, {as: 'UserBook'});
BooksModel.belongsTo(UserModel);

UserModel.hasMany(ReviewsModel, {as: 'UserReview'});
ReviewsModel.belongsTo(UserModel);

module.exports = { 
    UserModel,
    BooksModel,
    ReviewsModel
};




// Grab db instance
// const { sequelize, synceDb } = require('../db')
// const { DataTypes } = require('sequelize')

// // Grab Model Functions
// const DefineUser = require('./user')
// const DefineBook = require('./books')
// const DefineReview = require('./reviews')

// const User = DefineUser(sequelize, DataTypes) // Defines the model
// const Book = DefineBook(sequelize, DataTypes) // Defines the model
// const Review = DefineReview(sequelize, DataTypes) // Defines the model

// // Define Associations
// User.hasMany(Book)
// Book.belongsTo(User)

// User.hasMany(Review)
// Review.belongsTo(User)

// // Sync
// synceDb(sequelize, { alter:true })


// module.exports = { User, Book, Review }