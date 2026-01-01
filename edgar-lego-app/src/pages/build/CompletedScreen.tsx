import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuildStore } from '../../store/buildStore';
import edgarLego from '../../assets/images/EdgarLego.svg';
import arrowBack from '../../assets/images/arrow-back.svg';
import PageLayout from '../../components/layout/PageLayout';

function CompletedScreen() {
  const navigate = useNavigate();
  const { addPhoto } = useBuildStore();
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showCamera && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.error('Error accessing camera:', err);
          alert('Unable to access camera. Please check permissions.');
        });
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [showCamera]);

  const handleTakePicture = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      fileInputRef.current?.click();
    } else {
      setShowCamera(true);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        setShowCamera(false);

        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      }
    }
  };

  const savePhoto = () => {
    if (capturedImage) {
      const photo = {
        id: Date.now().toString(),
        imageUrl: capturedImage,
        timestamp: Date.now(),
      };
      addPhoto(photo);
      setCapturedImage(null);
      navigate('/build/gallery');
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (!isMobile) {
      setShowCamera(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleBack = () => {
    navigate('/build');
  };

  return (
    <PageLayout showLogo={false} className="overflow-hidden" contentClassName="justify-center items-center">
      <div style={{
        width: '937px',
        maxWidth: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '18px',
        display: 'flex',
        position: 'relative',
        zIndex: 1,
        padding: '24px' // Added padding that was on the outer container
      }}>
        <div style={{
          alignSelf: 'stretch',
          height: '624px',
          position: 'relative',
          background: '#CCE5FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={edgarLego}
            alt="Edgar LEGO Character"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain'
            }}
          />
        </div>

        <div style={{
          alignSelf: 'stretch',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <button
            onClick={handleBack}
            style={{
              border: '1px solid #939393',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '34px 41px',
              borderRadius: '80px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(180deg)',
              width: '27px',
              height: '15px'
            }}>
              <img src={arrowBack} alt="Back" style={{ width: '100%', height: '100%' }} />
            </div>
          </button>

          <button
            onClick={handleTakePicture}
            style={{
              backgroundColor: '#000000',
              display: 'flex',
              height: '68px',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '13.5px 30px',
              borderRadius: '100px',
              flex: 1,
              maxWidth: '399px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              fontFamily: 'Petrona, sans-serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '24px',
              color: '#FEFFF8',
              border: 'none'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            Take a picture!
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          left: 0,
          top: '55vh',
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
            gap: '60px',
            width: 'fit-content'
          }}
        >
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              style={{
                fontFamily: 'Epilogue, sans-serif',
                fontWeight: 600,
                fontSize: 'clamp(80px, 20vw, 270px)',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                WebkitTextStroke: 'clamp(1px, 0.3vw, 3px) black',
                WebkitTextFillColor: 'transparent',
                color: 'transparent',
                flexShrink: 0
              }}
            >
              💥 We did it! 🧰
            </span>
          ))}
        </div>
      </div>

      {showCamera && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '672px',
            backgroundColor: 'black',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{
              position: 'relative',
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '16/9'
            }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => {
                  setShowCamera(false);
                  if (streamRef.current) {
                    streamRef.current.getTracks().forEach((track) => track.stop());
                  }
                }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4b5563',
                  color: 'white',
                  borderRadius: '100px',
                  fontFamily: 'Epilogue, sans-serif',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={capturePhoto}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '100px',
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Capture
              </button>
            </div>
          </div>
        </div>
      )}

      {capturedImage && !showCamera && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div style={{
            width: '100%',
            maxWidth: '672px',
            backgroundColor: 'black',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <div style={{
              position: 'relative',
              backgroundColor: '#1f2937',
              borderRadius: '8px',
              overflow: 'hidden',
              aspectRatio: '16/9'
            }}>
              <img
                src={capturedImage}
                alt="Captured photo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '16px',
              justifyContent: 'center'
            }}>
              <button
                onClick={retakePhoto}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#4b5563',
                  color: 'white',
                  borderRadius: '100px',
                  fontFamily: 'Epilogue, sans-serif',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Retake
              </button>
              <button
                onClick={savePhoto}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'white',
                  color: 'black',
                  borderRadius: '100px',
                  fontFamily: 'Epilogue, sans-serif',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Save to Gallery
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .marquee-track {
          animation: marquee-scroll 120s linear infinite;
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
