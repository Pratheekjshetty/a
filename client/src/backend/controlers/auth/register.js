import express from 'express';
import initAdminModel from '../../model/adminModel.js';
import { RESPONSE } from '../../config/global.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import constants from "../../config/constants.js"
const router =express.Router();
router.post("/",async(req,res)=>{
    try{
        const adminModel =await initAdminModel();
        const{admin_name,email,phone,password}=req.body;
        let response;
        if(!admin_name||admin_name===""){
            response=RESPONSE.MANDATORY_PARAMS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"teacher name "+response.message,
            });
        }
        if(!email||email===""){
            response=RESPONSE.MANDATORY_PARAMS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"email "+response.message,
            });
        }
        if(!phone||phone===""){
            response=RESPONSE.MANDATORY_PARAMS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"phone "+response.message,
            });
        }
        if(!password||password===""){
            response=RESPONSE.MANDATORY_PARAMS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"password "+response.message,
            });
        }
        const isValidEmail=validator.isEmail(email);
        console.log(isValidEmail);
        if(isValidEmail===false){
            response=RESPONSE.INVALID_DATA;
            return res.json({           //sending data using json format
                code:response.code,
                message:"email "+response.message,
            });
        }
        const isextistingEmail =await adminModel.find({
            is_Active:constants.STATE.ACTIVE,
            email:email,
        })
        // console.log(isextistingEmail);
        if(isextistingEmail.length>0){
            response=RESPONSE.ALREADY_EXSITS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"email "+response.message,
            });
        }
        const isValidPhone=validator.isMobilePhone(phone)&& phone.toString().length===10;;
        console.log(isValidPhone);
        if(isValidPhone===false){
            response=RESPONSE.INVALID_DATA;
            return res.json({           //sending data using json format
                code:response.code,
                message:"phone "+response.message,
            });
        }
        const isextistingPhone =await adminModel.find({
            is_Active:constants.STATE.ACTIVE,
            phone:phone,
        })
        // console.log(isextistingPhone);
        if(isextistingPhone.length>0){
            response=RESPONSE.ALREADY_EXSITS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"phone "+response.message,
            });
        }
        const encryptedPassword =await bcrypt.hash(password,constants.HASH_ROUND);
        // console.log(encryptedPassword);
        await adminModel.create({
            admin_name:admin_name,
            email:email,
            phone:phone,
            password:encryptedPassword,
        });

        return res.json(RESPONSE.SUCCESS);
        // if(!teacher_name||teacher_name==""){
        //     return res.json({
        //         code:"400",
        //         message:"teacher name is mandetory",
        //     });
        // }
    }
    catch(err){
        console.log(err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})
export default router;
