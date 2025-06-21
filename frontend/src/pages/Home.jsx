// src/pages/HomePage.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    {
      title: '🧘 Personalized Routines',
      description: 'Receive custom yoga plans tailored to your age, health conditions, fitness level, and goals for a safe and effective practice.',
      content: 'Custom yoga plans based on your health, age, and goals.',
    },
    {
      title: '📹 Real-Time Pose Feedback',
      description: 'Use your webcam to get AI-powered feedback on your posture, ensuring proper alignment and reducing injury risk during practice.',
      content: 'AI-powered posture correction using your webcam.',
    },
    {
      title: '📊 Progress Reports',
      description: 'Track your yoga journey with detailed reports, including performance metrics and improvement trends, to stay motivated.',
      content: 'Track your improvement over time.',
    },
  ];

  return (
    <div style={{ background: 'linear-gradient(to bottom, #f3f4f6, #dbeafe)', minHeight: '100vh', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
      <header style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', position: 'sticky', top: 0, zIndex: 1000 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#9333ea', fontWeight: '700', fontSize: '1.5rem' }}>CalmAsana</h1>
          <nav>
            <a href="#features" style={{ color: '#374151', marginLeft: '1.5rem', fontWeight: '500', textDecoration: 'none' }}>Features</a>
            <a href="#about" style={{ color: '#374151', marginLeft: '1.5rem', fontWeight: '500', textDecoration: 'none' }}>About</a>
            <Link to="/auth" style={{ color: '#374151', marginLeft: '1.5rem', fontWeight: '500', textDecoration: 'none' }}>Login</Link>
            <Link to="/auth" style={{ background: 'linear-gradient(to right, #22c55e, #14b8a6)', color: 'white', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: '600', marginLeft: '1.5rem', textDecoration: 'none', display: 'inline-block' }}>Get Started</Link>
          </nav>
        </div>
      </header>

      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to right, #9333ea, #3b82f6)', padding: '2rem', textAlign: 'center' }}>
        <div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', color: '#fff', marginBottom: '1rem' }}>Personalized Yoga. Anywhere.</h2>
          <p style={{ maxWidth: '40rem', margin: '0 auto 1.5rem', color: '#f9fafb', fontSize: '1.125rem', lineHeight: '1.6' }}>
            Get real-time feedback, track your progress, and improve your yoga practice — all from the comfort of your home.
          </p>
          <Link to="/auth" style={{ background: 'linear-gradient(to right, #22c55e, #14b8a6)', color: 'white', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: '600', fontSize: '1.125rem', textDecoration: 'none', display: 'inline-block' }}>Get Started</Link>
        </div>
      </section>

      <section id="features" style={{ padding: '5rem 1rem', backgroundColor: '#d028cd', textAlign: 'center' }}>
        <h3 style={{ fontSize: '2rem', fontWeight: '700', color: '#1f2937', marginBottom: '2.5rem' }}>Features</h3>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{ padding: '2rem', background: 'linear-gradient(to bottom right, #c18ef7, #76a4e0)', borderRadius: '0.75rem', cursor: 'pointer', transition: 'transform 0.3s ease' }}
              onClick={() => setSelectedFeature(feature.title === selectedFeature ? null : feature.title)}
            >
              <h4 style={{ fontWeight: '600', fontSize: '1.25rem', marginBottom: '0.5rem', color: '#3a0a5e' }}>{feature.title}</h4>
              <p style={{ fontSize: '1rem', color: '#080214' }}>{feature.content}</p>
              {selectedFeature === feature.title && (
                <div style={{ marginTop: '1rem', padding: '0.5rem', background: '#6d32db', borderRadius: '4px', color: '#fff', fontSize: '0.875rem', lineHeight: '1.5' }}>
                  <p>{feature.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section id="about" style={{ padding: '5rem 1rem', background: 'linear-gradient(to right, #f3e8ff, #dbeafe)', textAlign: 'center' }}>
        <div style={{ maxWidth: '40rem', margin: '0 auto' }}>
          <h3 style={{ fontWeight: '700', fontSize: '2rem', color: '#1f2937', marginBottom: '1rem' }}>About CalmAsana</h3>
          <p style={{ color: '#4b5563', fontSize: '1.125rem', lineHeight: '1.6' }}>
            Discover a personalized yoga experience designed just for you. With AI-powered feedback, custom routines tailored to your needs, and progress tracking, CalmAsana helps you practice safely and effectively from home. Start your journey to wellness today!
          </p>
        </div>
      </section>

      <footer style={{ backgroundColor: '#ffffff', padding: '3rem 1rem', color: '#4b5563', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li><a href="#features" style={{ color: '#374151', textDecoration: 'none' }}>Features</a></li>
              <li><a href="#about" style={{ color: '#374151', textDecoration: 'none' }}>About</a></li>
              <li><Link to="/auth" style={{ color: '#374151', textDecoration: 'none' }}>Login / Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.75rem' }}>Connect with Us</h4>
            <p>Email: marnarabjudel419@gmail.com</p>
            <p>Phone: +94 77 028 0202</p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem' }}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280' }}>Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280' }}>Instagram</a>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '2rem', color: '#9ca3af', fontSize: '0.875rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          © 2025 CalmAsana. Developed by IIT 17, Uva Wellassa University.
        </div>
      </footer>
    </div>
  );
}

export default Home;
