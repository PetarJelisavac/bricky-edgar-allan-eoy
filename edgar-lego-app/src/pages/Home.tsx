import { useNavigate } from 'react-router-dom';
import boxImage from '../assets/images/box-image.png';
import edgarLego from '../assets/images/EdgarLego.svg';
import logoLego from '../assets/images/Logo.Lego.svg';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'white', display: 'flex' }} className="home-container">
      {/* Left Side - Order Path */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem', position: 'relative' }} className="home-left">
        {/* LEGO Logo - Top Left */}
        <div style={{ position: 'absolute', top: '2rem', left: '2rem' }}>
          <img src={logoLego} alt="Edgar Allan LEGO Logo" style={{ width: '120px', height: 'auto' }} />
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* LEGO Box Image */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={boxImage}
              alt="LEGO Edgar Allan Box"
              style={{ width: '100%', maxWidth: '28rem' }}
            />
          </div>

          {/* Heading */}
          <h1 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 600, fontSize: '3rem', color: 'black', textAlign: 'center', lineHeight: 1.2 }}>
            Let's build something together in 2026!
          </h1>

          {/* Description */}
          <p style={{ fontFamily: 'Epilogue, sans-serif', fontSize: '1.125rem', color: '#4b5563', textAlign: 'center' }}>
            Brick by brick, we're shaping the future. Get your personalized LEGO Edgar and join us in building something extraordinary.
          </p>

          {/* CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/order')}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 1)',
                color: 'white',
                padding: '1rem 3rem',
                borderRadius: '9999px',
                fontFamily: 'Petrona, serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              Get a bricky Edgar!
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Build Path */}
      <div style={{ flex: 1, backgroundColor: '#1f71ff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem' }} className="home-right">
        <div style={{ maxWidth: '36rem', display: 'flex', flexDirection: 'column', gap: '2rem' }} className="home-content">
          {/* Instructions Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <h2 style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 600, fontSize: '2.25rem', color: 'white' }}>
              Instructions
            </h2>
          </div>

          {/* LEGO Bricks Illustration */}
          <div style={{ position: 'relative', height: '20rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={edgarLego} alt="LEGO Edgar construction" style={{ height: '18rem' }} />
          </div>

          {/* Description */}
          <p style={{ fontFamily: 'Epilogue, sans-serif', fontSize: '1.125rem', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>
            Already have your LEGO Edgar? Follow our step-by-step guided building experience with animations, videos, and personalized questions.
          </p>

          {/* CTA Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              onClick={() => navigate('/build')}
              style={{
                backgroundColor: 'white',
                color: '#1f71ff',
                padding: '1rem 3rem',
                borderRadius: '9999px',
                fontFamily: 'Petrona, serif',
                fontStyle: 'italic',
                fontSize: '1.25rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            >
              I have one, lets go!
            </button>
          </div>
        </div>
      </div>

      {/* Media Queries */}
      <style>{`
        @media (max-width: 1024px) {
          .home-left, .home-right {
            padding: 2rem !important;
          }
          .home-content {
            max-width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .home-container {
            flex-direction: column !important;
          }
          .home-left, .home-right {
            padding: 2rem 1.5rem !important;
            min-height: 50vh !important;
          }
          .home-left img {
            width: 6rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
