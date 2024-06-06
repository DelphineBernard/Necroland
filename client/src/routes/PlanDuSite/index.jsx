import { Container, Typography, Link, List, ListItem, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PlanDuSite = () => {

    return (
        <main>
            <Container component="section" sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box>
                    <Typography variant='h2' sx={{ mb: 4, textAlign: 'center' }}>
                        Que recherchez-vous ?
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/attractions">
                                Les attractions
                            </Link>
                        </Typography>
                        <List>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/attractions/rollercoaster">
                                    Rollercoasters
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/attractions/restaurant">
                                    Restaurants
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/attractions/experience-immersive">
                                    Expériences immersives
                                </Link>
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/le-parc">
                                Le parc
                            </Link>
                        </Typography>
                        <List>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/le-parc#presentation">
                                    Présentation
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/le-parc#plan-du-parc">
                                    Plan du parc
                                </Link>
                            </ListItem>
                        </List>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/infos-pratiques">
                                Infos pratiques
                            </Link>
                        </Typography>
                        <List>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/infos-pratiques#tarifs">
                                    Les tarifs
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/infos-pratiques#hotel">
                                    L'hôtel
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link sx={{ color: 'white' }} component={RouterLink} to="/infos-pratiques#itineraire">
                                    Venir au parc
                                </Link>
                            </ListItem>
                        </List>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/inscription">
                                Inscription
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/connexion">
                                Connexion
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/profil">
                                Profil
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/reservation">
                                Réservation
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/contact">
                                Contact
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/cgv">
                                Conditions générales de vente
                            </Link>
                        </Typography>
                    </Box>
                    <Box sx={{ mb: 4 }}>
                        <Typography>
                            <Link sx={{ color: 'white' }} component={RouterLink} to="/mentions-legales">
                                Mentions légales
                            </Link>
                        </Typography>
                    </Box>
                </Box>
            </Container>
        </main>
    );
};

export default PlanDuSite;