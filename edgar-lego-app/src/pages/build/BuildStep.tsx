import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBuildStore, type BrickColorName } from '../../store/buildStore';
import { buildSteps } from '../../data/buildSteps';
import PageLayout from '../../components/layout/PageLayout';

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
    
    // Save the selected color to the store
    setSelectedBrickColor(colorName as BrickColorName);

    markStepCompleted(step.id);
    const nextIndex = currentStepIndex + 1;

    if (nextIndex >= buildSteps.length) {
      // All steps completed - navigate to completed screen
      navigate('/completed');
    } else {
      const nextStep = buildSteps[nextIndex];
      if (nextStep.type === 'build') {
        navigate(`/instruction/${nextIndex}`);
      }
    }
  };

  return (
    <PageLayout showLogo={false}>
      <div className="flex flex-col w-full items-center h-full" style={{ backgroundColor: '#fefff8' }}>
        {/* Title */}
        <div className="flex items-center justify-center p-5 lg:pt-[48px] shrink-0 w-full">
          <h1 className="font-['Epilogue'] font-semibold text-[24px] lg:text-[40px] text-black text-center m-0">
            What color did you get?
          </h1>
        </div>

        {/* Color Cards Grid Container - fills remaining space */}
        <div className="flex-1 px-5 pb-[max(20px,calc(env(safe-area-inset-bottom)+8px))] w-full overflow-auto flex items-center justify-center">
          <div className="color-picker-grid w-full max-w-[1440px] mx-auto">
            {colorOptions.map((color) => (
              <button
                key={color.name}
                onClick={() => handleColorSelect(color.name)}
                data-color={color.name.toLowerCase().replace(' ', '-')}
                className={`
                  color-card
                  relative cursor-pointer transition-all bg-transparent outline-none
                  border-2 overflow-hidden
                  flex flex-col items-center
                  hover:scale-[1.02]
                  ${selectedColor === color.name ? 'border-current' : 'border-transparent'}
                `}
                style={{
                  backgroundColor: color.background.includes('baddy-blue') ? '#CCE5FF' :
                                 color.background.includes('wine') ? '#FED4E5' :
                                 color.background.includes('sunshine') ? '#FFDE96' :
                                 color.background.includes('rojo') ? '#FFC1C1' : '#D9D9D9',
                  borderColor: selectedColor === color.name ? color.borderColor : 'transparent'
                }}
              >
                <div className="card-inner flex-1 flex flex-col items-center justify-end w-full p-5 lg:p-10">
                  {/* LEGO Brick */}
                  <img
                    src={color.brick}
                    alt={`${color.name} brick`}
                    className="brick-image w-[121px] h-[121px] object-contain shrink-0"
                  />

                  {/* Label - at bottom */}
                  <p className="font-['Epilogue'] font-medium text-sm text-black text-right m-0 w-full shrink-0">
                    {color.name}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid Styles */}
        <style>{`
          /* Mobile Layout (< 1024px) - Custom grid with featured Blue card */
          .color-picker-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            height: 100%;
          }
          
          .card-inner {
            gap: 16px;
          }
          
          .color-card[data-color="baddy-blue"] { 
            grid-column: 1 / -1;
            min-height: 256px;
          }
          
          .color-card[data-color="wine"],
          .color-card[data-color="sunshine"],
          .color-card[data-color="rojo"],
          .color-card[data-color="coal"] { 
            min-height: 192px;
          }
          
          /* Desktop Layout (≥ 1024px) - Horizontal flex */
          @media (min-width: 1024px) {
            .color-picker-grid {
              display: flex;
              flex-direction: row;
              gap: 12px;
              height: 600px;
            }
            
            .card-inner {
              gap: 200px;
            }
            
            .color-card {
              flex: 1;
              min-width: 0;
              height: 100%;
            }
            
            .color-card[data-color="baddy-blue"] {
              grid-column: auto;
            }
            
            .brick-image {
              width: 121px;
              height: 121px;
            }
          }
          
          /* Small mobile adjustments */
          @media (max-width: 390px) {
            .brick-image {
              width: 100px;
              height: 100px;
            }
          }
        `}</style>
      </div>
    </PageLayout>
  );
}

export default BuildStep;
