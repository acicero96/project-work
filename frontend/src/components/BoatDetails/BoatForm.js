// BoatForm.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import Gallery from './Gallery';
import BoatDescription from './BoatDescription'; // Importa il nuovo componente

const BoatForm = () => {
    const { boatName } = useParams(); // Recupera il nome della barca dalla URL
    const [date, setDate] = useState('');
    const [images, setImages] = useState([]);
    const [prenotazioni, setPrenotazioni] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [boatDescription, setBoatDescription] = useState('');
    const navigate = useNavigate();

    
    useEffect(() => {
        // Oggetto che mappa le barche alle loro immagini e descrizioni
        const boatImages = {
            'Riva 88': ['barche/Riva88_1.jpeg', 'barche/Riva88_2.jpeg', 'barche/Riva88_3.jpeg'],
            'Cranchi 62': ['barche/Cranchi62_1.jpeg', 'barche/Cranchi62_2.jpeg', 'barche/Cranchi62_3.jpeg'],
            'Sacs Strider 15': ['barche/SacsStrider15_1.jpeg', 'barche/SacsStrider15_2.jpeg'],
            'Emotion 36': ['barche/Emotion36_1.jpeg', 'barche/Emotion36_2.jpeg', 'barche/Emotion36_3.jpeg'],
            'Lomac Granturismo 14.0': ['barche/LomacGranturismo14_1.jpeg', 'barche/LomacGranturismo14_2.jpeg', 'barche/LomacGranturismo14_3.jpeg'],
            'Pershing Yacht Gtx116': ['barche/Gtx116_1.jpeg', 'barche/Gtx116_2.jpeg', 'barche/Gtx116_3.jpeg'],
            'Ferretti 62 Anniversary': ['barche/Ferretti62_1.webp', 'barche/Ferretti62_2.webp', 'barche/Ferretti62_3.webp'],
        };
    
        const boatDescriptions = {
            'Riva 88': 'Uno yacht di lusso che combina eleganza e prestazioni. Offre ampi spazi sia interni che esterni, con finiture di alta qualità e tecnologie avanzate per garantire comfort e sicurezza durante la navigazione.',
            'Cranchi 62': 'Un flybridge yacht di 20,23 metri con una prua verticale distintiva. Presenta un design che crea continuità tra interno ed esterno, con ampi spazi abitativi e una capacità massima di 16 persone',
            'Sacs Strider 15': "Un gommone di lusso di circa 15 metri, noto per le sue prestazioni e il design sportivo. Offre ampi spazi per il relax e la socializzazione, con interni personalizzabili e tecnologie moderne per un'esperienza di navigazione superiore.",
            'Emotion 36': 'Un gommone di lusso progettato per unire prestazioni eccezionali e comfort. Con una capacità ideale per gruppi di amici o famiglie, Emotion 36 si distingue per il suo design elegante, materiali di alta qualità e motori potenti che garantiscono una navigazione fluida. Gli ampi spazi prendisole e le aree sociali a bordo offrono un’esperienza unica per escursioni o giornate di relax in mare.',
            'Lomac Granturismo 14.0': 'Un gommone di alta gamma progettato per combinare comfort e prestazioni. Offre ampi spazi a bordo, finiture di qualità e una navigazione stabile, ideale per lunghe giornate in mare.',
            'Pershing Yacht Gtx116': "Uno yacht sportivo che unisce velocità e lusso. Dotato di cabine spaziose e aree sociali sia interne che sul ponte, offre un'esperienza di navigazione confortevole e ad alte prestazioni.",
            'Ferretti 62 Anniversary': 'Ferretti 62 è un motoryacht di lusso che rappresenta un connubio perfetto tra eleganza e funzionalità. Progettato per crociere lunghe e rilassanti, offre ampi spazi a bordo, inclusi una cabina armatoriale spaziosa, cabine ospiti confortevoli e una zona living raffinata. Il design della plancia di comando e le linee aerodinamiche lo rendono ideale per navigare in totale sicurezza e comfort. Perfetto per famiglie o piccoli gruppi che desiderano vivere un’esperienza esclusiva in mare.',
        };
        
        // Imposta le immagini e la descrizione della barca corrente
        if (boatImages[boatName]) {
            setImages(boatImages[boatName]);
        } else {
            setImages([]); // Nessuna immagine disponibile
        }
    
        if (boatDescriptions[boatName]) {
            setBoatDescription(boatDescriptions[boatName]);
        } else {
            setBoatDescription('Descrizione non disponibile.'); // Default description
        }
    
        // Recupera le prenotazioni per la barca corrente
        api.get(`/prenotazioni/${boatName}`)
            .then((response) => {
                setPrenotazioni(response.data.prenotazioni);
            })
            .catch((error) => {
                console.error('Errore durante il recupero delle prenotazioni:', error);
            });
    }, [boatName]); // Aggiungi boatImages e boatDescriptions come dipendenze
    
    const isDateAvailable = (date) => {
        return !prenotazioni.some((p) => new Date(p.data).toDateString() === date.toDateString());
    };

    const handleDateChange = (date) => {
        const formattedDate = format(date, 'yyyy-MM-dd');
        setDate(formattedDate);
        setSelectedDate(date);
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const isUnavailable = !isDateAvailable(date);
            return isUnavailable ? 'bg-red-500 text-white' : null;
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post('/prenotazioni', {
            servizio: boatName,
            data: date,
        })
            .then(() => {
                alert('Prenotazione effettuata!');
                navigate('/');
            })
            .catch((error) => {
                console.error('Errore durante la prenotazione:', error);
                alert('Errore durante la prenotazione.');
            });
    };

    return (
        <div className="w-full min-h-screen flex justify-center items-center p-4">
            <div className="w-full bg-white p-6 rounded-lg">
                {/* BoatDescription Component */}
                <BoatDescription name={boatName} description={boatDescription} />

                {/* Griglia con Galleria e Calendario + Form */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-24">
                    {/* Galleria a sinistra */}
                    <div className="col-1">
                        <Gallery images={images} />
                    </div>

                    {/* Calendario + Form a destra */}
                    <div className="flex flex-col">
                        <div className="flex justify-center mb-6 mx-6">
                            <Calendar
                                onChange={handleDateChange}
                                value={selectedDate}
                                tileClassName={tileClassName}
                                minDate={new Date()}
                                view="month"
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-10 flex justify-center">
                            <div>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hidden"
                                />
                                {!isDateAvailable(new Date(date)) && (
                                    <p className="text-red-500 text-sm">Data non disponibile</p>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={!isDateAvailable(new Date(date))}
                                className="w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                            >
                                Prenota
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoatForm;
