import { useEffect, useRef, useState } from 'react'
import io from 'socket.io-client'
import { ModalUser } from '../components/Modal.jsx'

function Chat() {
    const socketRef = useRef(null)
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')
    const [messages, setMessages] = useState([])
    const [messageInput, setMessageInput] = useState('')

    useEffect(() => {
        // Connecter le socket dès le début
        const newSocket = io('http://localhost:3000')
        socketRef.current = newSocket

        newSocket.on('connect', () => {
            console.log('✅ Connecté au serveur Socket.IO')
            console.log('ID de socket:', newSocket.id)
        })

        // Écouter si le nom est accepté
        newSocket.on('usernameAccepted', (username, usernames) => {
            console.log('✅ Nom accepté:', username)
            console.log('👥 Utilisateurs connectés:', usernames)
            setUser(username)
            setUsers(usernames)
            setError('')
        })

        // Écouter si le nom est refusé
        newSocket.on('usernameRejected', (message) => {
            console.log('❌ Nom refusé:', message)
            setError(message)
            setUser(null)
        })

        // Écouter quand un utilisateur rejoint
        newSocket.on('userJoined', (username, usernames) => {
            console.log('👤 Utilisateur rejoint:', username)
            console.log('👥 Utilisateurs connectés:', usernames)
            setUsers(usernames)
        })

        // Écouter quand un utilisateur se déconnecte
        newSocket.on('userLeft', (username, usernames) => {
            console.log('👋 Utilisateur déconnecté:', username)
            console.log('👥 Utilisateurs connectés:', usernames)
            setUsers(usernames)
        })

        // Écouter les messages reçus
        newSocket.on('message', (data) => {
            console.log('💬 Message reçu:', data)
            setMessages((prevMessages) => [...prevMessages, data])
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

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (messageInput.trim()) {
            // Envoyer le message au serveur
            socketRef.current.emit('sendMessage', messageInput.trim())
            setMessageInput('')
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
                <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                    {/* Sidebar utilisateurs */}
                    <div style={{ width: '250px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', height: 'fit-content' }}>
                        <h3>Utilisateurs en ligne ({users.length})</h3>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {users.map((username) => (
                                <li key={username} style={{ padding: '5px', marginBottom: '5px', backgroundColor: username === user ? '#d4edda' : '#f8f9fa', borderRadius: '3px' }}>
                                    {username} {username === user ? '(toi)' : ''}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Zone de chat */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <h1>Bienvenue {user}!</h1>

                        {/* Messages */}
                        <div style={{ flex: 1, border: '1px solid #ccc', borderRadius: '5px', padding: '10px', marginBottom: '10px', height: '400px', overflowY: 'auto', backgroundColor: '#f9f9f9' }}>
                            {messages.length === 0 ? (
                                <p style={{ color: '#999', textAlign: 'center' }}>Aucun message pour le moment...</p>
                            ) : (
                                messages.map((msg, index) => (
                                    <div key={index} style={{ marginBottom: '10px', padding: '8px', backgroundColor: msg.username === user ? '#d4edda' : '#fff', borderRadius: '5px', border: '1px solid #ddd' }}>
                                        <strong>{msg.username}:</strong> {msg.text}
                                        <div style={{ fontSize: '0.8em', color: '#666', marginTop: '4px' }}>
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Formulaire d'envoi */}
                        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                            <input
                                type="text"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                placeholder="Tapez votre message..."
                                style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                            />
                            <button type="submit" style={{ padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' }}>
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat
