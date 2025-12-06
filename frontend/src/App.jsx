import {useEffect, useRef, useState} from 'react'
import io from 'socket.io-client'
import {ModalUser} from "./components/Modal.jsx";

function App() {
    const socketRef = useRef(null)
    const [user, setUser] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    useEffect(() => {
        // Connecter le socket dès le début
        const newSocket = io('http://localhost:3000')
        socketRef.current = newSocket

        newSocket.on('connect', () => {
            console.log('✅ Connecté au serveur Socket.IO')
            console.log('ID de socket:', newSocket.id)
        })

        // Écouter si le nom est accepté
        newSocket.on('usernameAccepted', (username) => {
            console.log('✅ Nom accepté:', username)
            setUser(username)
            setError('')
        })

        // Écouter si le nom est refusé
        newSocket.on('usernameRejected', (message) => {
            console.log('❌ Nom refusé:', message)
            setError(message)
            setUser(null)
        })

        newSocket.on('disconnect', () => {
            console.log('❌ Déconnecté du serveur')
        })

        return () => {
            newSocket.close()
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            setError('')
            // Envoyer le nom au serveur pour vérification
            socketRef.current.emit('setUsername', inputValue.trim())
        }
    }

    return (
        <div>
            <ModalUser
                open={!user}
                handleClose={() => {}}
                onSubmit={handleSubmit}
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
                error={error}
            />
            {user && (
                <div>
                    <h1>Bienvenue {user}!</h1>
                    <p>Chat en cours...</p>
                </div>
            )}
        </div>
    )
}

export default App
