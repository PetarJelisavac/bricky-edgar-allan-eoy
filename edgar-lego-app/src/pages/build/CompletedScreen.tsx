import { useNavigate } from 'react-router-dom';
import PageLayout from '../../components/layout/PageLayout';
import { useBuildStore, brickColorPalettes } from '../../store/buildStore';
import EdgarLego from '../../components/bricks/EdgarLego';
import marqueeSvg from '../../assets/images/Marqee 1.svg';

// Background colors matching the color picker cards
const colorBackgrounds: Record<string, string> = {
  'Baddy Blue': '#CCE5FF',
  'Wine': '#FED4E5',
  'Sunshine': '#FFDE96',
  'Rojo': '#FFC1C1',
  'Coal': '#D9D9D9',
};

function CompletedScreen() {
  const navigate = useNavigate();
  const { selectedBrickColor } = useBuildStore();
  
  // Get background color based on selected brick color
  const backgroundColor = selectedBrickColor ? colorBackgrounds[selectedBrickColor] : '#CCE5FF';

  const handleStartAgain = () => {
    navigate('/');
  };

  return (
    <PageLayout showLogo={false} className="overflow-hidden pb-[max(20px,calc(env(safe-area-inset-bottom)+8px))]" contentClassName="justify-center items-center">
      {/* Main content container */}
      <div className="w-full max-w-[930px] flex flex-col gap-[18px] flex-1 min-h-0 overflow-hidden p-4">
        {/* Background container with EdgarLego figure */}
        <div 
          className="relative flex-1 rounded-lg min-h-[300px] overflow-hidden flex items-center justify-center"
          style={{ backgroundColor }}
        >
          <EdgarLego 
            colorPalette={selectedBrickColor ? brickColorPalettes[selectedBrickColor] : undefined}
            className="h-[90%] w-auto"
            style={{ maxHeight: '500px' }}
          />
        </div>

        {/* Button wrapper */}
        <div className="flex items-center justify-center w-full h-[52px] sm:h-[68px] shrink-0">
          <button
            onClick={handleStartAgain}
            className="h-full bg-black text-[#fefff8] rounded-full px-6 sm:px-[30px] font-['Petrona'] font-medium italic text-lg sm:text-2xl border-none cursor-pointer flex items-center justify-center transition-transform hover:scale-[1.02] min-w-[180px] sm:min-w-[208px]"
          >
            Start Again
          </button>
        </div>
      </div>

      {/* Marquee effect with We did it SVG */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 'calc(55vh - 80px)',
          width: '100vw',
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'visible'
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: '80px',
            width: 'fit-content'
          }}
        >
          {[...Array(10)].flatMap((_, i) => [
            <span key={`boom-${i}`} style={{ fontSize: '150px', flexShrink: 0 }}>💥</span>,
            <img
              key={`svg1-${i}`}
              src={marqueeSvg}
              alt="We did it!"
              style={{
                height: '200px',
                width: 'auto',
                flexShrink: 0
              }}
            />,
            <span key={`toolbox-${i}`} style={{ fontSize: '150px', flexShrink: 0 }}>🧰</span>,
            <img
              key={`svg2-${i}`}
              src={marqueeSvg}
              alt="We did it!"
              style={{
                height: '200px',
                width: 'auto',
                flexShrink: 0
              }}
            />
          ])}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee-scroll 20s linear infinite;
        }

        @keyframes marquee-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </PageLayout>
  );
}

export default CompletedScreen;
