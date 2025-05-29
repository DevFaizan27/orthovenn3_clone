import React, { useEffect } from 'react';

const HeroSection = () => {
  useEffect(() => {
    const handleScroll = () => {
      const yOffset = window.pageYOffset;
      const image = document.querySelector('.parallax-image');
      if (image) {
        image.style.transform = `translateY(${yOffset * 0.4}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(1.05); }
          to { opacity: 1; transform: scale(1); }
        }
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        .fade-in {
          animation: fadeIn 1.5s ease-out forwards;
        }
        .parallax-image {
          transition: transform 0.1s ease-out;
        }
      `}</style>

      <div className="w-full ">
        <img 
          src="/home.png" 
          alt="Hero" 
          className="fade-in floating parallax-image w-[93vw] m-auto object-fit
                    h-[300px] sm:h-[400px] md:h-[500px] lg:h-[400px] xl:h-[600px]"
        />
      </div>
    </div>
  );
};

export default HeroSection;