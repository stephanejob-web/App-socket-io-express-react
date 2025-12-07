import { Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { ScoreProvider } from './context/ScoreContext'
import Home from './pages/Home'
import Chat from './pages/Chat'
import LearnReact from './pages/LearnReact'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'

function App() {
    return (
        <AppProvider>
            <ScoreProvider>
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
            </ScoreProvider>
        </AppProvider>
    )
}

export default App
