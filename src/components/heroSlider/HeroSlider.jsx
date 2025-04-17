import { useState, useEffect, useRef } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import laptop from "../../assets/images/heroSlider/laptop.jpg";
import homeAppliances from "../../assets/images/heroSlider/home-appliances.jpg";
import book from "../../assets/images/heroSlider/book.jpg";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);
  const navigate = useNavigate();

  const slides = [
    {
      image: laptop,
      title: "New Collection 2025",
      subtitle: "Discover timeless elegance",
      cta: "Shop Now",
      link: "/category/electronics",
    },
    {
      image: homeAppliances,
      title: "Premium Essentials",
      subtitle: "Quality that speaks for itself",
      cta: "Explore",
      link: "/category/home-appliances",
    },
    {
      image: book,
      title: "Limited Edition",
      subtitle: "Exclusive pieces",
      cta: "View Collection",
      link: "/category/books",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const touchStart = touchStartRef.current;
    const touchEnd = touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(touchStart - touchEnd) > minSwipeDistance) {
      if (touchStart > touchEnd) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <section className="relative bg-gray-50 rounded-2xl overflow-hidden">
          <div
            className="h-[450px] lg:h-[600px] touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 w-full h-full transition-all duration-500
                ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              >
                {/* Ana Container */}
                <div className="relative h-full">
                  {/* Resim */}
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-transparent" />

                  {/* İçerik */}
                  <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-16 w-full lg:w-1/2">
                    <h1 className="text-2xl lg:text-4xl font-light text-white mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-sm text-gray-200 mb-6">
                      {slide.subtitle}
                    </p>
                    <button
                      onClick={() => navigate(slides[currentSlide].link)}
                      className="inline-flex items-center px-6 py-2.5 text-sm 
                      bg-white text-gray-900 rounded-full hover:bg-gray-100 
                      transition-all w-fit cursor-pointer"
                    >
                      {slide.cta}
                      <HiArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Sadece Desktop */}
          <div className="hidden lg:flex absolute right-8 bottom-8 gap-2">
            <button
              onClick={() =>
                setCurrentSlide((prev) =>
                  prev === 0 ? slides.length - 1 : prev - 1
                )
              }
              className="p-2 rounded-full bg-white/90 hover:bg-white 
              transition-colors duration-200 cursor-pointer"
              aria-label="Previous slide"
            >
              <HiArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() =>
                setCurrentSlide((prev) => (prev + 1) % slides.length)
              }
              className="p-2 rounded-full bg-white/90 hover:bg-white 
              transition-colors duration-200 cursor-pointer"
              aria-label="Next slide"
            >
              <HiArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-8 flex gap-1.5">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1 rounded-full transition-all duration-300 cursor-pointer
                ${index === currentSlide ? "w-6 bg-white" : "w-3 bg-white/40"}`}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSlider;
