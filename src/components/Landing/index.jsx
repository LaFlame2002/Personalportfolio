'use client'
import Image from 'next/image'
import styles from './style.module.scss'
import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import { motion } from 'framer-motion';
import { Unbounded } from "next/font/google";
import React from "react";


const unbounded = Unbounded({ subsets: ["latin"] });

export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const thridText = useRef(null);
  const slider = useRef(null);


  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        // onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    // requestAnimationFrame(animate);
  }, [])

   /*const animate = () => {
//     if(xPercent < -100){
//       xPercent = 0;
//     }
//     else if(xPercent > 0){
//       xPercent = -100;
//     }
//     gsap.set(firstText.current, {xPercent: xPercent})
//     gsap.set(secondText.current, {xPercent: xPercent})
//     requestAnimationFrame(animate);
      xPercent += 0.1 * direction;
  }*/

  return (
    <motion.main  variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/background.jpg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
            <p className={unbounded.className} ref={firstText}>Guilherme </p>
            <p className={unbounded.className} ref={secondText}>Mechanical </p>
            <p className={unbounded.className} ref={thridText}>Engineer</p>
        </div>
      </div>
     
    </motion.main>
  )
}