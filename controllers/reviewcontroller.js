const router = require("express").Router();
let validateJWT = require("../middleware/validate-jwt");
let validateIsAdmin = require("../middleware/validateIsAdmin");
const { ReviewsModel, UserModel } = require("../models");

//create/add review 
router.post("/add",  validateJWT, async (req, res) => {
    const { isbn, title, review } = req.body.reviews; 
    const id = req.user.id; 
    const reviewEntry = {
        isbn,
        title,
        review
    }
    try {
        const findUser = await UserModel.findOne({
            where: { id: id }
        })
        if (findUser) {
            const newReview = await ReviewsModel.create(reviewEntry);
            await newReview.setUser(findUser)
            res.status(200).json(newReview);
        } else {
            res.status(401).json({ Message: "Can't create review entry, user does not exist" })
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// GET reviews by user
router.get("/myReviews", validateJWT, (async (req, res) => {
    const id = req.user.id;
    try {
        const userReviews = await ReviewsModel.findAll({
            where: {
                userId: id
            }
        });
        res.status(200).json(userReviews);
    } catch (err) {
        res.status(500).json({ error: err });
    }
}));

//Get all reviews
router.get("/allReviews", validateJWT, validateIsAdmin, (async (req, res) => {
    await ReviewsModel.findAll().then(reviews => {
        res.json(reviews)
    })
        .catch((err) => res.status(500).json({ error: err }))
}));

//Update a Review
router.put("/update/:idToUpdate", validateJWT, async (req, res) => {
    const { isbn, title, review } = req.body.reviews;
    const reviewId = req.params.idToUpdate;
    const userId = req.user.id;

    const query = {
        where: {
            id: reviewId,
            userId: userId
        }
    };

    const updatedReview = {
        isbn: isbn,
        title: title,
        review: review,
        userId: userId
    };

    try {
        const update = await ReviewsModel.update(updatedReview, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//Delete a review
router.delete("/delete/:idToDelete", validateJWT, async (req, res) => {
    const ownerId = req.user.id
    const reviewId = req.params.idToDelete;

    try {
        const query = {
            where: {
                id: reviewId,
                userId: ownerId
            }
        };

        await ReviewsModel.destroy(query);
        res.status(200).json({ message: "Your review has been deleted" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;
