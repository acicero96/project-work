import React, { useEffect, useState } from 'react';
import api from '../api'; // Axios configurato
import { boats } from './Boats'; // Importa la lista delle barche

const Profile = () => {
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [editingPrenotazione, setEditingPrenotazione] = useState(null);
    const [newData, setNewData] = useState({ data: '', barcaId: '' });

    useEffect(() => {
        // Recupera le prenotazioni dell'utente
        api.get('/prenotazioni')
            .then((response) => {
                console.log(response.data);  // Log della risposta per verifica
                setPrenotazioni(response.data.prenotazioni);  // Assicurati che la risposta sia strutturata correttamente
            })
            .catch((error) => {
                console.error('Errore nel recupero delle prenotazioni:', error);
            });
    }, []);

    // Funzione per modificare la prenotazione
    const handleModify = (prenotazioneId) => {
        setEditingPrenotazione(prenotazioneId);
        const prenotazione = prenotazioni.find(p => p.id === prenotazioneId);
        setNewData({ data: prenotazione.data, barcaId: prenotazione.barcaId });
    };

    const handleUpdate = (prenotazioneId) => {
        api.put(`/prenotazioni/${prenotazioneId}`, newData)
            .then(response => {
                console.log('Prenotazione aggiornata:', response.data);
                setPrenotazioni(prev => prev.map(p => p.id === prenotazioneId ? { ...p, ...newData } : p));
                setEditingPrenotazione(null);
            })
            .catch(error => {
                console.error('Errore nell\'aggiornamento della prenotazione:', error);
            });
    };

    // Funzione per eliminare la prenotazione
    const handleDelete = (prenotazioneId) => {
        api.delete(`/prenotazioni/${prenotazioneId}`)
            .then(response => {
                console.log('Prenotazione eliminata:', response.data);
                setPrenotazioni(prev => prev.filter(p => p.id !== prenotazioneId));
            })
            .catch(error => {
                console.error('Errore nell\'eliminazione della prenotazione:', error);
            });
    };

    return (
        <div className="w-full min-h-screen flex-col justify-center items-start p-4">
            <h1 className="text-7xl font-bold mb-4 text-blue-950">Le Tue Prenotazioni</h1>
            <hr className="my-5 bg-blue-950 h-px border-0" />
            {prenotazioni.length > 0 ? (
                <ul className="space-y-4">
                    {prenotazioni.map((p) => (
                        <li key={p.id} className="border p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold">{p.servizio}</h2>
                            <p>Data: {p.data}</p>

                            {/* Modifica e Elimina pulsanti */}
                            <div className="mt-4 flex space-x-4">
                                <button
                                    onClick={() => handleModify(p.id)}
                                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                                >
                                    Modifica
                                </button>
                                <button
                                    onClick={() => handleDelete(p.id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Elimina
                                </button>
                            </div>

                            {/* Modifica prenotazione */}
                            {editingPrenotazione === p.id && (
                                <div className="mt-4">

                                    <input
                                        type="date" // Cambiato da "text" a "date"
                                        placeholder="Nuova data"
                                        value={newData.data}
                                        onChange={(e) => setNewData({ ...newData, data: e.target.value })}
                                        className="px-4 py-2 border rounded mb-2 w-full"
                                    />
                                    
                                    {/* Selezione della barca */}
                                    <select
                                        value={newData.servizio}
                                        onChange={(e) => setNewData({ ...newData, servizio: e.target.value })}
                                        className="px-4 py-2 border rounded mb-2 w-full"
                                    >
                                        <option value="">Seleziona una barca</option>
                                        {boats.map((boat) => (
                                            <option key={boat.id} value={boat.name}>{boat.name}</option> // Passa il nome della barca
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => handleUpdate(p.id)}
                                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        Aggiorna
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">Non hai ancora effettuato prenotazioni.</p>
            )}
        </div>
    );
};

export default Profile;
