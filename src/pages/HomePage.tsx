import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Wrench, Users } from 'lucide-react';
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
  documentId : string , 
}

const HomePage: React.FC = () => {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
        
        // Transform Strapi data to match component structure
        const transformedBikes: Bike[] = result.data.map((bike: StrapiBike) => ({
          id: bike.id,
          name: bike.model_name,
          brand: bike.brand,
          description: bike.description,
          kmDriven: parseInt(bike.distance_driven) || 0,
          year: parseInt(bike.year) || 0,
          owner: bike.owner,
          price: parseInt(bike.price) || 0,
          engine: bike.Engine,
          hp: bike.hp,
          torque: bike.torque,
          documentId : bike.documentId ,
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

  // Get featured bikes (first 3 available bikes)
  const featuredBikes = bikes.filter(bike => !bike.sold).slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0">
          <img 
            src="s1000rr.jpg"
            alt="Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 bg-clip-text text-transparent --animate-pulse">
            iNFINITi DRIVES
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Discover premium second-hand bikes with unmatched quality and reliability. 
            Your perfect ride awaits.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalogue"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold 
                       hover:from-green-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 
                       shadow-lg hover:shadow-xl flex items-center justify-center group"
            >
              View Catalogue
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-gray-600 text-white rounded-lg font-semibold 
                       hover:border-green-400 hover:bg-green-400/10 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                About Infiniti Drive
              </h2>
              <div className="space-y-6">
                <p className="text-gray-300 text-lg leading-relaxed drop-shadow-sm">
                  With over years of experience in the motorcycle industry, Infiniti Drive has established 
                  itself as the most trusted name in second-hand bike sales. We specialize in providing 
                  high-quality, thoroughly inspected motorcycles that deliver exceptional value and reliability.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed drop-shadow-sm">
                  Our commitment to transparency, quality assurance, and customer satisfaction has helped 
                  thousands of riders find their perfect bike. Every motorcycle in our inventory undergoes 
                  rigorous inspection and comes with comprehensive warranty protection.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { number: "5000+", label: "Bikes Sold", color: "green" },
                  { number: "15+", label: "Years Experience", color: "blue" },
                  { number: "3000+", label: "Happy Customers", color: "green" },
                  { number: "25+", label: "Locations", color: "blue" }
                ].map((stat, index) => (
                  <div 
                    key={index}
                    className="text-center p-6 bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-xl 
                             border border-gray-600/30 hover:border-gray-500/50 transform hover:scale-105 transition-all duration-300
                             hover:shadow-xl hover:shadow-green-500/10 group"
                  >
                    <div className={`text-3xl font-bold ${stat.color === 'green' ? 'text-green-400' : 'text-blue-400'} 
                                   mb-2 group-hover:drop-shadow-lg transition-all duration-300`}>
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                         rounded-xl font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 
                         transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-green-500/25 group
                         border border-green-400/20 hover:border-green-400/40"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl group">
                <img 
                  src="z900.jpg"
                  alt="About Infiniti Drive"
                  className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 group-hover:from-green-500/30 group-hover:to-blue-500/30 transition-all duration-300"></div>
                <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl"></div>
                
                {/* Glowing border effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, #10b981 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Floating orbs */}
        <div className="absolute top-40 left-10 w-32 h-32 bg-green-500/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-40 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl animate-bounce delay-700"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent
                         drop-shadow-sm">
              Why Choose Infiniti Drive?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              We provide exceptional service and quality assurance for every bike in our collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8" />,
                title: "Quality Assured",
                description: "Every bike is thoroughly inspected and certified for quality.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Warranty Protection",
                description: "Comprehensive warranty coverage for peace of mind.",
                gradient: "from-blue-400 to-purple-500"
              },
              {
                icon: <Wrench className="h-8 w-8" />,
                title: "Expert Service",
                description: "Professional maintenance and repair services available.",
                gradient: "from-green-400 to-teal-500"
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Trusted by Thousands",
                description: "Join our community of satisfied customers nationwide.",
                gradient: "from-pink-400 to-red-500"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm
                         border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 
                         transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl group
                         hover:shadow-green-500/10 relative overflow-hidden"
              >
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${feature.gradient}
                              rounded-2xl mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300
                              group-hover:scale-110 relative z-10`}>
                  {feature.icon}
                  {/* Icon glow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
                </div>
                
                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300 relative z-10">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{feature.description}</p>
                
                {/* Hover border glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        {/* Dynamic background pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-radial from-green-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-radial from-blue-500/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-green-400/30 rounded-full animate-pulse"
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
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent
                         drop-shadow-sm animate-pulse">
              Featured Bikes
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Check out our handpicked selection of premium bikes available now.
            </p>
            
            {/* Decorative line */}
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-500/50"></div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-300 text-xl">Loading bikes...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto p-8 bg-red-900/20 border border-red-500/30 rounded-2xl">
                <p className="text-red-400 text-xl mb-4">Error loading bikes</p>
                <p className="text-gray-300">{error}</p>
              </div>
            </div>
          )}

          {/* Bikes Grid */}
          {!loading && !error && featuredBikes.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredBikes.map((bike, index) => (
                  <div 
                    key={bike.id}
                    className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-3"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="relative group">
                      <BikeCard bike={bike} featured />
                      {/* Card glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-16">
                <Link
                  to="/catalogue"
                  className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                           rounded-xl font-bold text-lg hover:from-green-600 hover:to-blue-600 transform hover:scale-110 
                           transition-all duration-300 shadow-2xl hover:shadow-green-500/25 group relative overflow-hidden
                           border border-green-400/30 hover:border-green-400/60"
                >
                  {/* Button glow background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <span className="relative z-10">View All Bikes</span>
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                  
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
                </Link>
              </div>
            </>
          )}

          {/* No Bikes Available */}
          {!loading && !error && featuredBikes.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-300 text-xl">No featured bikes available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;