"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import styles from "./Slider.module.scss";
import sliderData from "./SliderData";

const Slider = () => {
  const [isLeft, setIsLeft] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const intervalTime = 3000;

  const nextSlide = useCallback(() => {
    setIsLeft(false);
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  }, [currentSlide, sliderLength]);

  const prevSlide = useCallback(() => {
    setIsLeft(true);
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  }, [currentSlide, sliderLength]);

  useEffect(() => {
    const interval = setInterval(nextSlide, intervalTime);

    return () => {
      clearInterval(interval);
    };
  }, [nextSlide]);

  return (
    <div className={styles.slider}>
      <AiOutlineArrowLeft
        className={`${styles.arrow} ${styles.prev}`}
        onClick={prevSlide}
      />
      <AiOutlineArrowRight
        className={`${styles.arrow} ${styles.next}`}
        onClick={nextSlide}
      />

      {sliderData.map((slider, index) => {
        const { image, heading } = slider;
        return (
          <div
            key={heading}
            className={`
            ${styles.slide}
            ${index === currentSlide && styles.current}
            ${isLeft ? styles.slideLeft : styles.slideRight}
           `}
          >
            {index === currentSlide ? (
              <Image src={image} alt={heading} fill />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
