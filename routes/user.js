const express = require("express");
const router = express.Router();
const requiresAuth = require("../middleware/permissions");
const UserInput = require("../models/UserInput");
const validateUserInput = require("../validation/userinputValidation");

router.get("/testuser", (req, res) => {
    res.send("Auth route working");
  });

  router.post("/collect", requiresAuth , async (req,res)=> {
    try {
        const { errors , isValid } = validateUserInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors);
          }

          const userInput = new UserInput({
            user: req.user._id,
            materials: req.body.materials,
            recyclable:req.body.recyclable,
            reuseable: req.body.reuseable,
            phonenumber: req.body.phonenumber,
            address: req.body.address
          });

          const saveduserInput = await userInput.save();

          return res.json(saveduserInput);
        
    } catch (error) {
        console.log(error)

        res.status(500).send(error)
    }
  })

  router.get("/current", requiresAuth, async (req , res)=> {
    try {
        const finishedCollection = await UserInput.find({user: req.user._id,complete: true}).sort({completedAt: -1});
        const unfinishedCollection = await UserInput.find({user: req.user._id,complete: false}).sort({createdat: -1});

        return res.json({incomplete: unfinishedCollection, complete: finishedCollection})
        
    } catch (error) {
       return res.send(error.message).status(400);
    }
})

  module.exports = router;