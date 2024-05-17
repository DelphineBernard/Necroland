import jwt from 'jsonwebtoken';

const isLogged = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'secret');
    const userId = decodedToken.userId;

    if (!token) {
        return res.status(401).json({alert: 'Vous devez vous connecter pour accéder à cette page.'});
    } else {
        next();
    }
}


export default isLogged;