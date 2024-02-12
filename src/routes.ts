import { Request, Response, Router } from "express";
import TeacherController from "./controllers/TeacherController";
import { auth } from "./middleware/authRequired";
import multer from "multer";
import { storage } from "./config/multer"; 

const upload = multer({ storage: storage })
const route = Router();

route.post("/teacher/register", TeacherController.store);
route.post("/teacher/login", TeacherController.login);

route.post('/students', upload.single('image'), (req: Request, res: Response) => {
    res.json(req.file)
})

route.use(auth)

route.get("/teacher", TeacherController.index);
route.delete("/teacher", TeacherController.delete);
route.put("/teacher", TeacherController.update);

route.get('/students')
route.delete('/students/:id')
route.put('/students/:studentId', upload.single('image'))



export default route;
