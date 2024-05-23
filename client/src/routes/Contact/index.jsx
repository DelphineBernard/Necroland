import { useState } from "react";

const Contact = () => {

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const messageData = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(messageData)
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
    }

    return (
        <main>
            <form method="post" onSubmit={handleSubmit}>
                {successMessage && <p>{successMessage}</p>}
                {errorMessage && <p>{errorMessage}</p>}
                <p>* Champs obligatoires</p>
                <div>
                    <label htmlFor="lastname">Nom *</label>
                    <input type="text" name="lastname" id="lastname" />
                </div>
                <div>
                    <label htmlFor="firstname">Prénom *</label>
                    <input type="text" name="firstname" id="firstname" />
                </div>
                <div>
                    <label htmlFor="email">Email *</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label htmlFor="object">Objet *</label>
                    <input type="text" name="object" id="object" />
                </div>
                <div>
                    <label htmlFor="content">Description *</label>
                    <textarea name="content" id="content"></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </main>
    )
}

export default Contact;