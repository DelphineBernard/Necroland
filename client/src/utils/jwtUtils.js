import { jwtDecode } from "jwt-decode";

const decodeJWT = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken;
    } catch (error) {
        console.error("Erreur lors du décryptage du token JWT:", error);
        return null;
    }
};

export default decodeJWT;