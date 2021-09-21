const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { Book, User } = require("../models");

//create/add book 
router.post("/add",  async (req, res) => {
    const { title, author, description, isbn } = req.body.books; 
    const id = req.user.id; 
    const bookEntry = {
        title,
        author,
        description,
        isbn,
        owner_id: id
    }
    try {
        let u = await User.findOne({ where: {id: req.body.id }})
        if (u) {
            const newBook = await Book.create(bookEntry);
            res.status(200).json(newBook);
        } else {
            message = {
                message: "Can't make a book entry, user does not exist",
                data: null,
            }
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET books by user
router.get("/myBooks", (async (req, res) => {
    const { id } = req.user;
    try {
        const userBooks = await Book.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userBooks);
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
        const update = await Book.update(updatedBook, query);
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

        await Book.destroy(query);
        res.status(200).json({ message: "Your book has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
