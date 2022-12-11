const express = require("express");
const router = express.Router();
const ToDo = require("../models/ToDo");
const requiresAuth = require("../middleware/permissions");
const validateToDoInput = require("../validation/toDoValidation");

router.get("/test", (req, res) => {
    res.send("to do is working");
})

router.post("/new", requiresAuth, async (req , res) =>{
    try {

        const{errors , isValid} = validateToDoInput(req.data);
        if(!isValid){
            return res.send("Somthing unexpected occur").status(400);
        }
        const newToDo = new ToDo({
            user: req.user._id,
            content: req.body.content,
            complete: false,
        })

        await newToDo.save();

        return res.json(newToDo)
    } catch (error) {
       return res.status(400).json({error: "Authentication failed please reload the page"})
    }
})

router.get("/current", requiresAuth, async (req , res)=> {
    try {
        const completedToDos = await ToDo.find({user: req.user._id,complete: true}).sort({completedAt: -1});
        const incompleteToDos = await ToDo.find({user: req.user._id,complete: false}).sort({createdat: -1});

        return res.json({incomplete: incompleteToDos, complete: completedToDos})
        
    } catch (error) {
       return res.send(error.message).status(400);
    }
})

module.exports = router;