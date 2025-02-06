'use client'
import React from 'react';
import styles from './style.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span>
        Made by <strong>Guilherme Dutra</strong> <br />
        <strong>About this website:</strong> Built with React and Next.js, Sass, GSAP, Framer Motion, Three.js, Embla Carousel and more...
      </span>
    </footer>
  );
};

export default Footer;
