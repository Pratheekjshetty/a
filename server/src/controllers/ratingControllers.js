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

export {addRating}