// BoatDescription.js

import React from 'react';

const BoatDescription = ({ name, description }) => {
    return (
        <div className="flex mb-8">
            {/* Colonna per il nome della barca */}
            <div className="w-1/2 pr-6">
                <h2 className="text-8xl text-blue-950 font-bold">{name}</h2>
                <hr className="my-5 bg-blue-950 h-px border-0" />
            </div>
            
            {/* Colonna per la descrizione della barca */}
            <div className="w-1/2">
                <p className="text-lg text-gray-700">{description}</p>
            </div>
        </div>
    );
};

export default BoatDescription;
