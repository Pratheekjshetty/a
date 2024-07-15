import cancelModel from '../models/cancelModels.js';

const cancelBooking = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            booking_id: bookingId,
            email,
            phone,
            from,
            to,
            reason,
            booking_date: bookingDate,
            current_date: currentDate
        } = req.body;

        const newCancellation = new cancelModel({
            firstName,
            lastName,
            bookingid: bookingId,
            email,
            phone,
            from,
            to,
            reason,
            bookingdate: bookingDate,
            currentdate: currentDate
        });

        await newCancellation.save();
        res.status(201).send({ message: 'Booking cancellation request submitted successfully!' });
    } catch (error) {
        console.error('Error saving cancellation request:', error);
        res.status(500).send({ message: 'Failed to submit cancellation request.' });
    }
};

export {cancelBooking}