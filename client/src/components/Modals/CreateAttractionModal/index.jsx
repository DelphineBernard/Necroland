import Modal from 'react-modal';
import { useState, useContext } from 'react';
import { Context } from '../../Context';
import API_URL from '../../../config.js';

const CreateAttractionModal = ({ isOpen, onRequestClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { categories } = useContext(Context);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const attractionData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${API_URL}/attraction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attractionData)
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
                        placeholder="Nom de l'attraction"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description *</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Description de l'attraction"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="lastname">Catégorie *</label>
                    <select name="category_id" id="category_id" required>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Créer l'attraction</button>
            </form>
        </Modal>
    )
}

export default CreateAttractionModal;