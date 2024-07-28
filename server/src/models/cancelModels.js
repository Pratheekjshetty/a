import mongoose from "mongoose";

const cancelSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    bookingid: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    reason: { type: String, required: true },
    bookingdate: { type: Date, required: true },
    currentdate: { type: Date, required: true },
});

const cancelModel = mongoose.models.cancel || mongoose.model("cancel", cancelSchema);
export default cancelModel;
