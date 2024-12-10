import React, { useState, useEffect } from "react";
import "./Carousel.css";

interface CarouselProps {
  images: string[];
  autoScrollInterval?: number; // Optional prop for auto-scroll interval in milliseconds
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoScrollInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, autoScrollInterval);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [autoScrollInterval, images.length]);

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={goToPrevious}>
        &lt;
      </button>
      <div className="carousel-images">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className={`carousel-image ${
              index === currentIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
      <button className="carousel-button next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
