import API_URL from '../config.js';

// La fonction Login fait une requête sur l'endpoint API correspondante, elle récupère le token généré côté back-end dans le authController.login
// Si la requête aboutit, la fonction dispatch permet d'envoyer l'action au store Redux
const login = (userData) => async dispatch => {

    try {
        const response = await fetch(`${API_URL}/connexion`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: result.token,
        });
        // L'objet passé à dispatch est une action, le type indique au reducer ce qu'il doit faire en réponse à cette action et le payload contient notre token
        
    } catch (error) {
        dispatch({
            type: 'LOGIN_FAIL',
            payload: error.message
        });
    }
}

const register = (userData) => async dispatch => {
    try {
        const response = await fetch(`${API_URL}/inscription`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message);
        }

        const result = await response.json();
        localStorage.setItem('token', result.token);
        
        dispatch({
            type: 'REGISTER_SUCCESS',
            payload: result.token,
        });

    } catch (error) {
        dispatch({
            type: 'REGISTER_FAIL',
            payload: error.message,
        });
    }
}

const logout = () => async dispatch => {
    try {
        const token = localStorage.getItem('token');
        await fetch(`${API_URL}/deconnexion`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        localStorage.removeItem('token');
        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        dispatch({
            type: 'LOGOUT_FAILED',
            payload: error.message,
        });
    }
}

export { login, register, logout };