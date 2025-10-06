import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Gauge, Eye } from 'lucide-react';

// import { Router } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


interface Bike {
  id: number;
  name: string;
  brand: string;
  description: string;
  kmDriven: number;
  year: number;
  owner: string;
  price: number;
  documentId : string ,
  engine: string;
  hp: string;
  torque: string;
  fuelType: string;
  transmission: string;
  topSpeed: number;
  mileage: number;
  sold: boolean;
  image: string | null;
}

interface BikeCardProps {
  bike: Bike;
  featured?: boolean;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike, featured = false }) => {

  const navigate = useNavigate()
  // const router = useR

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 
                    transition-all duration-300 group relative ${featured ? 'ring-2 ring-blue-500' : ''}`}>
      {/* Sold Overlay */}
      {bike.sold && (
        <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center">
          <div className="bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-2xl transform -rotate-12 shadow-2xl">
            SOLD
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={bike.image || '/placeholder-bike.jpg'}
          alt={bike.name}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-bike.jpg';
          }}
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
          <p className="text-gray-400 text-sm capitalize">{bike.brand}</p>
        </div>

        <div className="text-2xl font-bold text-blue-400 mb-4">
          ₹{bike.price.toLocaleString()}
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
              <span className="text-white ml-1">{bike.engine}</span>
            </div>
            <div>
              <span className="text-gray-400">Power:</span>
              <span className="text-white ml-1">{bike.hp}</span>
            </div>
            <div>
              <span className="text-gray-400">Fuel:</span>
              <span className="text-white ml-1 capitalize">{bike.fuelType}</span>
            </div>
            <div>
              <span className="text-gray-400">Mileage:</span>
              <span className="text-white ml-1">{bike.mileage} km/l</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {bike.sold ? (
          <button
            disabled
            className="w-full px-4 py-3 bg-gray-600 text-gray-400 rounded-lg font-semibold 
                     cursor-not-allowed flex items-center justify-center opacity-50"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </button>
        ) : (
          <button
            onClick={ 
              
              
              ()=>{ 
                
                console.log("clicked")
                navigate(`/bike/${bike.documentId}`)  
            
            } }
            className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                     rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                     transition-all duration-300 flex items-center justify-center group/btn "
          >
            <Eye className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" />
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default BikeCard;