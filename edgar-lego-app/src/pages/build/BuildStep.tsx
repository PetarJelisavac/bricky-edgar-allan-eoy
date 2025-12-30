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
    <div className="bg-[#fefff8] flex flex-col items-center gap-[24px] px-[22px] py-[24px] relative w-full h-screen">
      {/* Header Row - Back button + Title */}
      <div className="flex gap-[18px] items-center relative shrink-0 w-full">
        {/* Back Button */}
        <button
          onClick={handleBack}
          className="border border-[#939393] rounded-[80px] px-[41px] py-[34px] bg-transparent cursor-pointer transition-transform hover:scale-105 shrink-0 flex flex-col items-start"
        >
          <div className="flex items-center justify-center relative shrink-0">
            <div className="rotate-180">
              <div className="h-0 relative w-[27px]">
                <div className="absolute -top-[7.36px] left-0 -right-[3.7%] -bottom-[7.36px]">
                  <img src={arrowBack} alt="Back" className="block max-w-none w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </button>

        {/* Title - centered in remaining space */}
        <div className="basis-0 flex grow items-center justify-center min-h-px min-w-px relative shrink-0">
          <p className="font-['Epilogue'] font-semibold leading-[1.3] text-[36px] text-black whitespace-nowrap">
            What color did you get?
          </p>
        </div>
      </div>

      {/* Color Cards Row */}
      <div className="flex gap-[25px] items-center relative shrink-0 w-full">
        {colorOptions.map((color) => (
          <button
            key={color.name}
            onClick={() => handleColorSelect(color.name)}
            className="relative h-[712px] shrink-0 flex-1 p-0 cursor-pointer transition-all bg-transparent outline-none hover:scale-[1.01]"
            style={{
              border: selectedColor === color.name ? `2px solid ${color.borderColor}` : '2px solid transparent'
            }}
          >
            {/* Background Image */}
            <img
              src={color.background}
              alt={`${color.name} background`}
              className="block max-w-none w-full h-full object-cover"
            />

            {/* LEGO Brick - centered */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[121.541px] h-[121.316px] pointer-events-none">
              <img
                src={color.brick}
                alt={`${color.name} brick`}
                className="block max-w-none w-full h-full"
              />
            </div>

            {/* Label - at bottom */}
            <p className="absolute bottom-[58px] left-1/2 -translate-x-1/2 font-['Epilogue'] font-medium text-[14px] leading-[1.1] text-black text-center pointer-events-none">
              {color.name}
            </p>
          </button>
        ))}
      </div>

      {/* Continue Button - appears when color is selected */}
      {selectedColor && (
        <button
          onClick={handleNext}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-[#fefff8] px-[30px] py-[13.5px] h-[68px] rounded-[100px] font-['Petrona'] font-medium italic text-[24px] leading-normal border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] z-10 min-w-[200px]"
        >
          Continue
        </button>
      )}
    </div>
  );
}

export default BuildStep;
