import { useNavigate } from 'react-router-dom';
import edgarLego from '../../assets/images/EdgarLego.svg';
import PageLayout from '../../components/layout/PageLayout';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 gap-8 w-full h-full">
        {/* Main Content Container */}
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-[92px] items-center xl:items-center justify-center max-w-[1200px] w-full mt-24">
          {/* Text Content */}
          <div className="flex flex-col gap-[40px] xl:gap-[70px] w-full max-w-[467px] shrink-0">
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

          {/* LEGO Brick Background - Hidden on mobile, shown on desktop */}
          <div className="relative shrink-0 hidden xl:block">
            <img
              src={edgarLego}
              alt="Edgar LEGO Character"
              className="block w-auto h-auto max-w-none max-h-[600px]"
            />
          </div>
        </div>

        {/* LEGO Brick Background - Centered on mobile */}
        <div className="relative shrink-0 xl:hidden flex items-center justify-center my-8">
          <img
            src={edgarLego}
            alt="Edgar LEGO Character"
            className="block w-auto h-auto max-w-none max-h-[280px]"
          />
        </div>

        {/* CTA Button - Centered */}
        <button
          onClick={() => navigate('/build/step/1')}
          className="bg-black text-[#fefff8] px-[30px] py-[13.5px] h-[68px] w-full max-w-[351px] xl:max-w-[326px] rounded-[100px] font-['Petrona'] font-medium italic text-[24px] leading-normal border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] shrink-0 overflow-hidden"
        >
          Lets get building!
        </button>
      </div>
    </PageLayout>
  );
}

export default WelcomeScreen;
