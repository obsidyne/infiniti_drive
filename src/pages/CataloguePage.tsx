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
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Our Catalogue
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse our extensive collection of quality second-hand bikes
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search bikes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2">
              <SortAsc className="text-gray-400 h-5 w-5" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white 
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="flex items-center space-x-2 px-4 py-3 bg-green-600 hover:bg-green-700 
                       rounded-lg text-white transition-colors duration-300"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Brand Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Brand</label>
                  <select
                    value={filterBrand}
                    onChange={(e) => setFilterBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price Range: Rs.{priceRange[0]} - Rs.{priceRange[1]}
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 50000])}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white 
                             transition-colors duration-300"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-400">
            Showing {filteredAndSortedBikes.length} of {bikes.length} bikes
          </p>
        </div>

        {/* Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedBikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>

        {filteredAndSortedBikes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No bikes found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterBrand('');
                setPriceRange([0, 50000]);
                setSortBy('name');
              }}
              className="mt-4 px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white 
                       transition-colors duration-300"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CataloguePage;