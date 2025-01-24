import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Assicurati che sia configurato

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const endpoint = isLogin ? '/login' : '/register';
        const payload = isLogin
            ? { email, password }
            : { email, username, password };

        api.post(endpoint, payload)
            .then((response) => {
                if (isLogin) {
                    // Salva il token JWT
                    localStorage.setItem('token', 'Bearer ' + response.data.access_token);
                    alert('Login effettuato con successo!');
                    
                    // Reindirizza alla homepage
                    navigate('/');
                    
                    // Ricarica la pagina dopo il redirect
                    window.location.reload();
                } else {
                    alert('Registrazione completata! Ora puoi accedere.');
                    setIsLogin(true); // Passa alla modalità login
                }
            })
            .catch((error) => {
                console.error('Errore:', error);
                alert('Si è verificato un errore. Riprova.');
            });
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">
                {isLogin ? 'Accedi' : 'Registrati'}
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    {isLogin ? 'Accedi' : 'Registrati'}
                </button>
            </form>
            <button
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-blue-500 hover:underline"
            >
                {isLogin
                    ? 'Non hai un account? Registrati'
                    : 'Hai già un account? Accedi'}
            </button>
        </div>
    );
};

export default AuthForm;
