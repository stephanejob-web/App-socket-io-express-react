const express = require('express')
const http = require('http')
const {Server} = require('socket.io')
const app = express()
const port =3000
let usernames = []
app.get('/', (req, res) => {
    res.send('index')
})

const serveurHTTP = http.createServer(app)

const io = new Server(serveurHTTP, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
    console.log('✅ Nouveau client connecté:', socket.id)

    socket.on('setUsername', (username) => {

        //verifie l'unicite de lutilisateur
        if (usernames.includes(username)) {
            console.log(`❌ Nom refusé: ${username} (déjà pris)`)
            socket.emit('usernameRejected', 'Ce nom d\'utilisateur est déjà pris')
        } else {
            socket.username = username
            usernames.push(username)
            console.log(`👤 Utilisateur ${username} connecté (ID: ${socket.id})`)
            socket.emit('usernameAccepted', username, usernames)
            // À TOUS les autres clients (pour mettre à jour leur liste)
            socket.broadcast.emit('userJoined', username, usernames)

        }
    })

    socket.on('sendMessage', (text) => {
        if (socket.username) {
            const messageData = {
                username: socket.username,
                text: text,
                timestamp: new Date().toISOString()
            }
            console.log(`💬 Message de ${socket.username}: ${text}`)
            // Envoyer le message à TOUS les clients (y compris l'émetteur)
            io.emit('message', messageData)
        }
    })

    socket.on('disconnect', () => {
        console.log('❌ Client déconnecté:', socket.username || socket.id)
        // Retirer le username de la liste
        if (socket.username) {
            usernames = usernames.filter(name => name !== socket.username)
            // Notifier TOUS les clients de la déconnexion
            io.emit('userLeft', socket.username, usernames)
        }
    })
})



serveurHTTP.listen(port, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${port}`)
    console.log(`🔌 Socket.IO prêt à accepter des connexions`)
})