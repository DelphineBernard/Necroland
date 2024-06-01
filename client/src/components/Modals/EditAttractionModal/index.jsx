import Modal from 'react-modal';
import { useState, useEffect, useContext } from 'react';
import { Context } from '../../Context/index.jsx';
import API_URL from '../../../config.js';

const EditAttractionModal = ({ attractionId, isOpen, onRequestClose, initialValues }) => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState(initialValues);
    const { categories } = useContext(Context);

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
            const response = await fetch(`${API_URL}/attraction/${attractionId}`, {
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
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <p>* Champs obligatoires</p>
                <div>
                    <label htmlFor="name">Nom *</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description *</label>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category_id">Catégorie *</label>
                    <select onChange={handleChange} style={{color: 'black'}} name="category_id" id="category_id" value={formData.category_id} required>
                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Modifier les informations</button>
            </form>
        </Modal>
    )
}

export default EditAttractionModal;