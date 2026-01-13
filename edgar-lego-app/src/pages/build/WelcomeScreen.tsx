import { useNavigate } from 'react-router-dom';
import edgarLego from '../../assets/images/EdgarLego.svg';
import logoLego from '../../assets/images/Logo.Lego.svg';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div 
      className="bg-[#fefff8] flex items-center justify-center px-5 py-5 pb-[max(20px,calc(env(safe-area-inset-bottom)+8px))] lg:px-16 relative w-full"
      style={{ height: '100dvh' }}
    >
      {/* container-main - max 1440px */}
      <div className="w-full max-w-[1440px] flex flex-col justify-between items-center lg:items-stretch relative h-full">
        
        {/* Logo-wrapper - sticks to top */}
        <div className="flex items-center w-full shrink-0">
          <img
            src={logoLego}
            alt="LEGO Logo"
            className="w-[69.4px] h-[69.4px]"
          />
        </div>

        {/* content-wrapper - contains all content (text, button, SVG) */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-6 items-center justify-center w-full shrink-0">
          
          {/* layout - Content (text + button) */}
          <div className="flex flex-col gap-6 items-center lg:items-start justify-center w-full lg:max-w-[457px] shrink-0">
            {/* Content */}
            <div className="flex flex-col gap-1 items-start justify-center w-full max-w-[350px] lg:max-w-[460px]">
              <h1 
                className="font-['Epilogue'] font-semibold text-black m-0 w-full"
                style={{ 
                  fontSize: 'clamp(32px, 5vw, 60px)',
                  lineHeight: '1.2'
                }}
              >
                It's time to build together in 2026!
              </h1>
              <p className="font-['Epilogue'] font-normal text-[18px] leading-[28px] text-black m-0 w-full">
                Welcome! We hope the new year finds you well. Take a moment to relax, zone out and build something fun with us.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => navigate('/step/1')}
              className="bg-black text-[#fefff8] px-[30px] py-[13.5px] h-[68px] w-full max-w-[350px] rounded-[100px] font-['Petrona'] font-medium italic text-[24px] leading-normal border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] shrink-0"
            >
              Lets get building!
            </button>
          </div>

          {/* Svg-container - LEGO Brick with reduced size (25% smaller) */}
          <div className="relative shrink-0 flex items-center justify-center">
            <img
              src={edgarLego}
              alt="Edgar LEGO Character"
              className="block w-auto h-[211.5px]"
            />
          </div>
        </div>

        {/* Empty spacer for bottom spacing */}
        <div className="shrink-0 h-0" />
      </div>
    </div>
  );
}

export default WelcomeScreen;
