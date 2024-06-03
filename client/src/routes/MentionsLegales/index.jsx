import { Box, Container, Typography, Link } from '@mui/material';

const MentionsLegales = () => {
    return (
        <main>
            <Container component="section" sx={{margin: 'auto', marginTop: '1rem', marginBottom: '1rem' }}>
                <Typography variant='h2' sx={{marginBottom: '1rem', textDecoration: 'underline' }}>Conditions d'utilisation du site internet :</Typography>
                <Typography>Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Necroland l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</Typography>
                <Typography>La connexion et la navigation sur le site par l'utilisateur implique acceptation intégrale et sans réserve des présentes mentions légales.</Typography>
                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>Éditeur :</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography>Necroland</Typography>
                    <Typography>Société par Actions Simplifiée au capital de 6.666.666 €</Typography>
                    <Typography>666 Rue de l'Holocauste</Typography>
                    <Typography>77130 La Tombe, Seine-et-Marne</Typography>
                    <Typography>RCS Meaux Z 666 666 666</Typography>
                    <Typography>TVA FR66666666666</Typography>
                </Box>
                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>Hébergement :</Typography>
                <Typography>Apocalypse, 4 Rue du Cimetière, 77130 La Tombe, Seine-et-Marne</Typography>
                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>Directeur de publication :</Typography>
                <Typography>Mr Lucas Davre</Typography>
                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>Nous contacter :</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column' }}>
                    <Typography>Email : <Link sx={{color: '#9c9c9c'}} href="mailto:contact@necroland.fr">contact@necroland.fr</Link></Typography>
                    <Typography>Téléphone : <Link sx={{color: '#9c9c9c'}} href="tel:+666666666">06 66 66 66 66</Link></Typography>
                </Box>
                <Typography variant='h2' sx={{margin: '1rem 0', textDecoration: 'underline' }}>Données personnelles :</Typography>
                <Typography>Le site assure à l'utilisateur une collecte et un traitement d'informations personnelles dans le respect de la vie privée conformément à la loi n°78-17 du 6 janvier 1978 relative à l'informatique, aux fichiers et aux libertés.</Typography>
                <Typography>En vertu de la loi Informatique et Libertés, en date du 6 janvier 1978, l'utilisateur dispose d'un droit d'accès, de rectification, de suppression et d'opposition de ses données personnelles.</Typography>
                <Typography>L'utilisateur exerce ce droit par mail à l'adresse email : <Link sx={{color: '#9c9c9c'}} href="mailto:contact@necroland.fr">contact@necroland.fr</Link></Typography>
            </Container>
        </main>
    )
}

export default MentionsLegales;