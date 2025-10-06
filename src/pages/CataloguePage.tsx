import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, SortAsc, EyeOff, Eye } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import { BASE_URL } from '../data/url';

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

interface StrapiResponse {
  data: StrapiBike[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// App Bike Type
interface Bike {
  id: number;
  name: string;
  brand: string;
  description: string;
  kmDriven: number;
  year: number;
  owner: string;
  documentId: string ,
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

type SortOption = 'name' | 'price-low' | 'price-high' | 'year-new' | 'year-old' | 'km-low' | 'km-high';

const CataloguePage: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBrand, setFilterBrand] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showSoldBikes, setShowSoldBikes] = useState<boolean>(true);

  // Fetch bikes from Strapi API
  useEffect(() => {
    const fetchBikes = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/api/bikes?populate=*`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch bikes');
        }
        
        const result: StrapiResponse = await response.json();

        console.log(result)
        
        // Transform Strapi data to match component structure
        const transformedBikes: Bike[] = result.data.map((bike: StrapiBike) => ({
          id: bike.id,
          name: bike.model_name,
          brand: bike.brand,
          description: bike.description,
          kmDriven: parseInt(bike.distance_driven) || 0,
          year: parseInt(bike.year) || 0,
          owner: bike.owner,
          documentId : bike.documentId  , 
          price: parseInt(bike.price) || 0,
          engine: bike.Engine,
          hp: bike.hp,
          torque: bike.torque,
          fuelType: bike.fuel_type,
          transmission: bike.transmission,
          topSpeed: parseInt(bike.top_speed) || 0,
          mileage: parseInt(bike.milage) || 0,
          sold: bike.sold || false,
          image: bike.thumpnail?.url ? `${BASE_URL}${bike.thumpnail.url}` : null
        }));
        
        setBikes(transformedBikes);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchBikes();
  }, []);

  const brands: string[] = [...new Set(bikes.map(bike => bike.brand))];

  // Separate bikes into available and sold
  const { availableBikes, soldBikes } = useMemo(() => {
    const available = bikes.filter(bike => !bike.sold);
    const sold = bikes.filter(bike => bike.sold);
    return { availableBikes: available, soldBikes: sold };
  }, [bikes]);

  const filterAndSortBikes = (bikesToFilter: Bike[]): Bike[] => {
    let filtered = bikesToFilter.filter(bike => 
      bike.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterBrand === '' || bike.brand === filterBrand) &&
      bike.price >= priceRange[0] && bike.price <= priceRange[1]
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'km-low':
          return a.kmDriven - b.kmDriven;
        case 'km-high':
          return b.kmDriven - a.kmDriven;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  };

  const filteredAvailableBikes = useMemo(() => 
    filterAndSortBikes(availableBikes), 
    [availableBikes, searchTerm, sortBy, filterBrand, priceRange]
  );

  const filteredSoldBikes = useMemo(() => 
    filterAndSortBikes(soldBikes), 
    [soldBikes, searchTerm, sortBy, filterBrand, priceRange]
  );

  const handleClearFilters = (): void => {
    setSearchTerm('');
    setFilterBrand('');
    setPriceRange([0, 5000000]);
    setSortBy('name');
  };

  if (loading) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-xl">Loading bikes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-red-900/20 border border-red-500/30 rounded-2xl">
          <p className="text-red-400 text-xl mb-4">Error loading bikes</p>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  interface BikeGridProps {
    bikes: Bike[];
    label: string;
  }

  const BikeGrid: React.FC<BikeGridProps> = ({ bikes, label }) => (
    <>
      {bikes.length > 0 && (
        <>
          <div className="mb-8">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-600/30 shadow-lg">
              <p className="text-gray-300 font-medium">
                {label}: <span className="text-green-400 font-bold">{bikes.length}</span> bikes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {bikes.map((bike, index) => (
              <div 
                key={bike.id}
                className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 group"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fadeInUp 0.6s ease-out forwards'
                }}
              >
                <div className="relative">
                  <BikeCard bike={bike} />
                  {/* <div className="absolute -inset-2 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div> */}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-green-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
            Our Catalogue
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Browse our extensive collection of quality second-hand bikes
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-500/50"></div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 shadow-2xl shadow-green-500/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-50"></div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center relative z-10">
            {/* Search */}
            <div className="relative flex-1 group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-hover:text-green-400 transition-colors duration-300" />
              <input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                         focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 hover:border-gray-500/70 transition-all duration-300 shadow-lg
                         hover:shadow-green-500/10 focus:shadow-green-500/20"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-3 group">
              <SortAsc className="text-gray-400 h-5 w-5 group-hover:text-blue-400 transition-colors duration-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-6 py-4 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white
                         focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 hover:border-gray-500/70 transition-all duration-300
                         shadow-lg hover:shadow-blue-500/10 focus:shadow-blue-500/20 cursor-pointer"
              >
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="km-low">KM: Low to High</option>
                <option value="km-high">KM: High to Low</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600
                       rounded-xl text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                       hover:shadow-green-500/25 group relative overflow-hidden border border-green-400/30"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Filter className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold relative z-10">Filters</span>
            </button>

            {/* Show/Hide Sold Bikes Toggle */}
            {soldBikes.length > 0 && (
              <button
                onClick={() => setShowSoldBikes(!showSoldBikes)}
                className="flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                         rounded-xl text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl
                         hover:shadow-purple-500/25 group relative overflow-hidden border border-purple-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {showSoldBikes ? (
                  <EyeOff className="h-5 w-5 relative z-10" />
                ) : (
                  <Eye className="h-5 w-5 relative z-10" />
                )}
                <span className="font-semibold relative z-10">
                  {showSoldBikes ? 'Hide' : 'Show'} Sold
                </span>
              </button>
            )}
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-600/30 relative">
              <div className="animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Brand Filter */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-green-400 transition-colors duration-300">Brand</label>
                    <select
                      value={filterBrand}
                      onChange={(e) => setFilterBrand(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white
                               focus:ring-2 focus:ring-green-500/50 focus:border-green-400/50 hover:border-gray-500/70 transition-all duration-300
                               shadow-lg hover:shadow-green-500/10 cursor-pointer"
                    >
                      <option value="">All Brands</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-300 mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      Price Range: Rs.{priceRange[0].toLocaleString()} - Rs.{priceRange[1].toLocaleString()}
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                                 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 hover:border-gray-500/70 transition-all duration-300
                                 shadow-lg hover:shadow-blue-500/10"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000000])}
                        className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                                 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 hover:border-gray-500/70 transition-all duration-300
                                 shadow-lg hover:shadow-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={handleClearFilters}
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
                               rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105
                               shadow-lg hover:shadow-xl hover:shadow-red-500/25 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Clear Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur opacity-50 -z-10"></div>
        </div>

        {/* Available Bikes Section */}
        <BikeGrid bikes={filteredAvailableBikes} label="Available Bikes" />

        {/* Sold Bikes Section */}
        {showSoldBikes && filteredSoldBikes.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">
                Sold Bikes
              </h2>
              <div className="flex justify-center">
                <div className="w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-400 rounded-full"></div>
              </div>
            </div>
            <BikeGrid bikes={filteredSoldBikes} label="Sold" />
          </div>
        )}

        {/* No Results */}
        {filteredAvailableBikes.length === 0 && filteredSoldBikes.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto p-12 bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl border border-gray-600/30 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  No bikes found matching your criteria. Try adjusting your filters or search terms.
                </p>
                
                <button
                  onClick={handleClearFilters}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600
                           rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105
                           shadow-lg hover:shadow-xl hover:shadow-green-500/25 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Clear All Filters</span>
                </button>
              </div>
              
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur opacity-50 -z-10"></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CataloguePage;