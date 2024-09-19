import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from 'path';


//components
import Connection from "./database/db.js";
import Router from "./routes/route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//routes

app.use("/", Router);

const __dirname = path.dirname(new URL(import.meta.url).pathname); 
app.use('/file', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8080;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
