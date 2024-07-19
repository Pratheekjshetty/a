import fs from 'fs';
import path from 'path';
import driverModel from '../models/driverModels.js';
import userModel from '../models/userModels.js';

const applyDriver = async (req, res) => {
  console.log('Request Body:', req.body); 
  const {
    userId,
    firstName,lastName,
    email,phone,
    dob,gender,
    street,city,state,
    zipcode,country,
    alemail,alphone,
    adharnumber,
    licencenumber,
    expiredate,preferredLocation,
    experience,reference,
    language,availability,
  } = req.body;

  const address = { firstName ,lastName ,email ,phone ,dob ,gender ,street ,city ,state ,zipcode ,country ,alemail ,alphone };
  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: 'User ID is required' });
    }

    const existingDriver = await driverModel.findOne({ userId });
    if (existingDriver) {
      return res
        .status(400)
        .json({ success: false, message: 'Driver already applied' });
    }

    const driversLicense = req.files['driversLicense'][0];
    const proofOfAddress = req.files['proofOfAddress'][0];

    const driverData = new driverModel({
      userId,
      address,
      adharnumber,
      licencenumber,
      expiredate,
      preferredLocation,
      experience,
      reference,
      language,
      availability,
      driversLicense: path.join('doc-uploads', `${Date.now()}-${driversLicense.originalname}`),
      proofOfAddress: path.join('doc-uploads', `${Date.now()}-${proofOfAddress.originalname}`),
    });

    await driverData.save();

    fs.writeFileSync(driverData.driversLicense, driversLicense.buffer);
    fs.writeFileSync(driverData.proofOfAddress, proofOfAddress.buffer);

    res.status(201).json({
      success: true,
      message: 'Driver application submitted successfully',
    });
  } catch (error) {
    console.error('Error applying for driver:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to submit application' });
  }
};

const getApplications = async(req,res) =>{
  try {
    const applications = await driverModel.find({});
    res.status(200).send(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).send({ message: 'Failed to fetch applications.' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
      const { userId } = req.body;
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }
      const userRole = await userModel.findById(userId);
      if (!userRole) {
          return res.status(404).json({ message: "User not found" });
      }
      userRole.role = "driver";
      await userRole.save();

      res.status(200).json({ message: "User role updated successfully", userRole });
  } catch (error) {
      console.error('Error updating application status:', error);
      res.status(500).send({ message: 'Failed to update user role.' });
  }
};

const deleteApplication = async (req, res) => {
  try {
      const { applyId } = req.body;
      const deletedApplication = await driverModel.findByIdAndDelete(applyId);
      if (!deletedApplication) {
          return res.status(404).json({ message: "Application not found" });
      }
      res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
      console.error('Error deleting application:', error);
      res.status(500).send({ message: 'Failed to delete application.' });
  }
};

export { applyDriver, getApplications, updateApplicationStatus, deleteApplication };
