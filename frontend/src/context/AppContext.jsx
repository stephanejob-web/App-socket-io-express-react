import { createContext, useContext, useState } from 'react'

// Contexte global de l'application
const AppContext = createContext(null)

export const useApp = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useApp doit être utilisé dans AppProvider')
    }
    return context
}

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState({ username: 'TestUser', id: 1 })
    const [token, setToken] = useState('mon-token-en-dur-123456')
    const [message, setMessage] = useState('test')

    const login = (userData, authToken) => {
        setUser(userData)
        setToken(authToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
    }

    const appValue = {
        user,
        token,
        login,
        logout,
        message,
    }

    return (
        <AppContext.Provider value={appValue}>
            {children}
        </AppContext.Provider>
    )
}
