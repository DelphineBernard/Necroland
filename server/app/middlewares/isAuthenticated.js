import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ message: 'Access Denied: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    console.log(token)
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.userId;
        req.userRoleId = data.userRoleId;
        return next();
    } catch {
        return res.status(403).json({ message: 'Invalid token' });
    }
};

export default isAuthenticated;