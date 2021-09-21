const { Router } = require("express");
const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");

const { Review, User } = require("../models");

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
        const newReview = await Review.create(reviewEntry);
        res.status(200).json(newReview);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET reviews by user
router.get("/myReviews", (async (req, res) => {
    const { id } = req.user;
    try {
        const userReviews = await Review.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userReviews);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Update a Review
router.put("/update/:idToUpdate", async (req, res) => {
    const { isbn, title, review } = req.body.reviews;
    const reviewId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: reviewId,
            owner_id: userId
        }
    };

    const updatedReview = {
        isbn: isbn,
        title: title,
        review: review,
        owner_id: userId
    };

    try {
        const update = await Review.update(updatedReview, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a review
router.delete("/delete/:idToDelete", async (req, res) => {
    const ownerId = req.user.id
    const reviewId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: reviewId,
                owner_id: ownerId
            }
        };

        await Review.destroy(query);
        res.status(200).json({ message: "Your review has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
