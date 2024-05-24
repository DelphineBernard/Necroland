import Modal from 'react-modal';
import { useState } from 'react';

const CreateCategoryModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const priceData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/category', {
                method: 'POST',
                headers: {
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