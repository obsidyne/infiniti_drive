import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Wrench, Users } from 'lucide-react';
import BikeCard from '../components/BikeCard';
import { bikes } from '../data/bikes';

const HomePage = () => {
  const featuredBikes = bikes.slice(0, 3);

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
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-blue-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
            iNFINITi Drive
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
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                About Infiniti Drive
              </h2>
              <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                With over years of experience in the motorcycle industry, Infiniti Drive has established 
                itself as the most trusted name in second-hand bike sales. We specialize in providing 
                high-quality, thoroughly inspected motorcycles that deliver exceptional value and reliability.
              </p>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our commitment to transparency, quality assurance, and customer satisfaction has helped 
                thousands of riders find their perfect bike. Every motorcycle in our inventory undergoes 
                rigorous inspection and comes with comprehensive warranty protection.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">5000+</div>
                  <div className="text-gray-400">Bikes Sold</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-2">15+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-green-400 mb-2">3000+</div>
                  <div className="text-gray-400">Happy Customers</div>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <div className="text-3xl font-bold text-blue-400 mb-2">25+</div>
                  <div className="text-gray-400">Locations</div>
                </div>
              </div>

              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                         rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 
                         transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                Learn More About Us
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src="z900.jpg"
                  alt="About Infiniti Drive"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
              </div>
              
              {/* Floating Stats */}
          
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Why Choose Infiniti Drive?
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              We provide exceptional service and quality assurance for every bike in our collection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Star className="h-8 w-8" />,
                title: "Quality Assured",
                description: "Every bike is thoroughly inspected and certified for quality."
              },
              {
                icon: <Shield className="h-8 w-8" />,
                title: "Warranty Protection",
                description: "Comprehensive warranty coverage for peace of mind."
              },
              {
                icon: <Wrench className="h-8 w-8" />,
                title: "Expert Service",
                description: "Professional maintenance and repair services available."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "Trusted by Thousands",
                description: "Join our community of satisfied customers nationwide."
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-300 
                         transform hover:scale-105 hover:shadow-xl"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 
                              rounded-full mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Bikes Section */}
      <section className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Featured Bikes
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Check out our handpicked selection of premium bikes available now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBikes.map((bike) => (
              <BikeCard key={bike.id} bike={bike} featured />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/catalogue"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white 
                       rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transform hover:scale-105 
                       transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              View All Bikes
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;