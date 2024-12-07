import PropTypes from 'prop-types';
import { createContext, useState, useContext, useMemo } from 'react';
import axios from 'src/lib/axios';

// Create a context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);

    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const login = async ({ email, password }) => {
        const { data } = await axios.post('/api/login', {
            email,
            password,
        });

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data);
        setIsAuthenticated(true);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const logout = async () => {
        await axios.post('/api/logout');
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
    };

    const contextValues = useMemo(
        () => ({ user, isAuthenticated, login, logout }),
        [user, isAuthenticated, login, logout]
    );

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};