import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-6">Connectify</h1>
          <p className="text-lg mb-6">
            Building connections that matter. Share, explore, and discover the world through your social circles.
          </p>
         <Link to='/signup'> <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
            Get Started
          </button></Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-6">About Connectify</h2>
          <p className="text-lg leading-relaxed">
            Connectify is a social media platform crafted to bring people closer together. 
            Share your moments, engage with vibrant communities, and discover new connections 
            in a seamless and enjoyable way.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Connectify?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              title="Photo Sharing"
              description="Share your cherished moments with friends and family instantly."
              icon="📸"
            />
            <FeatureCard
              title="Explore Communities"
              description="Discover and join groups that match your interests."
              icon="🌐"
            />
            <FeatureCard
              title="Privacy & Security"
              description="Your data is safe with us. We prioritize your privacy at every step."
              icon="🔒"
            />
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">Join the Connectify Revolution</h2>
          <p className="text-lg mb-6">
            Sign up today and experience the power of meaningful connections.
          </p>
         <Link to='/signup'><button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
            Get Started for Free
          </button></Link> 
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
          <p className="mb-6 text-lg">
            Have questions or need support? Reach out to our team, and we’ll be happy to assist you.
          </p>
          <form className="max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full mb-4 p-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full mb-4 p-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Your Message"
              className="w-full mb-4 p-3 rounded-lg border-gray-300 border focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Connectify. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
      <div className="text-4xl mb-4 text-blue-600">{icon}</div>
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="text-lg text-gray-700">{description}</p>
    </div>
  );
};

export default LandingPage;
