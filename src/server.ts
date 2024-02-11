import express from "express";
import routes from "./routes";
import dotenv from "dotenv";

dotenv.config();

const port = 3333;
const app = express();

app.use(express.json());
app.use(routes);

app.listen(port, () => console.log(`Serve online in http://localhost:${port}`));
