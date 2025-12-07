import { createContext, useContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import LearnReact from './pages/LearnReact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

// Contexte d'authentification
const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth doit être utilisé dans AuthProvider')
    }
    return context
}

function App() {
    const [user, setUser] = useState({ username: 'TestUser', id: 1 })
    const [token, setToken] = useState('mon-token-en-dur-123456')

    const login = (userData, authToken) => {
        setUser(userData)
        setToken(authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    const authValue = {
        user,
        token,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={authValue}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/learnreact" element={<LearnReact />} />
                <Route
                    path="/chat"
                    element={
                        <PrivateRoute>
                            <Chat />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AuthContext.Provider>
    )
}

export default App
