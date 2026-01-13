import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';

function CompletedScreen() {
  const navigate = useNavigate();

  const handleStartAgain = () => {
    navigate('/');
  };

  return (
    <PageLayout showLogo={false} className="overflow-hidden" contentClassName="justify-center items-center">
      <div style={{
        width: '937px',
        maxWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '18px',
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        padding: '24px' // Added padding that was on the outer container
      }}>
        <div style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          color: 'black',
          fontSize: 'clamp(24px, 3vw, 36px)',
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 600,
          lineHeight: 1.3,
          wordWrap: 'break-word',
          marginBottom: '12px'
        }}>
          We did it!
        </div>

        <div style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          color: 'black',
          fontSize: 'clamp(16px, 2vw, 18px)',
          fontFamily: 'Epilogue, sans-serif',
          fontWeight: 400,
          lineHeight: 1.5,
          wordWrap: 'break-word',
          marginBottom: '24px'
        }}>
          Great job! You've completed your build.
        </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleStartAgain}
            style={{
              backgroundColor: 'black',
              color: '#fefff8',
              padding: 'clamp(10px, 1.5vw, 13.5px) clamp(20px, 2.5vw, 30px)',
              height: 'clamp(44px, 5vw, 68px)',
              borderRadius: '9999px',
              fontFamily: 'Petrona, serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(16px, 2vw, 24px)',
              lineHeight: 'normal',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s',
              minWidth: 'clamp(150px, 20vw, 200px)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Start Again
          </button>
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          left: 0,
          top: '55vh',
          width: '100vw',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'visible'
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '60px',
            width: 'fit-content'
          }}
        >
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(80px, 20vw, 270px)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                WebkitTextStroke: 'clamp(1px, 0.3vw, 3px) black',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                flexShrink: 0
              }}
            >
              💥 We did it! 🧰
            </span>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 120s linear infinite;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </PageLayout>
  );
}

export default CompletedScreen;
