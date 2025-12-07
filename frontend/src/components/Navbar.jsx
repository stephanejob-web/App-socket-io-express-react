import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

function Navbar() {
    const { user, logout } = useApp()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Chat App {user && `- ${user.username}`}
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Accueil
                    </Button>
                    <Button color="inherit" component={Link} to="/chat">
                        Chat
                    </Button>
                    <Button color="inherit" component={Link} to="/learnreact">
                        Learn React
                    </Button>
                    {user ? (
                        <Button color="inherit" onClick={handleLogout}>
                            Déconnexion
                        </Button>
                    ) : (
                        <Button color="inherit" component={Link} to="/login">
                            Connexion
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
