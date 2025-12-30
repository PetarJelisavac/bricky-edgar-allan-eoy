import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import logoLego from '../../assets/images/Logo.Lego.svg';

const COLORS = [
  { id: 'blue', color: '#0055BF' },
  { id: 'purple', color: '#6B3FA0' },
  { id: 'orange', color: '#F57E20' },
  { id: 'red', color: '#E3000B' },
  { id: 'gray', color: '#6C6E70' },
];

function OrderStep2() {
  const navigate = useNavigate();
  const { userData, setUserData, nextStep } = useOrderStore();
  const [address, setAddress] = useState(userData.address || '');
  const [selectedColor, setSelectedColor] = useState(userData.color || '');

  const handleNext = () => {
    if (address.trim()) {
      setUserData({ address: address.trim(), color: selectedColor });
      nextStep();
      navigate('/order/step-3');
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
          gap: 'clamp(8px, 1vw, 11px)',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <img
            src={logoLego}
            alt="Edgar Allan LEGO Logo"
            style={{
              width: 'clamp(80px, 10vw, 120px)',
              height: 'clamp(80px, 10vw, 120px)',
              flexShrink: 0
            }}
          />
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(24px, 3.5vw, 46px)',
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
          gap: 'clamp(30px, 5vw, 80px)',
          alignItems: 'center',
          width: '100%',
          flex: 1,
          flexWrap: 'wrap'
        }}>
          {/* Left Side - Color Picker */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(12px, 1.5vw, 16px)',
            width: 'clamp(200px, 30vw, 400px)',
            height: '100%',
            justifyContent: 'center',
            padding: '0 clamp(8px, 1.5vw, 16px)',
            flexShrink: 0
          }}>
            <p style={{
              fontFamily: 'Petrona, serif',
              fontWeight: 500,
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 2.5vw, 36px)',
              color: '#2f80ed',
              lineHeight: 1.1,
              margin: 0,
              width: '100%'
            }}>
              Pick a color
            </p>
            <div style={{
              display: 'flex',
              gap: 'clamp(16px, 2.5vw, 32px)',
              alignItems: 'center',
              width: '100%',
              flexWrap: 'wrap'
            }}>
              {COLORS.map((colorOption) => (
                <div
                  key={colorOption.id}
                  onClick={() => setSelectedColor(colorOption.id)}
                  style={{
                    width: 'clamp(32px, 3vw, 40px)',
                    height: 'clamp(32px, 3vw, 40px)',
                    backgroundColor: colorOption.color,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    border: selectedColor === colorOption.id ? '3px solid black' : 'none',
                    boxSizing: 'border-box',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Form Card */}
          <div style={{
            border: '1px solid #c6c6c6',
            borderRadius: 'clamp(20px, 2.5vw, 30px)',
            padding: 'clamp(30px, 4vw, 60px)',
            width: '100%',
            maxWidth: '780px',
            flex: '1 1 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(24px, 3vw, 40px)'
          }}>
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
                Step 2 of 5
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
                Now tell us where to send the Brick set to?
              </p>
            </div>

            {/* Input and Button */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'clamp(20px, 2.5vw, 30px)',
              width: '100%'
            }}>
              {/* Address Input */}
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder=""
                style={{
                  fontFamily: 'Epilogue, sans-serif',
                  fontSize: 'clamp(20px, 2.5vw, 30px)',
                  lineHeight: '1.33',
                  color: 'black',
                  border: 'none',
                  borderBottom: '3px solid #1169fe',
                  outline: 'none',
                  padding: '0 0 5px 0',
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: 'clamp(40px, 4vw, 50px)'
                }}
              />

              {/* Next Button */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <button
                  onClick={handleNext}
                  disabled={!address.trim()}
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
                    cursor: address.trim() ? 'pointer' : 'not-allowed',
                    opacity: address.trim() ? 1 : 0.5,
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

export default OrderStep2;
