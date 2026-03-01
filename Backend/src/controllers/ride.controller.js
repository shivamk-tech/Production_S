const rideModel = require('../models/rideForUser.model')

async function createRide(req, res) {
    try {

        const riderId = req.user.id
        const { pickup, drop, vehicleType, rideType = "for_me", otherRider, scheduledTime } = req.body

        if (!pickup || !drop) {
            return res.status(400).json({
                message: "Pickup and drop locations are required"
            })
        }
        if (!vehicleType) {
            return res.status(400).json({
                message: "Vehicle type is required"
            })
        }
        if (
            !pickup.location ||
            !drop.location ||
            !Array.isArray(pickup.location.coordinates) ||
            !Array.isArray(drop.location.coordinates)
        ) {
            return res.status(400).json({
                message: "Invalid location format"
            })
        }

        let finalScheduledTime = new Date()

        if (scheduledTime) {
            const parsedTime = new Date(scheduledTime)

            if (isNaN(parsedTime.getTime())) {
                return res.status(400).json({
                    message: "Invalid scheduled time"
                })
            }

            if (parsedTime < new Date()) {
                return res.status(400).json({
                    message: "Scheduled time cannot be in the past"
                })
            }

            finalScheduledTime = parsedTime
        }
        const estimatedFare = 100

        const existingActiveRide = await rideModel.findOne({
            rider: riderId,
            status: { $in: ["pending", "accepted", "started"] }
        })

        if (existingActiveRide) {
            return res.status(400).json({
                message: "You already have an active ride"
            })
        }

        await rideModel.create({
            rider: riderId,
            pickup,
            drop,
            vehicleType,
            rideType,
            otherRider: rideType === "for_other" ? otherRider : null,
            scheduledTime: finalScheduledTime,
            fare: {
                estimated: estimatedFare,
                final: 0
            },
            status: "pending"
        })

        res.status(201).json({
            message: "Ride created successfully"
        })


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports = {
    createRide,
}