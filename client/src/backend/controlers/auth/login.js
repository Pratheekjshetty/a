import express from 'express';
import initAdminModel from '../../model/adminModel.js';
import { RESPONSE } from '../../config/global.js';
import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import constants from "../../config/constants.js"
const router =express.Router();
router.post("/",async(req,res)=>{
    try{
        const adminModel =await initAdminModel();
        const{email,password}=req.body;
        let response;
        if(!email||email===""){
            response=RESPONSE.MANDATORY_PARAMS;
            return res.json({           //sending data using json format
                code:response.code,
                message:"email "+response.message,
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
        const data=await adminModel.findOne({
            is_Active:constants.STATE.ACTIVE,
            email:email,
        })
        console.log(data);
        if(data&&(await bcrypt.compare(password,data.password))){
            const token=jwt.sign({
                id:data.__id,
                name:data.teacher_name,
            },
            process.env.TOKENKEY
        );
            response=RESPONSE.SUCCESS;
            return res.json({
                code:response.code,
                message:response.message,
                data:token,
        });
        }
        else{
            response=RESPONSE.INVALID_DATA;
            return res.json({
                code:response.code,
                message:"login credential "+response.message,
        });
    }
    }
    catch(err){
        console.log(err);
        return res.json(RESPONSE.UNKNOWN_ERROR);
    }
})
export default router;
