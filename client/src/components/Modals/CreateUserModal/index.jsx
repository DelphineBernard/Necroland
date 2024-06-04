import Modal from 'react-modal';
import { useState } from 'react';
import API_URL from '../../../config.js';
import { Alert } from "@mui/material";

const CreateUserModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/user`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage('');
            } else {
                setSuccessMessage('');
                setErrorMessage(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <form method="post" onSubmit={handleSubmit}>
                {successMessage && <Alert variant='filled' severity='success'>{successMessage}</Alert>}
                {errorMessage && <Alert variant='filled' severity='error'>{errorMessage}</Alert>}
                <p>* Champs obligatoires</p>
                <div>
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Adresse e-mail du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Mot de passe *</label>
                    <p>Le mot de passe doit contenir au moins 12 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial.</p>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Mot de passe du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Nom *</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Nom du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom *</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Prénom du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Adresse *</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Adresse du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Code postal *</label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Code postal du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">Ville *</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="Ville du membre"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="country">Pays *</label>
                    <input
                        type="text"
                        name="country"
                        id="country"
                        placeholder="France"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="role_id">Role *</label>
                    <select name="role_id" id="role_id" required>
                        <option value="1">Membre</option>
                        <option value="2">Administrateur</option>
                    </select>
                </div>
                <button type="submit">Créer le membre</button>
            </form>
        </Modal>
    )
}

export default CreateUserModal;