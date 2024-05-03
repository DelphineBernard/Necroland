import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
import router from './app/router.js';

dotenv.config();

const port = process.env.PORT_EXPRESS || 3000;
const app = express();

app.use(express.urlencoded({ extended: true}));

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});