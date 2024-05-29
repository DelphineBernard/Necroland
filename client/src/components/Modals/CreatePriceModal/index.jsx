import Modal from 'react-modal';
import { useState } from 'react';
import API_URL from '../../../config.js';

const CreatePriceModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const priceData = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/price`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(priceData)
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
                    <label htmlFor="duration">Durée (en jours) *</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        placeholder="Durée"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Montant (au format XX.XX)*</label>
                    <input
                        type="text"
                        // Pattern autorisant uniquement les chiffres et 2 chiffres après la virgule
                        pattern="\d+(\.\d{2})?"
                        title="Le montant doit être au format XX.XX"
                        name="price"
                        id="price"
                        placeholder="Montant"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="hotel">Hôtel inclus ? *</label>
                    <select name="hotel" id="hotel" required>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </div>
                <button type="submit">Créer le prix</button>
            </form>
        </Modal>
    )
}

export default CreatePriceModal;