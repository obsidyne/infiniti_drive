import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Gauge, Settings, Shield, Heart, BedIcon } from 'lucide-react';
import { BASE_URL } from '../data/url';
import { useNavigate } from 'react-router-dom';

// Strapi API Response Types
interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  url: string;
}

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface StrapiBike {
  id: number;
  documentId: string;
  model_name: string;
  brand: string;
  description: string;
  distance_driven: string;
  year: string;
  owner: string;
  price: string;
  Engine: string;
  hp: string;
  torque: string;
  fuel_type: string;
  transmission: string;
  top_speed: string;
  milage: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  sold: boolean | null;
  thumpnail: StrapiImage | null;
  images: any;
}

interface StrapiBikeResponse {
  data: StrapiBike;
  meta: {};
}

// App Bike Type
interface Bike {
  id: number;
  name: string;
  brand: string;
  documentId : string ;
  description: string;
  kmDriven: number;
  year: number;
  owner: string;
  price: number;
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

const BikeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [bike, setBike] = useState<Bike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchBikeDetails = async (): Promise<void> => {
      if (!id) {
        setError('No bike ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}/api/bikes/${id}?populate=*`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch bike details');
        }

        const result: StrapiBikeResponse = await response.json();
        console.log(result)
        const bikeData = result.data;

        

        console.log(bikeData)

        // Transform Strapi data to match component structure
        const transformedBike: Bike = {
          id: bikeData.id,
          name: bikeData.model_name,
          brand: bikeData.brand,
          description: bikeData.description,
          documentId: bikeData.documentId,
          kmDriven: parseInt(bikeData.distance_driven) || 0,
          year: parseInt(bikeData.year) || 0,
          owner: bikeData.owner,
          price: parseInt(bikeData.price) || 0,
          engine: bikeData.Engine,
          hp: bikeData.hp,
          torque: bikeData.torque,
          fuelType: bikeData.fuel_type,
          transmission: bikeData.transmission,
          topSpeed: parseInt(bikeData.top_speed) || 0,
          mileage: parseInt(bikeData.milage) || 0,
          sold: bikeData.sold || false,
          image: bikeData.thumpnail?.url
            ? `${BASE_URL}${bikeData.thumpnail.url}`
            : null,
        };

        console.log(transformedBike)

        setBike(transformedBike);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchBikeDetails();
  }, [id]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl">Loading bike details...</p>
        </div>
      </div>
    );
  }

  // Error or Not Found State
  if (error || !bike) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-gray-800/60 border border-gray-600/30 rounded-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">
            {error || 'Bike not found'}
          </h1>
          <p className="text-gray-400 mb-6">
            The bike you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/catalogue"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 
                     hover:from-green-600 hover:to-blue-600 rounded-lg text-white font-semibold
                     transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/catalogue"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8 transition-colors duration-300 group"
        >
          <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Catalogue
        </Link>

        {/* Sold Badge */}
        {bike.sold && (
          <div className="mb-8 p-4 bg-red-900/30 border border-red-500/50 rounded-xl">
            <p className="text-red-400 text-center font-bold text-xl">
              🔴 THIS BIKE HAS BEEN SOLD
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
              <img
                src={bike.image || '/placeholder-bike.jpg'}
                alt={bike.name}
                className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-bike.jpg';
                }}
              />
              {bike.sold && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <div className="bg-red-600 text-white px-12 py-6 rounded-xl font-bold text-3xl transform -rotate-12 shadow-2xl">
                    SOLD
                  </div>
                </div>
              )}
              <button className="absolute top-4 right-4 p-3 bg-black/50 rounded-full text-white hover:bg-black/70 hover:text-red-400 transition-all duration-300 group/heart">
                <Heart className="h-6 w-6 group-hover/heart:scale-110 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Details */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {bike.name}
              </h1>
              <p className="text-xl text-gray-400 capitalize">{bike.brand}</p>
            </div>

            <div className="text-3xl font-bold text-blue-400 mb-8">
              ₹{bike.price.toLocaleString()}
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30 hover:border-green-500/50 transition-all duration-300">
                <Calendar className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Year</p>
                  <p className="text-white font-semibold">{bike.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30 hover:border-green-500/50 transition-all duration-300">
                <User className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Owner</p>
                  <p className="text-white font-semibold">{bike.owner}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300">
                <Gauge className="h-6 w-6 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">KM Driven</p>
                  <p className="text-white font-semibold">
                    {bike.kmDriven.toLocaleString()} km
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30 hover:border-green-500/50 transition-all duration-300">
                <Settings className="h-6 w-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Engine</p>
                  <p className="text-white font-semibold">{bike.engine}</p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Specifications
              </h2>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Engine:</span>
                    <span className="text-white font-medium">{bike.engine}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Power:</span>
                    <span className="text-white font-medium">{bike.hp}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Torque:</span>
                    <span className="text-white font-medium">{bike.torque}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Fuel Type:</span>
                    <span className="text-white font-medium capitalize">
                      {bike.fuelType}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Transmission:</span>
                    <span className="text-white font-medium">{bike.transmission}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-700/50">
                    <span className="text-gray-400">Top Speed:</span>
                    <span className="text-white font-medium">{bike.topSpeed} km/h</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Mileage:</span>
                    <span className="text-white font-medium">{bike.mileage} km/l</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Description
              </h2>
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
                <p className="text-gray-300 leading-relaxed">{bike.description}</p>
              </div>
            </div>

            {/* Action Buttons */}
            {!bike.sold && (
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button onClick={()=>{navigate("/contact")}} className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                                 rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 
                                 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                                 hover:shadow-green-500/25 relative overflow-hidden group">
                  <span className="relative z-10">Schedule Test Drive</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="flex-1 px-6 py-4 border-2 border-gray-600 text-white rounded-xl font-semibold 
                                 hover:border-green-400 hover:bg-green-400/10 transform hover:scale-105 
                                 transition-all duration-300 flex items-center justify-center group">
                  <Shield className="h-5 w-5 mr-2 group-hover:text-green-400 transition-colors duration-300" />
                  Get Financing
                </button>
              </div>
            )}

            {/* Contact Info */}
            <div className="p-6 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-600/30">
              <h3 className="text-lg font-semibold text-white mb-3">
                Need More Information?
              </h3>
              <p className="text-gray-400 mb-4">
                Contact our sales team for detailed information about this bike.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500
                         hover:from-green-600 hover:to-blue-600 text-white rounded-lg font-semibold
                         transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
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