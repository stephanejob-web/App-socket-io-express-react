import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Box, Typography, TextField, Button } from '@mui/material'
import { useAuth } from '../App'

function Login() {
    const [username, setUsername] = useState('')
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (username.trim()) {
            const userData = { username: username.trim(), id: Date.now() }
            const token = 'token-' + Date.now()

            login(userData, token)
            navigate('/chat')
        }
    }

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
                <Typography component="h1" variant="h4" gutterBottom>
                    Connexion
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nom d'utilisateur"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!username.trim()}
                    >
                        Se connecter
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default Login
