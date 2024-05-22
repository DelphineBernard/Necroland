// La fonction Login fait une requête sur l'endpoint API correspondante, elle récupère le token généré côté back-end dans le authController.login
// Si la requête aboutit, la fonction dispatch permet d'envoyer l'action au store Redux
const login = (userData) => async dispatch => {

    try {
        const response = await fetch("http://localhost:3000/api/connexion", {
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

        // L'objet passé à dispatch est une action, le type indique au reducer ce qu'il doit faire en réponse à cette action et le payload contient notre token
        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: result.token,
        });
    } catch (error) {
        dispatch({ 
            type: 'LOGIN_FAIL', 
            payload: error.message 
        });
    }
}

const register = (userData) => async dispatch => {
    try {
        const response = await fetch("http://localhost:3000/api/inscription", {
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
        await fetch("http://localhost:3000/api/deconnexion", {
            method: "POST",
        });
        dispatch({ type: 'LOGOUT' });
    } catch (error) {
        dispatch({ 
            type: 'LOGOUT_FAILED', 
            payload: error.message, 
        });
    }
}

export { login, register, logout };