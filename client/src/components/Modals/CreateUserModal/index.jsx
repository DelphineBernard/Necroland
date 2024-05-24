import Modal from 'react-modal';
import { useState } from 'react';

const CreateUserModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/user', {
                method: 'POST',
                headers: {
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
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <p>* Champs obligatoires</p>
                <div>
                    <label htmlFor="email">Adresse e-mail *</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Votre adresse e-mail"
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
                        placeholder="Votre mot de passe"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Nom *</label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Votre nom"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom *</label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Votre prénom"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="address">Adresse *</label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Votre adresse"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="postalCode">Code postal *</label>
                    <input
                        type="text"
                        name="postalCode"
                        id="postalCode"
                        placeholder="Votre code postal"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="city">Ville *</label>
                    <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="La ville où vous habitez"
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