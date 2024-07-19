import fs from 'fs';
import path from 'path';
import driverModel from '../models/driverModels.js';

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

export { applyDriver };
