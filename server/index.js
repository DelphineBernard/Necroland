import express from 'express';
import * as dotenv from 'dotenv';
import router from './app/router.js';
import cors from 'cors';

dotenv.config();

const port = process.env.PORT_EXPRESS || 3000;

const app = express();

const allowedOrigins = ['http://localhost:1234' ,'https://necroland.onrender.com'];

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is in the list of allowed domains
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

app.use(cors(corsOptions));

app.use(express.static('./app/public'));
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});