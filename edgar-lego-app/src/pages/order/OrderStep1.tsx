import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import logoLego from '../../assets/images/Logo.Lego.svg';
import boxImage from '../../assets/images/box-image.png';

function OrderStep1() {
  const navigate = useNavigate();
  const { userData, setUserData, nextStep } = useOrderStore();
  const [name, setName] = useState(userData.name || '');

  const handleNext = () => {
    if (name.trim()) {
      setUserData({ name: name.trim() });
      nextStep();
      navigate('/order/step-2');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.6875rem'
    }} className="order-container">
      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '3.3125rem',
        width: '100%'
      }}>
        {/* Logo and Title */}
        <div style={{
          display: 'flex',
          gap: '0.6875rem',
          alignItems: 'center',
          flexWrap: 'wrap'
        }} className="order-header">
          <img
            src={logoLego}
            alt="Edgar Allan LEGO Logo"
            style={{
              width: '7.5rem',
              height: '7.5rem',
              flexShrink: 0
            }}
            className="order-logo"
          />
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: '2.875rem',
            color: 'black',
            letterSpacing: '-0.0575rem',
            lineHeight: 1,
            maxWidth: '41.75rem',
            margin: 0,
            flex: '1 1 auto'
          }} className="order-title">
            Building Together Brick Set
          </p>
        </div>

        {/* Main Content Area */}
        <div style={{
          display: 'flex',
          gap: '5rem',
          alignItems: 'flex-start',
          width: '100%',
          flexWrap: 'wrap'
        }} className="order-main">
          {/* Left Side - Progress Indicators */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            width: '25rem',
            flexShrink: 0
          }} className="order-sidebar">
            {/* Step 1 - Active with Box Image */}
            <div style={{
              display: 'flex',
              gap: '5rem',
              alignItems: 'center',
              padding: '1rem'
            }}>
              <div style={{
                backgroundColor: '#d9d9d9',
                borderRadius: '100px',
                width: '1.5rem',
                height: '1.5rem',
                flexShrink: 0
              }} />
              <div style={{
                position: 'relative',
                width: '11.625rem',
                height: '18.0625rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={boxImage}
                  alt="LEGO Box"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
            </div>

            {/* Step 2 - Inactive */}
            <div style={{
              display: 'flex',
              gap: '5rem',
              alignItems: 'center',
              padding: '1rem'
            }}>
              <div style={{
                backgroundColor: '#d9d9d9',
                borderRadius: '100px',
                width: '1.5rem',
                height: '1.5rem',
                flexShrink: 0
              }} />
              <div style={{
                border: '1px solid #d9d9d9',
                width: '11.625rem',
                height: '18.0625rem',
                backgroundColor: '#f5f5f5'
              }} />
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div style={{
            border: '1px solid #c6c6c6',
            borderRadius: '1.875rem',
            padding: '3.75rem',
            width: '100%',
            maxWidth: '48.75rem',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }} className="order-card">
            {/* Step Label and Question */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
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
                Step 1 of 5
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
                Great! First things first, what is your name?
              </p>
            </div>

            {/* Input and Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.875rem',
              width: '100%'
            }}>
              {/* Name Input */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: '1.875rem',
                  lineHeight: '2.5rem',
                  color: 'black',
                  border: 'none',
                  borderBottom: '3px solid #1169fe',
                  outline: 'none',
                  padding: '0 0 0.3125rem 0',
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: '3.125rem'
                }}
                className="order-input"
              />

              {/* Next Button */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={handleNext}
                  disabled={!name.trim()}
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
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    opacity: name.trim() ? 1 : 0.5,
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
          .order-sidebar {
            width: 18rem !important;
            gap: 1.5rem !important;
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
          .order-sidebar {
            display: none !important;
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

export default OrderStep1;
