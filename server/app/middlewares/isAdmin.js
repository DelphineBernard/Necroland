import jwt from 'jsonwebtoken';

const isAdmin = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    const decodedToken = jwt.verify(token, 'secret');
    const userRoleId = decodedToken.userRoleId;

    if (userRoleId === 2) {
        return res.status(401).json({alert: 'Accès refusé. Vous n\'avez pas les autorisations nécessaires.'});
    } else {
        next();
    }
}


export default isAdmin;