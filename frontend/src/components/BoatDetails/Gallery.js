import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Importa le icone da React Icons

const Gallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Funzione per spostarsi all'immagine precedente (carosello infinito)
    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    // Funzione per spostarsi all'immagine successiva (carosello infinito)
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="relative mb-6">
            <div className="relative w-full overflow-hidden">
                <div
                    className="relative flex transition-transform duration-500 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`, // Movimento orizzontale tra le immagini
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-full flex items-center justify-center" // Centrare le immagini verticalmente
                            style={{
                                transform: `scale(${index === currentIndex ? 1 : 0.7}) 
                                            translate3d(${index < currentIndex ? '-50%' : index > currentIndex ? '50%' : '0%'}, 0, 0)`,
                                transition: 'transform 0.5s ease', // Transizione fluida
                            }}
                        >
                            <img
                                src={`/${image}`}
                                alt={`Immagine ${index + 1}`}
                                className="w-full object-cover rounded-lg"
                                style={{
                                    objectFit: 'contain', // Adatta l'immagine senza distorcerla
                                    maxHeight: '50vh', // Limita l'altezza massima per evitare che le immagini siano troppo grandi
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Indicatori di posizione delle immagini */}
            <div className="flex justify-center mt-4">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 mx-1 rounded-full ${currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                    ></button>
                ))}
            </div>

            {/* Bottoni di navigazione posizionati esternamente */}
            <div className="absolute top-1/2 left-0 right-0 flex justify-between px-8 transform -translate-y-1/2 z-10">
                <button
                    onClick={prevImage}
                    className="text-blue-950 p-3 "
                    style={{
                        marginLeft: '-75px', // Sposta il bottone più a sinistra
                    }}
                >
                    <FaChevronLeft className="text-3xl" />
                </button>
                <button
                    onClick={nextImage}
                    className="text-blue-950 p-3 "
                    style={{
                        marginRight: '-75px', // Sposta il bottone più a destra
                    }}
                >
                    <FaChevronRight className="text-3xl" />
                </button>
            </div>
        </div>
    );
};

export default Gallery;
