const express = require("express");
const router = express.Router();
const requiresAuth = require("../middleware/permissions");
const UserInput = require("../models/UserInput");
const validateUserInput = require("../validation/userinputValidation");

router.get("/testuser", (req, res) => {
    res.send("Auth route working");
  });

  router.get("/collection"  , requiresAuth , async (req,res)=>{
    if (req.user.role!=='Collector') {
        return res.status(401).send("Unauthorized");
      }

      const incompletedCollection = await UserInput.find({complete: false}).sort({completedAt: -1});
    
      return res.json({incompleted: incompletedCollection});
  })

  router.put("/:collectionId/complete" , requiresAuth , async (req,res)=>{
    try {
        const incompleted = UserInput.findOne({_id: req.params.collectionId});
        if (!incompleted) {
            return res.status(404).json({ error: "Could not find ToDo" });
          }

          if (incompleted.complete) {
            return res.status(400).json({ error: "ToDo is already complete" });
          }
          
          const updatedcollection = await UserInput.findOneAndUpdate(
            {
              _id: req.params.collectionId,
            },
            {
              complete: true
            },
            {
              new: true,
            }
          );

      
          return res.json(updatedcollection );
    } catch (error) {
        return res.status(400).send(error.message);
    }
})



  module.exports = router;