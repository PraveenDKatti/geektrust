import React, { useState } from "react";
import imageUrls from '../utility/imageData'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const images = imageUrls

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full md:w-3/4 h-full object-cover mx-auto shadow-lg overflow-hidden">
      {/*Slider for big screens*/}
      <div className="hidden md:block">
        {/* Slider Container for large screens*/}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className="w-full object-cover flex-shrink-0 rounded-lg"
            />
          ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/70 p-2 rounded-full shadow hover:bg-white"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bullets */}
        <div className="absolute bottom-3 w-full flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400/70"
                }`}
            ></button>
          ))}
        </div>
      </div>

      {/*Slider for small screens*/}
      <div className="md:hidden">
        <Swiper
          className="md:hidden"
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 1000 }}
          speed={700} // matches your duration-700
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
          {/* Bullets */}
          <div className="absolute bottom-3 w-full flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-white" : "bg-gray-400/70"
                  }`}
              ></button>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  );
}
