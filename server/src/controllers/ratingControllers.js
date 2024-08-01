import ratingModel from '../models/ratingModels.js'

//add rating
const addRating = async(req,res)=>{
    console.log('Request Body:', req.body);
    const { carId, rating, comments } = req.body;
    const userId = req.userId;

    // validate input
    if (!carId || !rating || !comments) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
    }

    try {
        // Create a new rating object
        const newRating = new ratingModel({
            userId,
            carId,
            rating,
            comments,
        });

        // Save the rating to the database
        const savedRating = await newRating.save();
        // Respond with success
        res.status(201).json({ success: true, message: 'Rating added successfully.', data: savedRating });
    } catch (error) {
        console.error('Error adding rating:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// get ratings by Car ID
const getRatingsByCarId = async (req, res) => {
    const { carId } = req.params;

    try {
        // Fetch ratings from the database
        const ratings = await ratingModel.find({ carId });
        // Respond with success
        res.status(200).json({ success: true, data: ratings });
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// get rating by ID
const getRatingById = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch rating from the database
        const rating = await ratingModel.findById(id);
        if (!rating) {
            return res.status(404).json({ success: false, message: 'Rating not found.' });
        }
        // Respond with success
        res.status(200).json({ success: true, data: rating });
    } catch (error) {
        console.error('Error fetching rating:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

// update rating by ID
const updateRating = async (req, res) => {
    const { id } = req.params;
    const { rating, comments } = req.body;
    const userId = req.userId;

    // Validate input
    if (!rating || !comments) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
    }

    try {
        // Find the rating by ID and update
        const updatedRating = await ratingModel.findOneAndUpdate(
            { _id: id, userId },
            { rating, comments },
            { new: true }
        );

        if (!updatedRating) {
            return res.status(404).json({ success: false, message: 'Rating not found or unauthorized.' });
        }

        // Respond with success
        res.status(200).json({ success: true, message: 'Rating updated successfully.', data: updatedRating });
    } catch (error) {
        console.error('Error updating rating:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};
// Add admin response to a rating
const addAdminResponse = async (req, res) => {
    const { id } = req.params; // rating ID
    const { response } = req.body; // admin response
    // Check if user is an admin
    if (req.userRole !== 'admin') {
        return res.status(403).json({ success: false, message: 'Access denied.' });
    }

    try {
        const rating = await ratingModel.findById(id);
        if (!rating) {
            return res.status(404).json({ success: false, message: 'Rating not found.' });
        }
        // Update the admin response field
        rating.adminResponse = response;
        const updatedRating = await rating.save();

        res.status(200).json({ success: true, message: 'Admin response added successfully.', data: updatedRating });
    } catch (error) {
        console.error('Error adding admin response:', error);
        res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
    }
};

export {addRating, getRatingsByCarId, getRatingById, updateRating, addAdminResponse }