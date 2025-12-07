import { Container, Typography, Box, Card, CardContent, Grid, Link as MuiLink, Divider } from '@mui/material'
import { useState } from 'react'

function LearnReact() {
    const [count, setCount] = useState(0)

    const resources = [
        {
            title: 'Documentation officielle React',
            description: 'La meilleure source pour apprendre React',
            url: 'https://react.dev'
        },
        {
            title: 'React Router',
            description: 'Gestion de la navigation dans React',
            url: 'https://reactrouter.com'
        },
        {
            title: 'Material-UI',
            description: 'Composants UI pour React',
            url: 'https://mui.com'
        },
        {
            title: 'Socket.IO',
            description: 'Communication en temps réel',
            url: 'https://socket.io'
        }
    ]

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>
                Apprendre React
            </Typography>

            <Box sx={{ my: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Exemple interactif : Compteur
                </Typography>
                <Card sx={{ maxWidth: 400 }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            Compteur : {count}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <button onClick={() => setCount(count + 1)}>
                                Incrémenter
                            </button>
                            <button onClick={() => setCount(count - 1)}>
                                Décrémenter
                            </button>
                            <button onClick={() => setCount(0)}>
                                Réinitialiser
                            </button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>
                Concepts clés de React
            </Typography>
            <Box sx={{ my: 3 }}>
                <Typography variant="body1" paragraph>
                    <strong>Composants :</strong> Blocs de construction réutilisables de l'interface utilisateur
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Props :</strong> Données passées d'un composant parent à un enfant
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>State :</strong> Données internes à un composant qui peuvent changer
                </Typography>
                <Typography variant="body1" paragraph>
                    <strong>Hooks :</strong> Fonctions spéciales comme useState, useEffect pour gérer l'état et les effets
                </Typography>
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Ressources utiles
            </Typography>
            <Grid container spacing={3}>
                {resources.map((resource, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {resource.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" paragraph>
                                    {resource.description}
                                </Typography>
                                <MuiLink
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visiter le site
                                </MuiLink>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default LearnReact
