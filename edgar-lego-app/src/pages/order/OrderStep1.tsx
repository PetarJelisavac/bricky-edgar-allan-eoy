import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import logoLego from '../../assets/images/Logo.Lego.svg';
import boxImage from '../../assets/images/box-image.png';
import image16 from '../../assets/images/image 16.png';

function OrderStep1() {
  const navigate = useNavigate();
  const { userData, setUserData, nextStep } = useOrderStore();
  const [name, setName] = useState(userData.name || '');
  const [selectedProducts, setSelectedProducts] = useState<string[]>(userData.selectedProducts || ['box']);

  const toggleProduct = (product: string) => {
    setSelectedProducts(prev => {
      if (prev.includes(product)) {
        // Don't allow deselecting the last item
        if (prev.length === 1) return prev;
        return prev.filter(p => p !== product);
      }
      return [...prev, product];
    });
  };

  const handleNext = () => {
    if (name.trim()) {
      setUserData({ name: name.trim(), selectedProducts });
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
          flex: '1 1 0%',
          minHeight: '0',
          flexWrap: 'wrap'
        }} className="order-main-container">
          {/* Left Side - Progress Indicators */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(16px, 2vw, 40px)',
            width: '400px',
            height: '100%',
            justifyContent: 'center',
            padding: '0 clamp(8px, 1.5vw, 16px)',
            flexShrink: 0
          }} className="order-sidebar">
            {/* Step 1 - Active with Box Image */}
            <div
              onClick={() => toggleProduct('box')}
              style={{
                display: 'flex',
                gap: 'clamp(20px, 3vw, 40px)',
                alignItems: 'center',
                padding: 'clamp(8px, 1vw, 16px)',
                flex: '1 1 auto',
                cursor: 'pointer',
                opacity: selectedProducts.includes('box') ? 1 : 0.6,
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{
                backgroundColor: selectedProducts.includes('box') ? '#1169fe' : '#d9d9d9',
                border: selectedProducts.includes('box') ? '4px solid #e6e6e6' : 'none',
                borderRadius: '100px',
                width: 'clamp(16px, 2vw, 24px)',
                height: 'clamp(16px, 2vw, 24px)',
                flexShrink: 0,
                transition: 'all 0.2s'
              }} />
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 1 auto'
              }}>
                <img
                  src={boxImage}
                  alt="LEGO Box"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    maxWidth: '265px',
                    maxHeight: '177px'
                  }}
                />
              </div>
            </div>

            {/* Step 2 - Inactive with vertical image */}
            <div
              onClick={() => toggleProduct('poster')}
              style={{
                display: 'flex',
                gap: 'clamp(20px, 3vw, 40px)',
                alignItems: 'center',
                padding: 'clamp(8px, 1vw, 16px)',
                flex: '1 1 auto',
                cursor: 'pointer',
                opacity: selectedProducts.includes('poster') ? 1 : 0.6,
                transition: 'opacity 0.2s',
              }}
            >
              <div style={{
                backgroundColor: selectedProducts.includes('poster') ? '#1169fe' : '#d9d9d9',
                border: selectedProducts.includes('poster') ? '4px solid #e6e6e6' : 'none',
                borderRadius: '100px',
                width: 'clamp(16px, 2vw, 24px)',
                height: 'clamp(16px, 2vw, 24px)',
                flexShrink: 0,
                transition: 'all 0.2s'
              }} />
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 1 auto'
              }}>
                <img
                  src={image16}
                  alt="LEGO Box Vertical"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    maxWidth: '186px',
                    maxHeight: '289px'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div style={{
            border: '1px solid #c6c6c6',
            borderRadius: 'clamp(16px, 2vw, 30px)',
            padding: 'clamp(20px, 3vw, 60px)',
            width: '100%',
            maxWidth: 'clamp(400px, 50vw, 780px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(16px, 2vw, 40px)',
            flex: '1 1 auto'
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
                  fontSize: '20px',
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
                  disabled={!name.trim()}
                  style={{
                    backgroundColor: '#fefff8',
                    border: '1px solid #1169fe',
                    borderRadius: '9999px',
                    padding: 'clamp(12px, 1.5vw, 18px) clamp(20px, 2.5vw, 30px)',
                    height: 'clamp(44px, 5vw, 50px)',
                    minWidth: 'clamp(100px, 12vw, 150px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: name.trim() ? 'pointer' : 'not-allowed',
                    opacity: name.trim() ? 1 : 0.5,
                    transition: 'opacity 0.2s'
                  }}
                >
                  <p style={{
                    fontFamily: 'Petrona, serif',
                    fontWeight: 500,
                    fontStyle: 'italic',
                    fontSize: 'clamp(16px, 1.8vw, 20px)',
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
          .order-card {
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
          .order-card {
            width: 100% !important;
            max-width: 780px !important;
            margin: 0 !important;
          }
        }
        
        @media (max-width: 768px) {
          .order-container {
            padding: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .order-container {
            padding: 0.75rem !important;
          }
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
