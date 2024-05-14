const Contact = () => {

    return (
        <>
            <main>
                <form>
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
                        <label htmlFor="description">Description *</label>
                        <textarea name="description" id="description"></textarea>
                    </div>
                    <button type="submit">Envoyer</button>
                </form>
            </main>
        </>
    )
}

export default Contact;