const express = require('express')
const request = require('../models/request')

const router = express.Router()

router.get("/", async(req, res) => {
    const allRequest = await request.find()

    res.json({request: allRequest})
})

router.get("/getone", async(req, res) => {
    return "hello world"
})

router.post("/create", async(req, res) => {
    try {
        const {name, email, phone, address, address2, city, state, country, zip} = req.body
        if(!name || name === "") {
            return res.json({message: "name  must be filled"})
        }else {
            const newRequest = await request.create(
                { 
                    name, 
                    email,
                    phone, 
                    address, 
                    address2, 
                    city, 
                    state, 
                    country, 
                    zip
                }
            )
            return res.json({message: "request created successfully", request: newRequest})

        }

    } catch (error) {
        res.send(error.message)
    }
})




router.put("/edit", async(req, res) => {
    return "hello world"
})

router.delete("/delete", async(req, res) => {
    return "hello world"
})

module.exports = router