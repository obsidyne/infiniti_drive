import React from 'react';
import { Award, Users, Calendar, MapPin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-40 right-40 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 bg-green-400/30 rounded-full animate-pulse"
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
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm animate-pulse">
            About Infiniti Drive
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting riders with their perfect bikes. With years of experience 
            in the industry, we've built a reputation for quality, trust, and exceptional service.
          </p>
          
          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-500/50"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {[
            { number: '5000+', label: 'Bikes Sold', icon: <Award className="h-8 w-8" />, gradient: 'from-yellow-400 to-orange-500' },
            { number: '15+', label: 'Years Experience', icon: <Calendar className="h-8 w-8" />, gradient: 'from-blue-400 to-purple-500' },
            { number: '3000+', label: 'Happy Customers', icon: <Users className="h-8 w-8" />, gradient: 'from-green-400 to-teal-500' },
            { number: '25+', label: 'Locations', icon: <MapPin className="h-8 w-8" />, gradient: 'from-pink-400 to-red-500' },
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-8 bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-2xl
                       border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 
                       transform hover:scale-105 hover:-translate-y-3 hover:shadow-2xl group
                       hover:shadow-green-500/10 relative overflow-hidden"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${stat.gradient}
                            rounded-2xl mb-6 text-white shadow-lg group-hover:shadow-xl transition-all duration-300
                            group-hover:scale-110 relative z-10`}>
                {stat.icon}
                {/* Icon glow */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} rounded-2xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              </div>
              
              <div className="text-3xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors duration-300 relative z-10">
                {stat.number}
              </div>
              <div className="text-gray-300 font-medium relative z-10">{stat.label}</div>
              
              {/* Hover border glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Our Story
            </h2>
            <div className="space-y-6 text-gray-300 leading-relaxed">
              <p className="text-lg hover:text-white transition-colors duration-300 p-4 rounded-lg hover:bg-gray-800/30 backdrop-blur-sm">
                Founded in 2009, Infiniti Drive started as a small family business with a simple mission: 
                to provide quality second-hand bikes at fair prices. What began as a single showroom has 
                grown into one of the region's most trusted bike dealerships.
              </p>
              <p className="text-lg hover:text-white transition-colors duration-300 p-4 rounded-lg hover:bg-gray-800/30 backdrop-blur-sm">
                Our founder, passionate about motorcycles since childhood, recognized the need for a 
                reliable platform where riders could find well-maintained, thoroughly inspected used bikes. 
                This vision drove us to establish rigorous quality standards and build lasting relationships 
                with our customers.
              </p>
              <p className="text-lg hover:text-white transition-colors duration-300 p-4 rounded-lg hover:bg-gray-800/30 backdrop-blur-sm">
                Today, we continue to uphold those founding principles while embracing modern technology 
                and expanding our services to better serve the riding community.
              </p>
            </div>
          </div>
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                alt="Our showroom"
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-green-500/30 group-hover:to-blue-500/30 transition-all duration-300"></div>
              <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl"></div>
            </div>
            
            {/* Glowing border effect */}
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-gradient-to-br from-gray-800/80 to-gray-700/80 backdrop-blur-sm rounded-3xl p-12 md:p-16 mb-24 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-500 shadow-2xl shadow-green-500/5 relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-50"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
            <div className="group">
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-green-400 transition-colors duration-300">
                Our Mission
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                To democratize access to quality motorcycles by providing transparent, reliable, 
                and affordable second-hand bikes while delivering exceptional customer experiences 
                that build lifelong relationships.
              </p>
            </div>
            <div className="group">
              <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-blue-400 transition-colors duration-300">
                Our Values
              </h3>
              <ul className="space-y-4 text-gray-300 text-lg">
                {[
                  { text: 'Transparency in all transactions and communications', color: 'blue' },
                  { text: 'Quality assurance through rigorous inspection processes', color: 'green' },
                  { text: 'Customer-first approach in everything we do', color: 'blue' },
                  { text: 'Continuous innovation and improvement', color: 'green' }
                ].map((value, index) => (
                  <li 
                    key={index}
                    className="flex items-start hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-gray-600/30 backdrop-blur-sm group/item"
                  >
                    <span className={`${value.color === 'blue' ? 'text-blue-400' : 'text-green-400'} mr-3 text-xl group-hover/item:scale-125 transition-transform duration-300`}>
                      •
                    </span>
                    {value.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Card glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-3xl blur opacity-50 -z-10"></div>
        </div>

        {/* Team Section */}
        {/* <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
            Meet Our Team
          </h2>
          
         
          <div className="flex justify-center mb-16">
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full shadow-lg shadow-green-500/50"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'John Doe',
                role: 'Founder & CEO',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
              },
              {
                name: 'John Doe',
                role: 'Head of Operations',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
              },
              {
                name: 'John Doe',
                role: 'Chief Mechanic',
                image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
              },
            ].map((member, index) => (
              <div 
                key={index} 
                className="text-center group transform transition-all duration-500 hover:scale-105 hover:-translate-y-3"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative mb-6 overflow-hidden rounded-2xl shadow-2xl group-hover:shadow-green-500/20 transition-all duration-500">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 ring-1 ring-white/20 rounded-2xl"></div>
                  
                
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                  
                  
                  <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30 group-hover:border-gray-500/50 transition-all duration-300 shadow-lg group-hover:shadow-xl relative overflow-hidden">
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300 relative z-10">
                    {member.name}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors duration-300 relative z-10">
                    {member.role}
                  </p>
                  

                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      
      <style >{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;