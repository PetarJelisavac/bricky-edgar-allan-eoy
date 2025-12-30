import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import logoLego from '../../assets/images/Logo.Lego.svg';

function OrderStep4() {
  const navigate = useNavigate();
  const { userData, setUserData, nextStep } = useOrderStore();
  const [position, setPosition] = useState(userData.position || '');

  const handleNext = () => {
    if (position.trim()) {
      setUserData({ position: position.trim() });
      nextStep();
      navigate('/order/step-5');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2vw, 16px)'
    }} className="order-container">
      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3.3125rem',
        width: '100%',
        flex: 1
      }}>
        {/* Logo and Title */}
        <div style={{
          display: 'flex',
          gap: '40px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <img
            src={logoLego}
            alt="Edgar Allan LEGO Logo"
            style={{
              width: '120px',
              height: '120px',
              flexShrink: 0
            }}
          />
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: '36px',
            color: 'black',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            maxWidth: '668px',
            margin: 0,
            flex: '1 1 auto'
          }}>
            Building Together Brick Set
          </p>
        </div>

        {/* Main Content Area */}
        <div style={{
          display: 'flex',
          gap: '80px',
          alignItems: 'center',
          width: '100%',
          flex: 1,
          flexWrap: 'wrap'
        }} className="order-main-container">
          {/* Left Side - Empty Spacer (same width as Step 2 color picker) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.5vw, 16px)',
            width: '400px',
            height: '100%',
            justifyContent: 'center',
            padding: '0 clamp(8px, 1.5vw, 16px)',
            flexShrink: 0
          }} className="order-sidebar">
            {/* Empty - no color picker */}
          </div>

          {/* Right Side - Form Card */}
          <div style={{
            border: '1px solid #c6c6c6',
            borderRadius: 'clamp(20px, 2.5vw, 30px)',
            padding: 'clamp(30px, 4vw, 60px)',
            width: '100%',
            maxWidth: '780px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 40px)',
            flex: '1 1 auto'
          }} className="order-form-card">
            {/* Step Label and Question */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(12px, 1.5vw, 20px)',
              width: '100%'
            }}>
              <p style={{
                fontFamily: 'Petrona, serif',
                fontWeight: 600,
                fontStyle: 'italic',
                fontSize: '1rem',
                color: '#272727',
                letterSpacing: '0.02rem',
                margin: 0
              }} className="order-step-label">
                Step 4 of 5
              </p>
              <p style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: '2.5rem',
                color: '#272727',
                letterSpacing: '-0.025rem',
                lineHeight: '3.125rem',
                margin: 0,
                maxWidth: '41.25rem'
              }} className="order-question">
                What is your job?
              </p>
            </div>

            {/* Input and Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.5vw, 30px)',
              width: '100%'
            }}>
              {/* Job Position Input */}
              <input
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder=""
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: 'clamp(16px, 1.5vw, 20px)',
                  lineHeight: '1.4',
                  color: 'black',
                  border: 'none',
                  borderBottom: '3px solid #1169fe',
                  outline: 'none',
                  padding: '0 0 4px 0',
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: 'clamp(44px, 5vw, 50px)'
                }}
                className="order-input"
              />

              {/* Next Button */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={handleNext}
                  disabled={!position.trim()}
                  style={{
                    backgroundColor: '#fefff8',
                    border: '1px solid #1169fe',
                    borderRadius: '1.875rem',
                    padding: '0.84375rem 1.875rem',
                    height: '3.125rem',
                    minWidth: '9.375rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: position.trim() ? 'pointer' : 'not-allowed',
                    opacity: position.trim() ? 1 : 0.5,
                    transition: 'opacity 0.2s'
                  }}
                  className="order-button"
                >
                  <p style={{
                    fontFamily: 'Petrona, serif',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontSize: '1.25rem',
                    color: '#1169fe',
                    margin: 0
                  }}>
                    Next
                  </p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Queries */}
      <style>{`
        @media (max-width: 1024px) {
          .order-container {
            padding: 1.5rem !important;
          }
          .order-header {
            gap: 0.5rem !important;
          }
          .order-logo {
            width: 5rem !important;
            height: 5rem !important;
          }
          .order-title {
            font-size: 2rem !important;
          }
          .order-main {
            gap: 2rem !important;
          }
        }

        @media (max-width: 768px) {
          .order-container {
            padding: 1rem !important;
          }
          .order-logo {
            width: 4rem !important;
            height: 4rem !important;
          }
          .order-title {
            font-size: 1.5rem !important;
          }
          .order-card {
            padding: 2rem !important;
            gap: 1.5rem !important;
          }
          .order-question {
            font-size: 1.75rem !important;
            line-height: 2.25rem !important;
          }
          .order-input {
            font-size: 1.25rem !important;
            height: 2.5rem !important;
          }
          .order-button {
            width: 100% !important;
            height: 3rem !important;
          }
        }

        @media (max-width: 480px) {
          .order-title {
            font-size: 1.25rem !important;
          }
          .order-question {
            font-size: 1.5rem !important;
            line-height: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}

export default OrderStep4;
