import cancelModel from '../models/cancelModels.js';
import rentModel from '../models/rentModels.js';

const cancelBooking = async (req, res) => {
    try {
        const {
            firstName, lastName,
            booking_id: bookingId,
            email, phone,
            from, to, reason,
            booking_date: bookingDate,
            current_date: currentDate
        } = req.body;

        const newCancellation = new cancelModel({
            firstName, lastName,
            bookingid: bookingId,
            email, phone,
            from, to, reason,
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
        const { bookingid } = req.body;
        if (!bookingid) {
            return res.status(400).json({ message: "Booking ID is required" });
          }
        const rentBooking = await rentModel.findById(bookingid);
        if (!rentBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        rentBooking.status = "Car Cancelled";
        await rentBooking.save();

        res.status(200).json({ message: "Booking status updated successfully", rentBooking });
    } catch (error) {
        console.error('Error updating cancellation status:', error);
        res.status(500).send({ message: 'Failed to update booking status.' });
    }
};

const deleteCancellation = async (req, res) => {
    try {
        const { cancelId } = req.body;
        const deletedCancellation = await cancelModel.findByIdAndDelete(cancelId);
        if (!deletedCancellation) {
            return res.status(404).json({ message: "Cancellation not found" });
        }
        res.status(200).json({ message: "Cancellation deleted successfully" });
    } catch (error) {
        console.error('Error deleting cancellation:', error);
        res.status(500).send({ message: 'Failed to delete cancellation.' });
    }
};

export { cancelBooking, getCancellations, updateCancellationStatus, deleteCancellation };
  