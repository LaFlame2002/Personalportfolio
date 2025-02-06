'use client';

import styles from './style.module.scss';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useRef, useLayoutEffect } from 'react';
import { DM_Sans } from 'next/font/google';
import Image from 'next/image';

const dmSans = DM_Sans({ subsets: ["latin"] });

export default function About() {

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (document.documentElement) {
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: "100vh",
      });
    }
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <div className={dmSans.className}>
        <div className={styles.imageContainer}>
          <Image 
            fill={true}
            alt={"image"}
            src={`/images/fotoabout.jpg`}
          />
        </div>
        <h1 className={styles.sobre}>More about me</h1>
        <p className={styles.sobreTexto}>
          Hello! My name is Guilherme Dutra, I am 22 years old. I currently live in Rio das Ostras and I am studying Mechanical Engineering at UFRJ in Macaé. I participate in the PET projects, in the Excel and Power BI sector, and Fernando Amorim, in the Structures sector. Besides college, I am interested in using software such as SolidWorks and Excel, and as a hobby, I learn programming. I am committed to becoming an innovative professional.
        </p>
        <h1 className={styles.formacao}>Academic Background</h1>
        <p className={styles.formacaoTexto}>
          Fisk Course - Advanced English - Graduated in 2023<br/>
          Excel - Udemy - 2024<br/>
          SolidWorks - UFRJ - 2024<br/>
          AutoCAD - UFRJ - 2024 <br/>
          Python - UFRJ - 2022
        </p>
        <h1 className={styles.experience}>Academic Projects</h1>
        <p className={styles.experienceTexto}>
          PET - Programa de Educação Tutorial<br/> <br/>
          Description: I teach Excel and Power BI to children and teenagers in schools, aiming to enhance students' education, stimulate critical thinking, and promote ethics and citizenship. <br/> <br/> <br/>
          Projeto Fernando Amorim<br/> <br/>
          Description: Is an innovative college project focused on a solar-powered boat. In the structural sector, I handle identifying and solving any issues the boat may encounter. My role is to ensure that all structural aspects of the boat function perfectly and efficiently.
        </p>
      </div>
    </div>
  );
}
