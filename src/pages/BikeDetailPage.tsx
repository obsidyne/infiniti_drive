import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Gauge, Settings, Shield, Heart } from 'lucide-react';
import { bikes } from '../data/bikes';

const BikeDetailPage = () => {
  const { id } = useParams();
  const bike = bikes.find(b => b.id === parseInt(id || '0'));

  console.log(bike?.image)

  if (!bike) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Bike not found</h1>
          <Link
            to="/catalogue"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors duration-300"
          >
            Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/catalogue"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Catalogue
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <img
              src={`/${bike.image}`}
              alt={bike.name}
              className="w-full h-96 lg:h-[500px] object-cover rounded-lg shadow-2xl"
            />
            <button className="absolute top-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors duration-300">
              <Heart className="h-6 w-6" />
            </button>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{bike.name}</h1>
              <p className="text-xl text-gray-400">{bike.brand}</p>
            </div>

            <div className="text-3xl font-bold text-blue-400 mb-8">
              Rs. {bike.price.toLocaleString()}
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                <Calendar className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Year</p>
                  <p className="text-white font-semibold">{bike.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                <User className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Owner</p>
                  <p className="text-white font-semibold">{bike.owner}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                <Gauge className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">KM Driven</p>
                  <p className="text-white font-semibold">{bike.kmDriven.toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800 rounded-lg">
                <Settings className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Engine</p>
                  <p className="text-white font-semibold">{bike.specs.engine}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Specifications</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Engine:</span>
                    <span className="text-white">{bike.specs.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Power:</span>
                    <span className="text-white">{bike.specs.power}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fuel Type:</span>
                    <span className="text-white">{bike.specs.fuelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transmission:</span>
                    <span className="text-white">{bike.specs.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Speed:</span>
                    <span className="text-white">{bike.specs.maxSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mileage:</span>
                    <span className="text-white">{bike.specs.mileage}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Description</h2>
              <p className="text-gray-400 leading-relaxed">
                {bike.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                               rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 
                               transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Schedule Test Drive
              </button>
              <button className="flex-1 px-6 py-4 border-2 border-gray-600 text-white rounded-lg font-semibold 
                               hover:border-green-400 hover:bg-green-400/10 transform hover:scale-105 
                               transition-all duration-300 flex items-center justify-center">
                <Shield className="h-5 w-5 mr-2" />
                Get Financing
              </button>
            </div>

            {/* Contact Info */}
            <div className="mt-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-3">Need More Information?</h3>
              <p className="text-gray-400 mb-4">Contact our sales team for detailed information about this bike.</p>
              <Link
                to="/contact"
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 
                         text-white rounded-lg transition-colors duration-300"
              >
                Contact Sales Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BikeDetailPage;