import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import logoLego from '../../assets/images/Logo.Lego.svg';

function OrderStep3() {
  const navigate = useNavigate();
  const { userData, setUserData, nextStep } = useOrderStore();
  const [email, setEmail] = useState(userData.email || '');

  const handleNext = () => {
    if (email.trim() && email.includes('@')) {
      setUserData({ email: email.trim() });
      nextStep();
      navigate('/order/step-4');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      padding: 'clamp(16px, 2vw, 16px)'
    }}>
      {/* Header Section */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(30px, 4vw, 53px)',
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

          {/* Right Side - Form Card (identical to Step 2) */}
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
                fontSize: 'clamp(14px, 1.2vw, 16px)',
                color: '#272727',
                letterSpacing: '0.02em',
                margin: 0
              }}>
                Step 3 of 5
              </p>
              <p style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(28px, 3vw, 40px)',
                color: '#272727',
                letterSpacing: '-0.01em',
                lineHeight: 1.25,
                margin: 0,
                maxWidth: '660px'
              }}>
                And how do we contact you?
              </p>
            </div>

            {/* Input and Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.5vw, 30px)',
              width: '100%'
            }}>
              {/* Email Input */}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              />

              {/* Next Button */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={handleNext}
                  disabled={!email.trim() || !email.includes('@')}
                  style={{
                    backgroundColor: '#fefff8',
                    border: '1px solid #1169fe',
                    borderRadius: 'clamp(20px, 2.5vw, 30px)',
                    padding: '13.5px 30px',
                    height: 'clamp(44px, 4vw, 50px)',
                    minWidth: 'clamp(100px, 12vw, 150px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: (email.trim() && email.includes('@')) ? 'pointer' : 'not-allowed',
                    opacity: (email.trim() && email.includes('@')) ? 1 : 0.5,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <p style={{
                    fontFamily: 'Petrona, serif',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontSize: 'clamp(18px, 1.8vw, 20px)',
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
    </div>
  );
}

{/* Responsive Media Queries */}
<style>{`
  @media (min-width: 1200px) {
    .order-main-container {
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      gap: 80px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .order-sidebar {
      width: 400px !important;
      flex-shrink: 0 !important;
      margin: 0 !important;
    }
    .order-form-card {
      flex: 1 1 auto !important;
      max-width: 780px !important;
      margin: 0 !important;
    }
  }
  
  @media (max-width: 1199px) {
    .order-main-container {
      flex-direction: column !important;
      align-items: center !important;
      gap: 80px !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    .order-sidebar {
      width: 100% !important;
      max-width: 400px !important;
      margin: 0 !important;
    }
    .order-form-card {
      width: 100% !important;
      max-width: 780px !important;
      margin: 0 !important;
    }
  }
`}</style>

export default OrderStep3;
