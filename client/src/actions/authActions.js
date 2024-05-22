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
        console.log(result)

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
        console.error("Erreur lors de la déconnexion", error);
    }
}

export { login, register, logout };