import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      name: "Classic Cheeseburger",
      category: "Fast Food",
      price: "₹199",
      description: "Juicy grilled patty, melted cheese, fresh lettuce & house sauce.",
      cta: "Order Now",
      gradient: "from-[#ff9a9e] to-[#fad0c4]"
    },
    {
      name: "Italian Veg Pizza",
      category: "Chef's Special",
      price: "₹349",
      description: "Stone-baked pizza topped with olives, basil & mozzarella.",
      cta: "Add to Cart",
      gradient: "from-[#fbc2eb] to-[#a6c1ee]"
    },
    {
      name: "Healthy Buddha Bowl",
      category: "Healthy Choice",
      price: "₹299",
      description: "Quinoa, roasted veggies, avocado & protein-rich chickpeas.",
      cta: "Try Now",
      gradient: "from-[#84fab0] to-[#8fd3f4]"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-[550px] overflow-hidden rounded-b-[40px] shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
      {/* Slides */}
      {slides.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 flex items-center justify-center px-20 transition-all duration-[800ms] ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0"
          } bg-gradient-to-br ${item.gradient}`}
        >
          {/* Content */}
          <div className="max-w-[700px] text-white animate-slide-in-left">
            <span className="inline-block text-sm font-bold uppercase tracking-widest bg-white/20 px-5 py-2 rounded-full mb-5">
              {item.category}
            </span>

            <h2 className="text-[70px] font-black leading-tight drop-shadow-lg">
              {item.name}
            </h2>

            <p className="text-xl mt-4 mb-6 opacity-95">
              {item.description}
            </p>

            <div className="text-3xl font-extrabold mb-8">
              {item.price}
            </div>

            <button className="px-10 py-4 bg-white text-black rounded-full font-bold shadow-lg hover:scale-105 transition">
              {item.cta}
            </button>
          </div>

          {/* Decorative Elements */}
          <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
            <div className="absolute w-[350px] h-[350px] bg-white/15 rounded-full -top-20 -right-20 animate-float"></div>
            <div className="absolute w-[250px] h-[250px] bg-white/15 rounded-full bottom-20 right-40 animate-float-reverse"></div>
          </div>
        </div>
      ))}

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded-full text-white hover:scale-110 transition"
      >
        ❮
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/20 rounded-full text-white hover:scale-110 transition"
      >
        ❯
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-3 rounded-full transition-all ${
              i === currentSlide ? "w-10 bg-white" : "w-3 bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-reverse {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(20px); }
        }
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-float { animation: float 14s infinite ease-in-out; }
        .animate-float-reverse { animation: float-reverse 18s infinite ease-in-out; }
        .animate-slide-in-left { animation: slide-in-left 0.8s ease-out; }
      `}</style>
    </div>
  );
};

export default Carousel;
