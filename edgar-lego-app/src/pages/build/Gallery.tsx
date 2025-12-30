import { useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import logoLego from '../../assets/images/Logo.Lego.svg';

function Gallery() {
  const navigate = useNavigate();
  const { galleryPhotos } = useBuildStore();

  return (
    <div className="min-h-screen bg-[#fefff8] flex flex-col relative">
      {/* LEGO Logo - Top Left */}
      <div className="absolute top-6 left-6 z-10">
        <img
          src={logoLego}
          alt="Edgar Allan LEGO Logo"
          className="w-[160px] h-auto"
        />
      </div>

      {/* Header */}
      <div className="pt-24 px-6 pb-8">
        <h1 className="font-epilogue font-semibold text-3xl lg:text-4xl text-black mb-2">
          Your Gallery
        </h1>
        <p className="font-epilogue text-lg text-gray-700">
          Your completed LEGO Edgar creations
        </p>
      </div>

      {/* Gallery Grid */}
      <div className="flex-1 px-6 pb-6">
        {galleryPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="text-6xl">📸</div>
            <p className="font-epilogue text-xl text-gray-600 text-center">
              No photos yet. Complete your build and take a photo to add it here!
            </p>
            <button
              onClick={() => navigate('/build')}
              className="bg-black text-[#fefff8] px-8 py-4 rounded-[100px] font-petrona font-medium italic text-xl border-none cursor-pointer transition-transform hover:scale-[1.02]"
            >
              Start Building
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="relative aspect-square bg-gray-200 rounded-lg overflow-hidden group cursor-pointer"
              >
                <img
                  src={photo.imageUrl}
                  alt={`LEGO Edgar ${new Date(photo.timestamp).toLocaleDateString()}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-epilogue">
                    {new Date(photo.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate('/build')}
          className="flex items-center gap-2 text-black font-epilogue font-semibold text-lg hover:underline"
        >
          <svg
            className="w-6 h-6 rotate-180"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Back to Build
        </button>
      </div>
    </div>
  );
}

export default Gallery;

