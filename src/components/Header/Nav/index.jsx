// components/header/nav/Navbar.jsx
import Link from 'next/link';
import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from './anim';
import React from "react";


export default function Navbar() {
  const handleClick = (title) => {
    console.log(`${title} button clicked`);
    // Adicione funcionalidade específica para cada clique de botão aqui
  };

  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => {
          const { title, href, className } = link;
          return (
            <div key={`b_${i}`} className={styles.linkContainer}>
              <motion.div
                custom={i}
                variants={perspective}
                initial="initial"
                animate="enter"
                exit="exit"
              >
                <ul>
                  <li>
                    <Link href="/pages">
                      <span className={className} onClick={() => handleClick(title)}>
                        {title}
                      </span>
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </div>
          );
        })}
      </div>
      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => {
          const { title, href } = link;
          return (
            <motion.a
              variants={slideIn}
              custom={i}
              initial="initial"
              animate="enter"
              exit="exit"
              key={`f_${i}`}
              href={href}
            >
              {title}
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
