const router = require("express").Router();
let validateJWT = require("../middleware/validate-jwt");
let validateIsAdmin = require("../middleware/validateIsAdmin");
const { BooksModel, UserModel } = require("../models");

//create/add book 
router.post("/add", validateJWT, async (req, res) => {
    const { title, author, description, isbn } = req.body.books 
    const id = req.user.id
    const bookEntry = {
        title,
        author,
        description,
        isbn }

        try {
            const findUser = await UserModel.findOne({
                where: { id: id }
            })
            if (findUser) {
                const newBook = await BooksModel.create(bookEntry);
                await newBook.setUser(findUser)
                res.status(200).json(newBook);
            } else {
                res.status(401).json({ Message: "Can't create book entry, user does not exist" })
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
});

// GET books by user
router.get("/myBooks", validateJWT, (async (req, res) => {
    const id = req.user.id;
    try {
        const userBooks = await BooksModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userBooks);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

// GET all books user and admin
router.get("/allBooks", validateJWT, validateIsAdmin, (async (req, res) => {
    await BooksModel.findAll()
    .then(books => {
        res.json(books)
        })
    .catch (err => res.status(500).json({ error: err }))
}));

//Update a Book
router.put("/update/:idToUpdate", validateJWT, async (req, res) => {
    const { title, author, description, isbn } = req.body.books;
    const bookId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: bookId,
            userId: userId
        }
    };

    const updatedBook = {
        title: title,
        author: author,
        description: description,
        isbn: isbn,
        userId: userId
    };

    try {
        const update = await BooksModel.update(updatedBook, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a book
router.delete("/delete/:idToDelete", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const bookId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: bookId,
                userId: ownerId
            }
        };

        await BooksModel.destroy(query);
        res.status(200).json({ message: "Your book has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
