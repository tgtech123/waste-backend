const express = require('express')
const locate = require('../models/location')

const router = express.Router()

router.get("/", async(req, res) => {
    const allLocation = await locate.find()

    res.json({locations: allLocation})
})

router.get("/getone", async(req, res) => {
    return "hello world"
})

router.post("/create", async(req, res) => {
    try {
        const {location} = req.body
        
        if(!location || location === "") {
            return res.json({message: "location must be filled"})
        }else {
            const newLocation = await locate.create(
                {
                    location, 
                }
            )
            return res.json({message: "location created successfully", request: newLocation})

        }

    } catch (error) {
        res.send(error.message)
    }
})




router.put("/edit/:id", async(req, res) => {
    const id = req.params.id

    const date = new Date()


   
        const updatedLocation = await locate.findByIdAndUpdate(
        id,              // The ID of the meal to update
        {
            date
        },      // The data to update
        { new: true } 
       )  
       return res.json({message: "location updated sucessfully", updatedLocation})


})

router.delete("/delete/:id", async(req, res) => {
    const id = req.params.id

    try {
         const deleted = await locate.findByIdAndDelete(id)

         if (!deleted) {
            return res.json({ message: "location not deleted" });
        }

        return res.json({ success: true, message: "location deleted", data: deleted });



    } catch (error) {
        return res.json({message: error.message})
    }
})

module.exports = router