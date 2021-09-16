const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { ReviewsModel } = require("../models");

//create/add review 
router.post("/add",  async (req, res) => {
    const { isbn, title, review } = req.body.reviews; 
    const id = req.user.id; 
    const reviewEntry = {
        isbn,
        title,
        review,
        owner_id: id
    }
    try {
        const newReview = await ReviewsModel.create(reviewEntry);
        res.status(200).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET reviews by user
router.get("/myReviews", (async (req, res) => {
    const { id } = req.user;
    try {
        const userReviews = await ReviewsModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userReviews);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update a Book
router.put("/update/:idToUpdate", async (req, res) => {
    const { title, author, description, isbn } = req.body.books;
    const bookId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: bookId,
            owner_id: userId
        }
    };

    const updatedBook = {
        title: title,
        author: author,
        description: description,
        isbn: isbn,
        owner_id: userId
    };

    try {
        const update = await BooksModel.update(updatedBook, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a book
router.delete("/delete/:idToDelete", async (req, res) => {
    const ownerId = req.user.id
    const bookId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: bookId,
                owner_id: ownerId
            }
        };

        await BooksModel.destroy(query);
        res.status(200).json({ message: "Your book has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
