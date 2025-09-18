import React from 'react';
import { Award, Users, Calendar, MapPin } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            About Infiniti Drive
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            We're passionate about connecting riders with their perfect bikes. With years of experience 
            in the industry, we've built a reputation for quality, trust, and exceptional service.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { number: '5000+', label: 'Bikes Sold', icon: <Award className="h-8 w-8" /> },
            { number: '15+', label: 'Years Experience', icon: <Calendar className="h-8 w-8" /> },
            { number: '3000+', label: 'Happy Customers', icon: <Users className="h-8 w-8" /> },
            { number: '25+', label: 'Locations', icon: <MapPin className="h-8 w-8" /> },
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 
                            rounded-full mb-4 text-white">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white">Our Story</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Founded in 2009, Infiniti Drive started as a small family business with a simple mission: 
                to provide quality second-hand bikes at fair prices. What began as a single showroom has 
                grown into one of the region's most trusted bike dealerships.
              </p>
              <p>
                Our founder, passionate about motorcycles since childhood, recognized the need for a 
                reliable platform where riders could find well-maintained, thoroughly inspected used bikes. 
                This vision drove us to establish rigorous quality standards and build lasting relationships 
                with our customers.
              </p>
              <p>
                Today, we continue to uphold those founding principles while embracing modern technology 
                and expanding our services to better serve the riding community.
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
              alt="Our showroom"
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"></div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="bg-gray-800 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">
                To democratize access to quality motorcycles by providing transparent, reliable, 
                and affordable second-hand bikes while delivering exceptional customer experiences 
                that build lifelong relationships.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-white">Our Values</h3>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Transparency in all transactions and communications
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Quality assurance through rigorous inspection processes
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2">•</span>
                  Customer-first approach in everything we do
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">•</span>
                  Continuous innovation and improvement
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;