import { Link } from 'react-router-dom'
import { Container, Typography, Button, Box } from '@mui/material'

function NotFound() {
    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Page non trouvée
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                    La page que vous recherchez n'existe pas.
                </Typography>
                <Button
                    component={Link}
                    to="/"
                    variant="contained"
                    sx={{ mt: 3 }}
                >
                    Retour à l'accueil
                </Button>
            </Box>
        </Container>
    )
}

export default NotFound
