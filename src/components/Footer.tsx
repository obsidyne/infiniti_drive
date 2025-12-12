import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bike, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(path);
  };

  return (
    <footer className="bg-gray-800 border-t border-gray-700 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <button 
              onClick={() => handleNavigation('/')} 
              className="flex items-center space-x-2 mb-4 cursor-pointer"
            >
              <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Infiniti Drive
              </span>
            </button>
            <p className="text-gray-400 mb-6 max-w-md">
            Explore Our Curated Portfolio of Exceptional Pre-Owned Motorcycles.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleNavigation('/')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/about')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/catalogue')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                >
                  Catalogue
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleNavigation('/contact')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4" />
                <span>+91 7091691660</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4" />
                <span>info@infinitidrive.com</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>GWX5+PFH, Sreekariyam - Kazhakuttam Rd, Ambady Nagar, Amadi Nagar, Sreekariyam, Thiruvananthapuram, Kerala 695017</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 flex flex-row justify-between">
          <p>&copy; 2025 Infiniti Drive. All rights reserved.</p>
          <p className="mt-2">
            Made with <span className="text-red-400">♥</span> by{' '}
            <a 
              href="https://www.obsidyne.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-400 hover:text-green-300 transition-colors duration-300"
            >
              Obsidyne
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;