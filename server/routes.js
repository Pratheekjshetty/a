import express from "express"
import authApiHandler from "./src/controlers/auth/apiHandler.js"

const routes=(app)=>{
    app.use(express.json());
    app.use("/api/auth",authApiHandler);

};

export default routes;