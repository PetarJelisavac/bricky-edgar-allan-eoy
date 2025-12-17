import { useNavigate } from 'react-router-dom';
import logoLego from '../../assets/images/Logo.Lego.svg';
import edgarLego from '../../assets/images/EdgarLego.svg';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* LEGO Logo - Top Left */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        left: '1.5rem',
        zIndex: 10
      }}>
        <img
          src={logoLego}
          alt="Edgar Allan LEGO Logo"
          style={{
            width: '10rem',
            height: 'auto'
          }}
          className="welcome-logo"
        />
      </div>

      {/* Main Content - Responsive Container */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '5.75rem',
          padding: '11.5rem 3rem 0',
          minHeight: '100vh',
          maxWidth: '87.5rem',
          margin: '0 auto'
        }}
        className="welcome-content"
      >
        {/* Left Side - Text Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4.375rem',
            maxWidth: '29.1875rem',
            flex: '1 1 auto'
          }}
          className="welcome-text"
        >
          {/* Text Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6.0625rem'
          }}>
            {/* Heading */}
            <h1
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: '3.75rem',
                lineHeight: '4.25rem',
                color: 'black',
                margin: 0
              }}
              className="welcome-heading"
            >
              It's time to<br />
              build together<br />
              in 2026!
            </h1>

            {/* Description */}
            <p
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontSize: '1.125rem',
                lineHeight: 1.2,
                color: 'black',
                margin: 0,
                maxWidth: '26.3125rem'
              }}
              className="welcome-description"
            >
              Welcome! We hope the new year finds you well. Take a moment to relax, zone out and build something fun with us.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/build/step/1')}
            style={{
              backgroundColor: 'black',
              color: '#fefff8',
              padding: '0.84375rem 1.875rem',
              height: '4.25rem',
              width: '100%',
              maxWidth: '20.375rem',
              borderRadius: '100px',
              fontFamily: 'Petrona, serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: '1.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              flexShrink: 0
            }}
            className="welcome-button"
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Lets get building!
          </button>
        </div>

        {/* Right Side - LEGO Brick Illustration */}
        <div
          style={{
            position: 'relative',
            width: '25rem',
            height: '28.125rem',
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="welcome-illustration"
        >
          <img
            src={edgarLego}
            alt="Edgar LEGO Character"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>
      </div>

      {/* Media Queries via inline styles */}
      <style>{`
        @media (max-width: 1024px) {
          .welcome-content {
            gap: 3rem !important;
            padding: 8rem 2rem 0 !important;
          }
          .welcome-heading {
            font-size: 2.5rem !important;
            line-height: 3rem !important;
          }
          .welcome-illustration {
            width: 18rem !important;
            height: 20rem !important;
          }
        }

        @media (max-width: 768px) {
          .welcome-logo {
            width: 6rem !important;
          }
          .welcome-content {
            flex-direction: column !important;
            align-items: center !important;
            gap: 2rem !important;
            padding: 6rem 1.5rem 2rem !important;
          }
          .welcome-text {
            gap: 2rem !important;
            max-width: 100% !important;
            align-items: center !important;
            text-align: center !important;
          }
          .welcome-heading {
            font-size: 2rem !important;
            line-height: 2.5rem !important;
          }
          .welcome-description {
            font-size: 1rem !important;
          }
          .welcome-button {
            max-width: 100% !important;
            font-size: 1.25rem !important;
            height: 3.5rem !important;
          }
          .welcome-illustration {
            width: 15rem !important;
            height: 17rem !important;
          }
        }

        @media (max-width: 480px) {
          .welcome-heading {
            font-size: 1.75rem !important;
            line-height: 2.25rem !important;
          }
          .welcome-illustration {
            width: 12rem !important;
            height: 14rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default WelcomeScreen;
