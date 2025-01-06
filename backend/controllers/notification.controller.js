import Notification from "../models/notification.model.js"

export const getUserNotifications = async (req, res) => {
    try {
        const notification = await Notification.find({user: req.params.id}).sort({createdAt: -1})
        .populate("relatedUser", "name username profilePicture")
        .populate("relatedPost", "content image")
        
        res.status(200).json(notification)
    } catch (error) {
        console.log("Error in getting user notifications", error)
        res.status(500).json({message: "Error in getting user notifications"})
    }
}

export const markNotificationAsRead = async (req, res) => {
    const notification = req.params.id
    try {
        const notification = await Notification.findByIdAndUpdate(notification, {read: true}, {new: true})
        res.status(200).json(notification)
    } catch (error) {
        console.log("Error in marking notification as read", error)
        res.status(500).json({message: "Error in marking notification as read"})
    }
}

export const deleteNotification = async (req, res) => {
    const notification = req.params.id
    try {
        await Notification.findByIdAndDelete({
            _id: notification
        })
        res.status(200).json({message: "Notification deleted"
        })
    } catch (error) {
        console.log("Error in deleting notification", error)
        res.status(500).json({message: "Error in deleting notification"})
    }
}

