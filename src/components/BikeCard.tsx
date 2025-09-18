import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Gauge, Eye } from 'lucide-react';

interface BikeProps {
  bike: {
    id: number;
    name: string;
    brand: string;
    price: number;
    year: number;
    owner: string;
    kmDriven: number;
    image: string;
    specs: {
      engine: string;
      power: string;
      fuelType: string;
      transmission: string;
      maxSpeed: string;
      mileage: string;
    };
    description: string;
  };
  featured?: boolean;
}

const BikeCard: React.FC<BikeProps> = ({ bike, featured = false }) => {
  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 
                    transition-all duration-300 group ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
                       group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
            {bike.year}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold rounded">
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors duration-300">
            {bike.name}
          </h3>
          <p className="text-gray-400 text-sm">{bike.brand}</p>
        </div>

        <div className="text-2xl font-bold text-blue-400 mb-4">
          ${bike.price.toLocaleString()}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <Calendar className="h-4 w-4" />
            <span>{bike.year}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <User className="h-4 w-4" />
            <span>{bike.owner}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <Gauge className="h-4 w-4" />
            <span>{bike.kmDriven.toLocaleString()} km</span>
          </div>
        </div>

        {/* Specs Preview */}
        <div className="bg-gray-700 rounded-lg p-3 mb-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-400">Engine:</span>
              <span className="text-white ml-1">{bike.specs.engine}</span>
            </div>
            <div>
              <span className="text-gray-400">Power:</span>
              <span className="text-white ml-1">{bike.specs.power}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Link
          to={`/bike/${bike.id}`}
          className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                   rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                   transition-all duration-300 flex items-center justify-center group/btn"
        >
          <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BikeCard;