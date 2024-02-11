import { Router } from "express";
import TeacherController from "./controllers/TeacherController";
import { auth } from "./middleware/authRequired";

const route = Router();

route.post("/teacher/register", TeacherController.store);
route.post("/teacher/login", TeacherController.login);

route.use(auth)

route.get("/teacher", TeacherController.index);
route.delete("/teacher", TeacherController.delete);
route.put("/teacher", TeacherController.update);

export default route;
