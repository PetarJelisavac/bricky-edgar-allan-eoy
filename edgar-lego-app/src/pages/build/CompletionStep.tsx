import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { useBuildStore } from '../../store/buildStore';

function CompletionStep() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const { addPhoto, galleryPhotos, resetBuild } = useBuildStore();

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      addPhoto({
        id: Date.now().toString(),
        imageUrl: capturedImage,
        timestamp: Date.now(),
      });
      alert('Photo saved to gallery!');
    }
  };

  const handleFinish = () => {
    resetBuild();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Completion message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="font-epilogue font-semibold text-5xl text-white mb-4">
            Congratulations!
          </h1>
          <p className="text-white/90 text-2xl">
            You've successfully built your LEGO Edgar!
          </p>
        </motion.div>

        {/* Photo capture section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 space-y-4">
            <h2 className="font-epilogue font-semibold text-2xl text-black mb-4">
              Take a Photo
            </h2>

            {!capturedImage ? (
              <>
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <Webcam
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={capture}
                  className="w-full bg-lego-blue text-white px-6 py-3 rounded-full
                             font-petrona italic text-lg hover:bg-blue-600 transition-colors"
                >
                  📸 Capture Photo
                </button>
              </>
            ) : (
              <>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => setCapturedImage(null)}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-full
                               font-petrona italic text-lg hover:bg-gray-50 transition-colors"
                  >
                    Retake
                  </button>
                  <button
                    onClick={savePhoto}
                    className="flex-1 bg-lego-blue text-white px-6 py-3 rounded-full
                               font-petrona italic text-lg hover:bg-blue-600 transition-colors"
                  >
                    Save to Gallery
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Gallery section */}
          <div className="bg-white rounded-2xl p-8 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-epilogue font-semibold text-2xl text-black">
                Gallery
              </h2>
              <button
                onClick={() => setShowGallery(!showGallery)}
                className="text-lego-blue hover:underline"
              >
                {showGallery ? 'Hide' : 'Show'} ({galleryPhotos.length})
              </button>
            </div>

            {showGallery && galleryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {galleryPhotos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.imageUrl}
                    alt="Gallery"
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                ))}
              </div>
            ) : showGallery ? (
              <p className="text-gray-500 text-center py-8">
                No photos yet. Capture your first photo!
              </p>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">Click "Show" to view gallery</p>
              </div>
            )}
          </div>
        </div>

        {/* Finish button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleFinish}
            className="bg-white text-lego-blue px-16 py-4 rounded-full
                       font-petrona italic text-2xl hover:bg-gray-100 transition-colors
                       shadow-lg"
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default CompletionStep;
