const Profil = () => {

    return(
        <>
            <section>
                <h2>Vos informations</h2>
                <ul>
                    <li>Nom: </li>
                    <li>Prénom: </li>
                    <li>Adresse: </li>
                    <li>CP: </li>
                    <li>Ville: </li>
                    <li>Pays: </li>
                    <li>Email: </li>
                </ul>
                <button>Modifier vos informations</button>
            </section>

            <section>
                <h2>Vos réservations</h2>
                <div>
                    <h3>En cours</h3>
                    <p>Vous pouvez annuler votre réservation jusqu'à 10 jours avant la date de début de votre séjour.</p>
                    <div>
                        <ul>
                            <li>N° de réservation: </li>
                            <li>Date de début: </li>
                            <li>Date de fin: </li>
                            <li>Nombre de personnes: </li>
                            <li>Hôtel: </li>
                            <li>Prix total: </li>
                            <li>Statut: </li>
                        </ul>
                    </div>
                    <div>
                        <button>Annuler la réservation</button>
                    </div>
                </div>
                <div>
                    <h3>Terminées</h3>
                </div>
            </section>
        </>
    )
}

export default Profil;