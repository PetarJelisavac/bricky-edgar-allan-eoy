import { useNavigate } from 'react-router-dom';
import logoLego from '../../assets/images/Logo.Lego.svg';
import edgarLego from '../../assets/images/EdgarLego.svg';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fefff8] flex flex-col relative overflow-hidden">
      {/* LEGO Logo - Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <img
          src={logoLego}
          alt="Edgar Allan LEGO Logo"
          className="w-[160px] h-auto"
        />
      </div>

      {/* Main Content - Centered */}
      <div className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="flex gap-12 lg:gap-[92px] items-end max-w-[1200px]">
          {/* Left Side - Text Content */}
          <div className="flex flex-col gap-[70px] w-full max-w-[467px] shrink-0">
            {/* Text Section */}
            <div className="flex flex-col gap-[97px]">
              {/* Heading */}
              <h1 className="font-['Epilogue'] font-semibold text-[40px] lg:text-[60px] leading-[1.1] text-black m-0">
                It's time to <br />
                build together <br />
                in 2026!
              </h1>

              {/* Description */}
              <p className="font-['Epilogue'] font-normal text-[18px] leading-[1.2] text-black m-0 max-w-[421px]">
                Welcome! We hope the new year finds you well. Take a moment to relax, zone out and build something fun with us.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/build/step/1')}
              className="bg-black text-[#fefff8] px-[30px] py-[13.5px] h-[68px] w-[326px] rounded-[100px] font-['Petrona'] font-medium italic text-[24px] leading-normal border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] shrink-0 overflow-hidden"
            >
              Lets get building!
            </button>
          </div>

          {/* Right Side - LEGO Brick Illustration */}
          <div className="relative shrink-0 hidden md:block">
            <img
              src={edgarLego}
              alt="Edgar LEGO Character"
              className="block w-auto h-auto max-w-none max-h-[600px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeScreen;
