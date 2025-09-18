import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import { bikes } from '../data/bikes';

const CataloguePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterBrand, setFilterBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const brands = [...new Set(bikes.map(bike => bike.brand))];

  console.log(bikes)

  const filteredAndSortedBikes = useMemo(() => {
    let filtered = bikes.filter(bike => 
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
  }, [searchTerm, sortBy, filterBrand, priceRange]);

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
          {/* Background glow */}
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
              {/* Input glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-3 group">
              <SortAsc className="text-gray-400 h-5 w-5 group-hover:text-blue-400 transition-colors duration-300" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
              {/* Button glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <Filter className="h-5 w-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
              <span className="font-semibold relative z-10">Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-8 pt-8 border-t border-gray-600/30 relative">
              {/* Animated expand effect */}
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
                      Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
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
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                        className="w-full px-4 py-3 bg-gray-700/80 backdrop-blur-sm border border-gray-600/50 rounded-xl text-white placeholder-gray-400
                                 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400/50 hover:border-gray-500/70 transition-all duration-300
                                 shadow-lg hover:shadow-blue-500/10"
                      />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setFilterBrand('');
                        setPriceRange([0, 50000]);
                        setSortBy('name');
                      }}
                      className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600
                               rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105
                               shadow-lg hover:shadow-xl hover:shadow-red-500/25 group relative overflow-hidden"
                    >
                      {/* Button glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-pink-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <span className="relative z-10">Clear Filters</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Filter card glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur opacity-50 -z-10"></div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-600/30 shadow-lg">
            <p className="text-gray-300 font-medium">
              Showing <span className="text-green-400 font-bold">{filteredAndSortedBikes.length}</span> of <span className="text-blue-400 font-bold">{bikes.length}</span> bikes
            </p>
          </div>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedBikes.map((bike, index) => (
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
                {/* Card glow effect */}
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
                
                {/* Hover shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredAndSortedBikes.length === 0 && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto p-12 bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl border border-gray-600/30 shadow-2xl relative overflow-hidden">
              {/* Background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-orange-500/5"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-orange-400 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <Search className="h-10 w-10 text-white" />
                </div>
                
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  No bikes found matching your criteria. Try adjusting your filters or search terms.
                </p>
                
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterBrand('');
                    setPriceRange([0, 50000]);
                    setSortBy('name');
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600
                           rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105
                           shadow-lg hover:shadow-xl hover:shadow-green-500/25 group relative overflow-hidden"
                >
                  {/* Button glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">Clear All Filters</span>
                </button>
              </div>
              
              {/* Card glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-2xl blur opacity-50 -z-10"></div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style >{`
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