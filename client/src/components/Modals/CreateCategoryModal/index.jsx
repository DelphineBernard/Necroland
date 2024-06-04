import Modal from 'react-modal';
import { useState } from 'react';
import API_URL from '../../../config.js';
import { Alert } from "@mui/material";

const CreateCategoryModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const priceData = Object.fromEntries(formData.entries());

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/category`, {
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
                {successMessage && <Alert variant='filled' severity='success'>{successMessage}</Alert>}
                {errorMessage && <Alert variant='filled' severity='error'>{errorMessage}</Alert>}
                <p>* Champs obligatoires</p>
                <div>
                    <label htmlFor="name">Nom *</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nom de la catégorie"
                        required
                    />
                </div>
                <button type="submit">Créer la catégorie</button>
            </form>
        </Modal>
    )
}

export default CreateCategoryModal;