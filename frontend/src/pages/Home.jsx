import { Link } from 'react-router-dom'
import { Button, Container, Typography, Box } from '@mui/material'

function Home() {
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
                <Typography component="h1" variant="h2" gutterBottom>
                    Bienvenue
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Application de chat en temps réel avec Socket.IO
                </Typography>
                <Button
                    component={Link}
                    to="/chat"
                    variant="contained"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Accéder au Chat
                </Button>
            </Box>
        </Container>
    )
}

export default Home
