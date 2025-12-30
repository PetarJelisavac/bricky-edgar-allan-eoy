import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore, type BrickColorName } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';

import colorBaddyBlueBg from '../../assets/images/color-baddy-blue-bg.png';
import colorWineBg from '../../assets/images/color-wine-bg.png';
import colorSunshineBg from '../../assets/images/color-sunshine-bg.png';
import colorRojoBg from '../../assets/images/color-rojo-bg.png';
import colorCoalBg from '../../assets/images/color-coal-bg.png';

import brickBaddyBlue from '../../assets/images/brick-baddy-blue.svg';
import brickWine from '../../assets/images/brick-wine.svg';
import brickSunshine from '../../assets/images/brick-sunshine.svg';
import brickRojo from '../../assets/images/brick-rojo.svg';
import brickCoal from '../../assets/images/brick-coal.svg';
import arrowBack from '../../assets/images/arrow-back.svg';

const colorOptions = [
  { name: 'Baddy Blue', background: colorBaddyBlueBg, brick: brickBaddyBlue, borderColor: '#5A9BD4' },
  { name: 'Wine', background: colorWineBg, brick: brickWine, borderColor: '#D98FA3' },
  { name: 'Sunshine', background: colorSunshineBg, brick: brickSunshine, borderColor: '#D4A84A' },
  { name: 'Rojo', background: colorRojoBg, brick: brickRojo, borderColor: '#D98A8A' },
  { name: 'Coal', background: colorCoalBg, brick: brickCoal, borderColor: '#9E9E9E' },
];

function BuildStep() {
  const { stepId } = useParams();
  const navigate = useNavigate();
  const { markStepCompleted, setSelectedBrickColor } = useBuildStore();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const currentStepIndex = parseInt(stepId || '0');
  const step = buildSteps[currentStepIndex];

  if (!step || step.type !== 'build') {
    return <div className="min-h-screen flex items-center justify-center">Step not found</div>;
  }

  const handleColorSelect = (colorName: string) => {
    setSelectedColor(colorName);
  };

  const handleBack = () => {
    navigate('/build');
  };

  const handleNext = () => {
    if (!selectedColor) return;

    // Save the selected color to the store
    setSelectedBrickColor(selectedColor as BrickColorName);
    
    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= buildSteps.length) {
      // All steps completed - navigate to completed screen
      navigate('/build/completed');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
        navigate(`/build/instruction/${nextIndex}`);
      }
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#fefff8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'clamp(16px, 2vw, 24px)',
      padding: 'clamp(16px, 2vw, 24px)',
      position: 'relative',
      width: '100%'
    }}>
      {/* Header Row - Back button + Title */}
      <div style={{
        display: 'flex',
        gap: 'clamp(16px, 2vw, 18px)',
        alignItems: 'center',
        position: 'relative',
        flexShrink: 0,
        width: '100%'
      }}>
        {/* Back Button */}
        <button
          onClick={handleBack}
          style={{
            border: '1px solid #939393',
            borderRadius: '9999px',
            padding: 'clamp(20px, 2.5vw, 34px) clamp(30px, 3.5vw, 41px)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            flexShrink: 0
          }}>
            <div style={{ transform: 'rotate(180deg)' }}>
              <div style={{ height: 0, position: 'relative', width: '27px' }}>
                <div style={{
                  position: 'absolute',
                  top: '-7.36px',
                  left: 0,
                  right: '-3.7%',
                  bottom: '-7.36px'
                }}>
                  <img src={arrowBack} alt="Back" style={{ display: 'block', maxWidth: 'none', width: '100%', height: '100%' }} />
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Title - centered in remaining space */}
        <div style={{
          flex: '0 0 0',
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '1px',
          minWidth: '1px',
          position: 'relative',
          flexShrink: 0
        }}>
          <p style={{
            fontFamily: 'Epilogue, sans-serif',
            fontWeight: 600,
            lineHeight: 1.3,
            fontSize: 'clamp(24px, 3vw, 36px)',
            color: 'black',
            whiteSpace: 'nowrap',
            margin: 0
          }}>
            What color did you get?
          </p>
        </div>
      </div>

      {/* Color Cards Grid Container - Fills remaining vertical space */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 0%',
        minHeight: 0,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Color Cards Grid - Proper grid layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'clamp(16px, 2vw, 25px)',
          width: '100%',
          height: '100%',
          minHeight: 0
        }} className="build-colors-grid">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorSelect(color.name)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.2s',
                backgroundColor: 'transparent',
                outline: 'none',
                border: selectedColor === color.name ? `2px solid ${color.borderColor}` : '2px solid transparent',
                overflow: 'hidden',
                width: '100%',
                height: '100%',
                minHeight: 'clamp(200px, 30vh, 400px)'
              }}
              className="build-color-card"
            >
              {/* Background Image */}
              <img
                src={color.background}
                alt={`${color.name} background`}
                style={{
                  display: 'block',
                  maxWidth: 'none',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />

              {/* LEGO Brick - centered */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100px',
                height: '100px',
                pointerEvents: 'none'
              }}>
                <img
                  src={color.brick}
                  alt={`${color.name} brick`}
                  style={{
                    display: 'block',
                    maxWidth: 'none',
                    width: '100%',
                    height: '100%'
                  }}
                />
              </div>

              {/* Label - at bottom */}
              <p style={{
                position: 'absolute',
                bottom: 'clamp(15px, 2vw, 25px)',
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(10px, 1.5vw, 14px)',
                lineHeight: 1.1,
                color: 'black',
                textAlign: 'center',
                pointerEvents: 'none',
                margin: 0
              }}>
                {color.name}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button - appears when color is selected */}
      {selectedColor && (
        <button
          onClick={handleNext}
          style={{
            position: 'fixed',
            left: '50%',
            transform: 'translateX(-50%)',
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
            zIndex: 10,
            minWidth: 'clamp(150px, 20vw, 200px)',
            bottom: 'clamp(20px, 2vw, 40px)'
          }}
        >
          Continue
        </button>
      )}
      
      {/* Media Queries for Responsive Grid */}
      <style>{`
        @media (min-width: 1200px) {
          .build-colors-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
            gap: 25px !important;
          }
        }
        
        @media (max-width: 1199px) and (min-width: 900px) {
          .build-colors-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: clamp(16px, 2vw, 20px) !important;
          }
        }
        
        @media (max-width: 899px) and (min-width: 600px) {
          .build-colors-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)) !important;
            gap: clamp(12px, 2vw, 16px) !important;
          }
        }
        
        @media (max-width: 599px) and (min-width: 400px) {
          .build-colors-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
            gap: clamp(10px, 2vw, 12px) !important;
          }
        }
        
        @media (max-width: 399px) {
          .build-colors-grid {
            grid-template-columns: 1fr !important;
            gap: clamp(8px, 2vw, 10px) !important;
          }
        }
      `}</style>
    </div>
  );
}

export default BuildStep;
