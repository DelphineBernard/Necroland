const isAdmin = (req, res, next) => {
    if (req.userRoleId && req.userRoleId === 2) {
        next();
    } else {
        return res.status(403).json({ message: 'Access Denied: Admin only route' });
    }
};

export default isAdmin;