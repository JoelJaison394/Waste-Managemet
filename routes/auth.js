const express = require("express");
const router = express.Router();
const User = require("../models/User")
const validateRegisterInput = require("../routes/validation/registerValidation")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requiresAuth = require("../middleware/permissions");


//
router.get("/test",(req,res)=>{
    res.send("Auth is working");
});


router.post("/register", async (req,res) => {
    try {

        const {errors, isValid} = validateRegisterInput(req.body);
        

        if(!isValid) {
            return res.status(400).json(errors);
        }

        const existingEmail = await User.findOne({
            email: new RegExp("^"+req.body.email+"$" , "i") 
        });
        if(existingEmail){
            return res
            .status(400)
            .json({error: "there is already a user with this email addres"});
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name
        });

        const SavedUser = await newUser.save();
        const usertoReturn = { ...SavedUser._doc};
        delete usertoReturn.password;

        return res.json(usertoReturn);

    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.post("/login", async (req, res)=> {
    try {
        const user = await User.findOne({
            email: new RegExp("^"+req.body.email+"$" , "i") 
        });

        if(!user){
            res.status(400).json({error: "there was a problem with login"})
        }

        const passwordMatched = await bcrypt.compare(req.body.password, user.password);

        if(!passwordMatched){
            res.status(400).json({error: "there was a problem with login"})
        }

        const payload = { userId: user._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
    
        res.cookie("access-token", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        });
    
        const userToReturn = { ...user._doc };
        delete userToReturn.password;
    
        return res.json({
          token: token,
          user: userToReturn,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
})

router.get("/current", requiresAuth, (req, res) => {
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }
  
    return res.json(req.user);
  });
  


module.exports = router;