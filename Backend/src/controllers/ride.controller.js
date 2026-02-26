const rideModel = require('../models/rideForUser.model')

async function createRide(req, res){
    try{
        
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