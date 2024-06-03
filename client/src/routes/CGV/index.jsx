import { Container, Typography, List, ListItem } from '@mui/material';

const CGV = () => {
    return (
        <main>
            <Container component="section" sx={{margin: 'auto', marginTop: '1rem', marginBottom: '1rem' }}>
                <Typography variant='h2' sx={{marginBottom: '1rem', textDecoration: 'underline' }}>1. Acceptation des Conditions Générales</Typography>
                <Typography>En effectuant une réservation ou un achat de billets pour le parc d'attractions Necroland, le client reconnaît avoir lu, compris et accepté sans réserve les présentes Conditions Générales de Vente.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>2. Accès au parc</Typography>
                <Typography>2.1. Âge Minimum : L'accès au parc Necroland est interdit aux personnes de moins de 16 ans. Une pièce d'identité peut être demandée à l'entrée.</Typography>
                <Typography>2.2. Horaires d'ouverture : Le parc est ouvert tous les jours de 9h à 18h.</Typography>
                <Typography>2.3. Inauguration : Le parc est actuellement en travaux et son ouverture est prévue dans un mois.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>2. Tarifs des billets</Typography>
                <Typography>Les tarifs des billets pour le parc d'attractions Necroland sont les suivants :</Typography>
                <List>
                    <ListItem>Entrée journée : 65 €</ListItem>
                    <ListItem>Pass deux jours : 110 €</ListItem>
                    <ListItem>Pass trois jours : 150 €</ListItem>
                    <ListItem>Pass quatre jours : 185 €</ListItem>
                </List>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>3. Tarifs des billets avec hébergement</Typography>
                <Typography>Les tarifs des billets avec hôtel inclus pour le parc d'attractions Necroland sont les suivants :</Typography>
                <List>
                    <ListItem>Séjour de deux jours et une nuit : 210 €</ListItem>
                    <ListItem>Séjour de trois jours et deux nuits : 385 €</ListItem>
                    <ListItem>Séjour de quatre jours et trois nuits : 560 €</ListItem>
                </List>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>4. Réservation en ligne</Typography>
                <Typography>Le parc d'attractions Necroland offre un système de réservation en ligne permettant aux visiteurs de sélectionner la date de leur visite ainsi que le nombre de billets souhaités.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>5. Durée de séjour maximum</Typography>
                <Typography>Aucun client ne peut réserver un séjour de plus de quatre jours consécutifs au parc d'attractions Necroland.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>6. Paiement</Typography>
                <Typography>Le règlement des réservations et des achats de billets peut s'effectuer par paiement sur place. Les modalités de paiement en ligne seront disponibles ultérieurement.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>7. Annulation de Réservation</Typography>
                <Typography>Les clients ont la possibilité d'annuler leur réservation jusqu'à 10 jours avant la date de début de leur séjour pour bénéficier d'un remboursement intégral. Passé ce délai, aucun remboursement ne sera accordé.</Typography>
                <Typography>En cas de force majeure ou de conditions exceptionnelles, Necroland se réserve le droit d'annuler ou de modifier la date de la réservation. Dans ce cas, les billets pourront être reportés ou remboursés.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>8. Responsabilité du parc d'attractions Necroland</Typography>
                <Typography>Le parc d'attractions Necroland décline toute responsabilité en cas de perte, vol, dommage ou blessure survenant pendant la visite du parc. Les visiteurs sont tenus de respecter les consignes de sécurité affichées dans le parc.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>9. Propriété Intellectuelle</Typography>
                <Typography>Tous les éléments du site web de Necroland, y compris les textes, les images, les vidéos et les logos, sont la propriété exclusive de Necroland et sont protégés par les lois relatives à la propriété intellectuelle. Toute reproduction ou utilisation sans autorisation préalable est strictement interdite et peut donner lieu à des poursuites judiciaires.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>10. Protection des Données Personnelles</Typography>
                <Typography>Necroland s'engage à respecter la confidentialité des données personnelles des visiteurs. Les informations collectées sont nécessaires pour la gestion des réservations et l'amélioration des services. Conformément au Règlement Général sur la Protection des Données (RGPD), les visiteurs disposent d'un droit d'accès, de rectification et de suppression des données les concernant.</Typography>


                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>11. Modification des Conditions Générales</Typography>
                <Typography>Le parc d'attractions Necroland se réserve le droit de modifier les présentes Conditions Générales de Vente à tout moment et sans préavis. Les conditions applicables seront celles en vigueur au moment de la réservation ou de l'achat.</Typography>

                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>12. Litiges</Typography>
                <Typography>En cas de litige entre le parc d'attractions Necroland et un client, les parties s'engagent à rechercher une solution amiable. À défaut, le litige sera porté devant les tribunaux compétents.</Typography>

                <Typography>Ces Conditions Générales de Vente sont régies par le droit français. En réservant un séjour ou en achetant des billets pour le parc d'attraction Necroland, le client reconnaît avoir pris connaissance et accepté l'ensemble des dispositions énoncées ci-dessus.</Typography>
            </Container>
        </main>
    )
}

export default CGV;