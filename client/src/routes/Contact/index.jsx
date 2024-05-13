import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Contact = () => {

    return (
    
        <main>
            <form>
                <p>* Champs obligatoires</p>
                <div>
                    <label for="lastname">Nom *</label>
                    <input type="text" name="lastname" id="lastname" />
                </div>
                <div>
                    <label for="firstname">Prénom *</label>
                    <input type="text" name="firstname" id="firstname" />
                </div>
                <div>
                    <label for="email">Email *</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>
                    <label for="object">Objet *</label>
                    <input type="text" name="object" id="object" />
                </div>
                <div>
                    <label for="description">Description *</label>
                    <textarea name="description" id="description"></textarea>
                </div>
                <button type="submit">Envoyer</button>
            </form>
        </main>

    )
}

export default Contact;