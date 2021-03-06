require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

app.use(require('./middleware/headers'));
const controllers = require("./controllers");

app.use(express.json());

app.use("/user", controllers.userController);
app.use(require("./middleware/validate-jwt"));
app.use("/books", controllers.bookController);
app.use("/reviews", controllers.reviewController);

db.authenticate()
  .then(() => db.sync()) // => {force: true} this means delete databases
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`[Server: ] App is listening on Port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(`[Server: ] Server Crashed: ${err}`);
    console.log(err)
  });


// require("dotenv").config();
// const express = require("express");
// const db = require("./db");

// const app = express();

// app.use(require('./middleware/headers'));

// const controllers = require("./controllers");

// app.use(express.json());

// app.use("/user", controllers.userController);
// app.use(require("./middleware/validate-jwt"));
// app.use("/books", controllers.bookController);
// app.use("/reviews", controllers.reviewController);

// db.authenticate()
//   .then(() => db.sync()) // => {force: true} this means delete databases
//   .then(() => {
//     app.listen(process.env.PORT, () =>
//       console.log(`[Server: ] App is listening on Port ${process.env.PORT}`)
//     );
//   })
//   .catch((err) => {
//     console.log(`[Server: ] Server Crashed: ${err}`);
//     console.error(err);
//   });

// require('dotenv').config()
// const express = require('express')
// const app = express()
// const port = 3000

// ;(async() => {
//   app.use(express.json())

//   app.use(require('./middleware/headers'))

//   const user = require('./controllers/usercontroller')
//   app.use("/user", user)

//   app.use(require("./middleware/validate-jwt"))

//   const books = require('./controllers/bookcontroller')
//   app.use('/books', books)

//   const reviews = require('./controllers/reviewcontroller')
//   app.use('/reviews', reviews)

//   app.listen(port, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
//   })
// })()