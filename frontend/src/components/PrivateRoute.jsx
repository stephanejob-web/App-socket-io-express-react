import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const PrivateRoute = ({ children }) => {
    const { token } = useApp()

    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default PrivateRoute
