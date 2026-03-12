const rideModel = require('../models/rideForUser.model')
const userModel = require('../models/user.model')

async function createRide(req, res) {
    try {

        const riderId = req.user.id
        const { pickup, drop, vehicleType, rideType = "for_me", otherRider, scheduledTime, distance } = req.body

        const riderName = await userModel.findOne({ _id: riderId })

        if (!pickup || !drop) {
            return res.status(400).json({
                message: "Pickup and drop locations are required"
            })
        }

        if (!riderName) {
            return res.status(400).json({
                message: "Rider not found"
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

        const ride = await rideModel.create({
            rider: riderId,
            pickup,
            drop,
            distance,
            riderFirstName: riderName.firstName,
            riderLastName: riderName.lastName,
            driverFirstName: null,
            driverLastName: null,
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
            message: "Ride created successfully",
            ride
        })


    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function acceptRide(req, res) {
    try {
        const driverId = req.user.id
        const { rideId } = req.params
        const driverName = await userModel.findOne({ _id: driverId })

        if (!driverName) {
            return res.status(400).json({
                message: "Driver not found"
            })
        }


        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can accept rides"
            })
        }

        const ride = await rideModel.findOneAndUpdate(
            {
                _id: rideId,
                status: "pending",
                isRideActive: false,
                driverFirstName: null,
                driverLastName: null
            },
            {
                $set: {
                    driver: driverId,
                    status: "accepted",
                    isRideActive: true,
                    driverFirstName: driverName.firstName,
                    driverLastName: driverName.lastName
                }
            },
            { new: true }
        )

        if (!ride) {
            return res.status(400).json({
                message: "Ride already accepted or not available"
            })
        }

        res.status(200).json({
            message: "Ride accepted successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function startRide(req, res) {
    try {

        const driverId = req.user.id
        const { rideId } = req.params

        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can start rides"
            })
        }

        const ride = await rideModel.findOneAndUpdate(
            {
                _id: rideId,
                driver: driverId,   // only assigned driver
                status: "accepted"
            },
            {
                $set: {
                    status: "started",
                    startedAt: new Date()
                }
            },
            { new: true }
        )

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be started"
            })
        }

        res.status(200).json({
            message: "Ride started successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function completeRide(req, res) {
    try {

        const driverId = req.user.id
        const { rideId } = req.params

        if (!req.user.roles.includes("driver")) {
            return res.status(403).json({
                message: "Only drivers can complete rides"
            })
        }

        const ride = await rideModel.findOne({
            _id: rideId,
            driver: driverId,
            status: "started"
        })

        if (!ride) {
            return res.status(400).json({
                message: "Ride cannot be completed"
            })
        }

        const finalFare = ride.fare.estimated

        ride.status = "completed"
        ride.completedAt = new Date()
        ride.fare.final = finalFare

        await ride.save()

        res.status(200).json({
            message: "Ride completed successfully",
            ride
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getPendingRides(req, res) {
    try {
        const rides = await rideModel.find({ status: "pending" })
        res.status(200).json({ message: "Pending Rides", rides })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getAcceptedRidesOfDriverInfo(req, res) {
    try {
        const driverId = req.user.id
        const ride = await rideModel.find({ driver: driverId })
        if (!ride || ride.length === 0) {
            return res.status(401).json({
                message: "No active rides found"
            })
        }
        res.status(200).json({
            message: "successfully finded the active rides",
            ride
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function getAcceptedRidesOfRiderInfo(req, res) {
    try {
        const riderId = req.user.id
        const ride = await rideModel.find({ rider: riderId })
        if (!ride || ride.length === 0) {
            return res.status(401).json({
                message: "No active rides found for rider"
            })
        }
        res.status(200).json({
            message: "successfully found the active rides for rider",
            ride
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
    acceptRide,
    startRide,
    completeRide,
    getPendingRides,
    getAcceptedRidesOfDriverInfo,
    getAcceptedRidesOfRiderInfo
}
