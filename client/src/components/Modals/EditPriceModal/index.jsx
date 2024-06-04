import Modal from 'react-modal';
import { useState, useEffect } from 'react';
import API_URL from '../../../config.js';
import { Alert } from "@mui/material";

const EditPriceModal = ({ priceId, isOpen, onRequestClose, initialValues, onClose }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);

    useEffect(() => {
        setFormData(initialValues);
    }, [initialValues]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/price/${priceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (response.ok) {
                setSuccessMessage(result.message);
                setErrorMessage('');
                onClose();
            } else {
                setSuccessMessage('');
                setErrorMessage(result.message);
            }

        } catch (error) {
            console.error('Erreur:', error);
            console.log(formData)
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
                    <label htmlFor="duration">Durée (en jours) *</label>
                    <input
                        type="number"
                        name="duration"
                        id="duration"
                        value={formData.duration}
                        onChange={handleChange}
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
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="hotel">Hôtel inclus ? *</label>
                    <select name="hotel" id="hotel" required onChange={handleChange} value={formData.hotel}>
                        <option value="true">Oui</option>
                        <option value="false">Non</option>
                    </select>
                </div>
                <button type="submit">Modifier les informations</button>
            </form>
        </Modal>
    )
}

export default EditPriceModal;