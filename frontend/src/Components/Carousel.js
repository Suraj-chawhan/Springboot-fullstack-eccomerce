import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Summer Collection",
      subtitle: "New Arrivals",
      description: "Discover the latest trends for the season",
      cta: "Shop Now",
      gradient: "from-[#667eea] to-[#764ba2]"
    },
    {
      title: "Exclusive Deals",
      subtitle: "Up to 50% Off",
      description: "Limited time offers on selected items",
      cta: "View Deals",
      gradient: "from-[#f093fb] to-[#f5576c]"
    },
    {
      title: "Premium Quality",
      subtitle: "Best Sellers",
      description: "Handpicked products just for you",
      cta: "Explore",
      gradient: "from-[#4facfe] to-[#00f2fe]"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[550px] overflow-hidden rounded-b-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 flex items-center justify-center px-20 overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
              index === currentSlide ? 'opacity-100 visible z-10' : 'opacity-0 invisible'
            } bg-gradient-to-br ${slide.gradient}`}
          >
            {/* Content */}
            <div className="max-w-[700px] z-20 animate-slide-in-left">
              <span className="inline-block text-sm font-bold tracking-[2px] uppercase text-white/90 bg-white/20 px-5 py-2 rounded-full mb-5 backdrop-blur-sm">
                {slide.subtitle}
              </span>
              <h2 className="font-['Playfair_Display'] text-[72px] font-black text-white mb-5 leading-[1.1] tracking-[-2px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
                {slide.title}
              </h2>
              <p className="text-xl text-white/95 mb-10 leading-relaxed">
                {slide.description}
              </p>
              <button className="inline-flex items-center gap-3 px-10 py-4.5 bg-white/95 text-[#1a1a2e] rounded-full text-base font-bold shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:bg-white transition-all duration-300 tracking-wide">
                {slide.cta}
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </button>
            </div>

            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none">
              <div className="absolute w-[400px] h-[400px] -top-[100px] -right-[100px] rounded-full bg-white/10 backdrop-blur-lg animate-float"></div>
              <div className="absolute w-[300px] h-[300px] -bottom-[80px] right-[150px] rounded-full bg-white/10 backdrop-blur-lg animate-float-reverse"></div>
              <div className="absolute w-[200px] h-[200px] top-1/2 right-[50px] rounded-full bg-white/10 backdrop-blur-lg animate-float-slow"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 -translate-y-1/2 left-10 z-30 w-[60px] h-[60px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 -translate-y-1/2 right-10 z-30 w-[60px] h-[60px] rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
      >
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 rounded-lg border-2 border-white/50 transition-all duration-300 hover:border-white ${
              index === currentSlide ? 'w-10 bg-white' : 'w-3 bg-transparent'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(20px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(20px) translateX(-20px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float { animation: float 15s infinite ease-in-out; }
        .animate-float-reverse { animation: float-reverse 18s infinite ease-in-out; }
        .animate-float-slow { animation: float-slow 20s infinite ease-in-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default Carousel;