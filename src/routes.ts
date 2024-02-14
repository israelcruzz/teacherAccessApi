import { Router } from "express";
import { auth } from "./middleware/authRequired";
import { storage } from "./config/multer";
import multer from "multer";
import TeacherController from "./controllers/TeacherController";
import StudentController from "./controllers/StudentController";
import CourseController from "./controllers/CourseController";
import LeasonController from "./controllers/LeasonController";

const upload = multer({ storage: storage });
const route = Router();

route.post("/teacher/register", TeacherController.store);
route.post("/teacher/login", TeacherController.login);

route.use(auth);

route.get("/teacher", TeacherController.index);
route.delete("/teacher", TeacherController.delete);
route.put("/teacher", TeacherController.update);

route.get("/student", StudentController.index);
route.post("/student", StudentController.store);
route.delete("/student/:studentId", StudentController.delete);
route.put("/student/:studentId", StudentController.update);

route.get("/course", CourseController.index);
route.post("/course", CourseController.store);

route.post("/leason", LeasonController.send)

export default route;
