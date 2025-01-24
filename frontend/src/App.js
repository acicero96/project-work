import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Boats from './components/Boats';
import BoatForm from './components/BoatDetails/BoatForm';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import Menu from './components/Menu'; // Importa il componente Menu
import Footer from './components/Footer'; // Importa il footer
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="w-full h-full">
                <Menu /> {/* Menu visibile su tutte le pagine */}
                <div className="page-content">
                    <Routes>
                        <Route path="/" element={<Boats />} />
                        <Route path="/boat/:boatName" element={<BoatForm />} />
                        <Route path="/auth" element={<AuthForm />} />
                        <Route path="/profile" element={<Profile />} />
                    </Routes>
                </div>
                <Footer />
            </div>
            
        </Router>
    );
};

export default App;
