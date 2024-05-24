// Je définis l'état initial lié à l'authentification dans mon application
const initialState = {
    isAuthenticated: false, 
    token: null,
    error: null,
};

// La fonction authReducer prend deux arguments, l'état initial et l'action qui va déclencher la mise à jour de l'état
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // Ici, lorsque l'inscription et/ou la connexion est réussie, je modifie mon état
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            const isAdmin = action.payload.userRoleId === 2;
            return {
                ...state,
                isAuthenticated: true,
                token: action.payload,
                isAdmin: isAdmin,
                error: null,
            }
            // Après que le reducer ait agit, notre store contiendra toutes ces valeurs
        case 'LOGIN_FAIL':
        case 'REGISTER_FAIL':
            return {
                ...state,
                isAuthenticated: false,
                token: null, 
                isAdmin: false,
                error: action.payload,
            }
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false, 
                token: null,
                isAdmin: false,
                error: null,
            }
        case 'LOGOUT_FAILED':
            return {
                ...state,
                error: action.payload,
            }
        default: 
            return state;
    }
}

export default authReducer;