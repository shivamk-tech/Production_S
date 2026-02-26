const rideModel = require('../models/rideForUser.model')

async function createRide(req, res){
    try{
        const {pickup, drop, rideType, otherPersonPhone, scheduledTime} = req.body
        if(!pickup || !drop || !rideType || !scheduledTime){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createRide,
}