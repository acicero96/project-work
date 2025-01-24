import React from 'react';
import { useNavigate } from 'react-router-dom';

export const boats = [
    { id: 1, name: 'Riva 88', photo_url: 'barche/Riva88_1.jpeg' },
    { id: 2, name: 'Cranchi 62', photo_url: 'barche/Cranchi62_2.jpeg' },
    { id: 3, name: 'Sacs Strider 15', photo_url: 'barche/SacsStrider15_1.jpeg' },
    { id: 4, name: 'Emotion 36', photo_url: 'barche/Emotion36_1.jpeg' },
    { id: 5, name: 'Lomac Granturismo 14.0', photo_url: 'barche/LomacGranturismo14_3.jpeg' },
    { id: 6, name: 'Pershing Yacht Gtx116', photo_url: 'barche/Gtx116_1.jpeg' },
    { id: 7, name: 'Ferretti 62 Anniversary', photo_url: 'barche/Ferretti62_3.webp' },
];

const Boats = () => {
    const navigate = useNavigate();
    const handleBoatClick = (boatName) => {
        navigate(`/boat/${boatName}`);
    };

    return (
        <div className="w-full h-full flex justify-center items-start p-4">
            <div className="w-full">
                {/* Prima riga con 2 barche */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                    {boats.slice(0, 2).map((boat) => (
                        <div
                            key={boat.id}
                            onClick={() => handleBoatClick(boat.name)}
                            className="relative border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <img
                                src={boat.photo_url}
                                alt={boat.name}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-lg font-semibold">{boat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Seconda riga con 3 barche */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    {boats.slice(2, 5).map((boat) => (
                        <div
                            key={boat.id}
                            onClick={() => handleBoatClick(boat.name)}
                            className="relative border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <img
                                src={boat.photo_url}
                                alt={boat.name}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-lg font-semibold">{boat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Terza riga con 2 barche */}
                <div className="grid grid-cols-2 gap-6">
                    {boats.slice(5, 7).map((boat) => (
                        <div
                            key={boat.id}
                            onClick={() => handleBoatClick(boat.name)}
                            className="relative border rounded-lg shadow-md hover:shadow-lg cursor-pointer"
                        >
                            <img
                                src={boat.photo_url}
                                alt={boat.name}
                                className="w-full h-64 object-cover rounded-md"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-lg font-semibold">{boat.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Boats;
