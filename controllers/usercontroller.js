const router = require("express").Router();
const { UserModel } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize/lib/errors");

router.post('/create', async (req, res) => {
    const { email, password, isAdmin } = req.body.user;
    
    try {
        const NewUser = await UserModel.create({
            email,
            password: bcrypt.hashSync(password, 13),
            isAdmin
        })
        
        let token = jwt.sign(
            { id : NewUser.id }, 
            process.env.JWT_SECRET, 
            { expiresIn : 60 * 60 * 24 }
        );
        
        res.status(201).json({
            NewUser,
            message: "User successfully created!",
            token
        });
    } catch (error) {
    if (error instanceof UniqueConstraintError) {
        res.status(409).json({
            message: "Email already in use",
        });
    } else {
        res.status(500).json({
        message: "Failed to create user",
        });
    }   
}
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body.user;

    try {
        const LoggedInUser = await UserModel.findOne({
            where: {
                email: email,
            } 
        });
        
        if (LoggedInUser) {
            let passwordComparison = await bcrypt.compare(password, LoggedInUser.password);
            if (passwordComparison) {
                let token = jwt.sign(
                    {id: LoggedInUser.id}, 
                    process.env.JWT_SECRET, 
                    {expiresIn: 60 * 60 * 24}
                );
    
                res.status(200).json({
                    LoggedInUser,
                    message: "User successfully logged in!",
                    token: token
                });
            } else {
                res.status(401).json({
                    message: "Login failed - Incorrect email or password"
                })
            }
        } else {
            res.status(401).json({
                message: 'Login failed'
            });
        }
    } catch (error) {
        res.status(500).json({ error })
    }
});

// GET all users if role = admin
router.get("/", async (req, res) => {
    try {
        const allUsers = await UserModel.findAll();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;
