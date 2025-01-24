// Footer.js

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto text-center">
                {/* Link al sito */}
                <div className="mb-4">
                    <Link to="/" className="text-white hover:text-blue-400">Home</Link> | 
                    <Link to="/about" className="text-white hover:text-blue-400"> About</Link> | 
                    <Link to="/contact" className="text-white hover:text-blue-400"> Contact</Link>
                </div>
                
                {/* Social media */}
                <div className="mb-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
                        Facebook
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
                        Instagram
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2 text-white hover:text-blue-400">
                        Twitter
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Nome della tua attività. Tutti i diritti riservati.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
