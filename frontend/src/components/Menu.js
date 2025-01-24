import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../api'; // Assicurati che `api` punti al tuo modulo Axios configurato

const Menu = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Estrai il token fuori dal useEffect

        if (token) {
            const jwtToken = token.startsWith('Bearer ') ? token.slice(7) : token;

            try {
                const decoded = jwtDecode(jwtToken); // Decodifica il token JWT
                const userId = decoded.sub; // Ottieni l'ID dell'utente (sub)

                // Richiesta al backend per ottenere lo username
                api.get(`/user/${userId}`) // Modifica se necessario per il tuo endpoint
                    .then(response => {
                        setUsername(response.data.username); // Imposta lo username
                    })
                    .catch(error => {
                        console.error('Errore nel recupero dello username:', error);
                    });
            } catch (error) {
                console.error('Errore nella decodifica del token:', error);
            }
        } else {
            setUsername(null); // Se non esiste un token, resetta lo username
        }
    }, []); // Rimuovi `localStorage.getItem('token')` come dipendenza

    // Funzione per il logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Rimuove il token JWT
        setUsername(null); // Reset dello stato dell'username
        navigate('/auth'); // Redirige alla pagina di login
    };

    // Funzione per il login o il profilo
    const handleAuthClick = () => {
        if (username) {
            navigate('/profile'); // Vai al profilo
        } else {
            navigate('/auth'); // Vai alla pagina di autenticazione
        }
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            {/* Logo */}
            <div onClick={() => navigate('/')} className="cursor-pointer">
                <img
                    src="/LOGO3.png" // Percorso dell'immagine del logo
                    alt="Logo"
                    className="w-auto h-10" // Altezza personalizzata e larghezza automatica
                />
            </div>  
            {/* Azioni utente */}
            <div>
                {/* Bottone per login o profilo */}
                <button
                    onClick={handleAuthClick}
                    className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600 capitalize mr-4"
                >
                    {username ? `Profilo` : 'Accedi'}
                </button>

                {/* Bottone di logout */}
                {username && (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                )}
            </div>
        </div>
    );
};

export default Menu;
