import * as dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.API_URL || `http://localhost:3000/api`;

export default API_URL;