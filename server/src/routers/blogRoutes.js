import express from 'express'
import { addBlog,editBlog} from '../controllers/blogControllers.js'
import multer from 'multer'
import { authMiddleware } from '../middleware/auth2.js';

const blogRouter = express.Router();

//Image Storage Engine

const storage = multer.diskStorage({
    destination:"blog-uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

blogRouter.post('/add',authMiddleware,upload.single("image"),addBlog);
blogRouter.post('/edit',upload.single("image"),editBlog);

export default blogRouter ;