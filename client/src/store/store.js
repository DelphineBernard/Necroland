import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer';

// Je crée un store Redux qui me permet de stocker l'état de l'application ainsi que les méthodes pour le mettre à jour, le store est accessible dans toute l'application
// Je possède un seul reducer, il me permet de mettre à jour le store suite à un changement lié à l'authentification

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;