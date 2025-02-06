'use client';
import React, { useRef, useEffect, useState } from "react";
import { slideUp, opacity } from './animation';
import styles from './style.module.scss';
import { useInView, motion, useTransform, useScroll } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import dynamic from 'next/dynamic';


// Carregar dinamicamente o componente Video apenas no cliente
const Video = dynamic(() => import('next-video'), { ssr: false });

export default function Index() {
  const phrase = "Take a look.";
  const descriptionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({

    target: container,

    offset: ["start end", "end start"]

})

  useEffect(() => {
    const handleScroll = () => {
      if (descriptionRef.current) {
        const rect = descriptionRef.current.getBoundingClientRect();
        setIsInView(rect.top < window.innerHeight);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const handleSlideClick = (link) => {
    window.location.href = link;
  };
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])
  return (
    <div className={styles.projects}>
      <div ref={descriptionRef} className={styles.description}>
        <div className={styles.body}>
          <p>
            {phrase.split(" ").map((word, index) => (
              <span className={styles.mask} key={index}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                >  
                  {word}
                </motion.span>
              </span>
            ))}
          </p>
          <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
            Here are all my projects. Hope you enjoy.
          </motion.p>
          <div data-scroll data-scroll-speed={0.1}></div>
        </div>
      </div>

      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla__slide} onClick={() => handleSlideClick('https://drive.google.com/drive/folders/1TR3XYoCDEvZQjioo2vZSx0ce0SmFUy4f?usp=drive_link')}>
            <Video 
              src="/videos/3dbike.mp4" 
              autoplay={true}
              muted={true} 
              controls={false}
              loop={true}
            />
            <div className={styles.text}>
              Solidworks
              <p>Transformando ideias em realidade.</p>
              <p>Projetando o futuro.</p>
            </div>
          </div>
          <div className={styles.embla__slide} onClick={() => handleSlideClick('https://drive.google.com/drive/folders/EXEMPLO_ID_2')}>
           
            <div className={styles.text}>
              Excel
              <p>Dados direcionando decisões inteligentes.</p>
              <p>Potencializando a produtividade com Excel.</p>
            </div>
          </div>
          <div className={styles.embla__slide} onClick={() => handleSlideClick('https://drive.google.com/drive/folders/EXEMPLO_ID_3')}>
            <div className={styles.text}>
              Power BI
              <p>Visualizando dados com inteligência.</p>
              <p>Construindo decisões estratégicas com Power BI.</p>
            </div>
          </div>
          <div className={styles.embla__slide}>
            <p className={styles.text}>slide 4</p>
          </div>
        </div>
        <div className={styles.slide_controls}>
          <button className={styles.slide_control_button} onClick={scrollPrev}>
            <p className={styles.prev}>&#8249;</p>
          </button>
          <button className={styles.slide_control_button1} onClick={scrollNext}>
            <p className={styles.next}>&#8250;</p>
          </button>
        </div>



        
     </div>
     <motion.div style={{height}} className={styles.circleContainer}>

<div className={styles.circle}></div>

</motion.div>
    </div>

 
  );
}
