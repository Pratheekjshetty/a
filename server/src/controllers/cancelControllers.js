import cancelModel from '../models/cancelModels.js';
import rentModel from '../models/rentModels.js';

const cancelBooking = async (req, res) => {
    try {
        const {
            firstName,lastName,
            booking_id: bookingId,
            email,phone,
            from,to,reason,
            booking_date: bookingDate,
            current_date: currentDate
        } = req.body;

        const newCancellation = new cancelModel({
            firstName,lastName,
            bookingid: bookingId,
            email,phone,
            from,to,reason,
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

const getCancellations = async (req, res) => {
    try {
        const cancellations = await cancelModel.find({});
        res.status(200).send(cancellations);
    } catch (error) {
        console.error('Error fetching cancellations:', error);
        res.status(500).send({ message: 'Failed to fetch cancellations.' });
    }
};

const updateCancellationStatus = async (req, res) => {
    try {
        const { rentId, status } = req.body;
        await rentModel.findByIdAndUpdate(rentId, { status });
        res.json({ success: true, message: 'Status updated successfully' });
    }catch (error) {
        console.error('Error updating cancellation status:', error);
        res.status(500).send({ message: 'Failed to update cancellation status' });
    }
}



export {cancelBooking,getCancellations,updateCancellationStatus}