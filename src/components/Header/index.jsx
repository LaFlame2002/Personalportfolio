'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import styles from './style.module.scss';
import Nav from './Nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePathname } from 'next/navigation';
import { slideUp } from './animation';
import Link from 'next/link';
import React from "react";


const menuVariants = {
  open: {
    width: "480px",
    height: "500px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }
};

export default function Index() {
  const cabeça = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false);
  }, [pathname]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "100vh",
      onEnter: () => {
        setShowButton(true);
        gsap.fromTo(button.current, { scale: 0 }, { scale: 1, duration: 0.25, ease: "power1.out" });
      },
      onLeaveBack: () => {
        gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out", onComplete: () => setShowButton(false) });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <>
      <motion.main variants={slideUp} initial="initial" animate="enter">
        <div ref={cabeça} className={styles.cabeça}>
          <div className={styles.logo}>
            <Link href="/">
              <p className={styles.copyright}>:)</p>
            </Link>
            <Link href="/">
              <div className={styles.name}>
                <p className={styles.codeBy}>Made By</p>
                <p className={styles.dennis}>Guilherme</p>
                <span></span>
                <p className={styles.snellenberg}>Dutra</p>
              </div>
            </Link>
          </div>
          <div className={styles.nav}>
            <Link href="/about">
              <div className={styles.el}>
                About
                <div className={styles.indicator}></div>
              </div>
            </Link>
            <Link href="/projects">
              <div className={styles.el}>
                projects
                <div className={styles.indicator}></div>
              </div>
            </Link>
            <Link href="/contact">
              <div className={styles.el}>
                Contact
                <div className={styles.indicator}></div>
              </div>
            </Link>
            <Link href="/Customize">
              <div className={styles.el}>
                Customize
                <div className={styles.indicator}></div>
              </div>
            </Link>
          </div>
        </div>
      </motion.main>
      {showButton && (
        <div ref={button} className={styles.header}>
          <motion.div
            className={styles.menu}
            variants={menuVariants}
            animate={isActive ? "open" : "closed"}
            initial="closed"
          >
            <AnimatePresence>
              {isActive && <Nav />}
            </AnimatePresence>
          </motion.div>
          <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
        </div>
      )}
    </>
  );
}
