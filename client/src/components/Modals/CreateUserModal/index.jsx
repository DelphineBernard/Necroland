import Modal from 'react-modal';

const CreateUserModal = ({ isOpen, onRequestClose }) => {

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <form method="post" >
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
                    <input
                        type="number"
                        name="role_id"
                        id="role_id"
                        placeholder="Rôle du membre"
                        required
                    />
                </div>
                <button type="submit">Créer le membre</button>
            </form>
        </Modal>
    )
}

export default CreateUserModal;