import express from 'express';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT_EXPRESS || 3000;
const app = express();

app.use(cors());

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser);

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});