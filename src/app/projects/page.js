'use client'
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Unbounded } from "next/font/google";
// Importação das imagens
import Picture1 from '../../../public/images/1.jpg';
import Picture2 from '../../../public/images/2.jpg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg';
import Picture5 from '../../../public/images/5.jpg';

gsap.registerPlugin(ScrollTrigger);

const unbounded = Unbounded({ subsets: ["latin"] });

export default function Projects() {
  useEffect(() => {
    const previewDiv = document.querySelector(`.${styles.previewimg}`);
    const gallery = document.querySelector(`.${styles.gallery}`);
    const previewImage = document.querySelector(`.${styles.previewimg} img`);
    const previewDescription = document.querySelector(`.${styles.previewDescription}`);
    const fullscreenOverlay = document.querySelector(`.${styles.fullscreenOverlay}`);
    const fullscreenImage = document.querySelector(`.${styles.fullscreenImage}`);

    if (!gallery || !previewImage || !fullscreenOverlay || !fullscreenImage || !previewDiv || !previewDescription) {
      console.error("Um ou mais elementos não foram encontrados:", {
        gallery,
        previewImage,
        fullscreenOverlay,
        fullscreenImage,
        previewDiv,
        previewDescription
      });
      return; // Verifica se os elementos existem antes de continuar
    }

    // Função para manipular o movimento do mouse
    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      const centerX = window.innerWidth / 10;
      const centerY = window.innerHeight / 2;

      const percentX = (x - centerX) / centerX;
      const percentY = (y - centerY) / centerY;

      const rotateX = 55 + percentY * 2;
      const rotateY = percentX * 2;

      // Anima a rotação da galeria com base na posição do mouse
      gsap.to(gallery, {
        duration: 1,
        ease: "power2.out",
        rotateX: rotateX,
        rotateY: rotateY,
        overwrite: "auto",
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Defina os links para cada imagem
    const links = [
      'https://www.exemplo1.com',
      'https://www.exemplo2.com',
      'https://www.exemplo3.com',
      'https://www.exemplo4.com',
      'https://www.exemplo5.com'
    ];

    // Array das imagens importadas
    const images = [Picture1.src, Picture2.src, Picture3.src, Picture4.src, Picture5.src];
    
    // Array das descrições
    const descriptions = [
      'Descrição 1',
      'Descrição 2',
      'Descrição 3',
      'Descrição 4',
      'Descrição 5'
    ];

    // Cria 50 itens de galeria com imagens e links
    for (let i = 0; i < 50; i++) {
      const item = document.createElement("div");
      item.className = styles.item;

      const link = document.createElement("a");
      link.href = links[i % links.length]; // Define o link específico para cada imagem
      link.target = "_blank"; // Abre o link em uma nova aba

      const img = document.createElement("img");
      img.src = images[i % images.length]; // Usa os caminhos das imagens importadas

      item.appendChild(link);
      link.appendChild(img);
      gallery.appendChild(item);
    }

    const items = document.querySelectorAll(`.${styles.item}`);
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    let currentLink = links[0]; // Armazena o link da imagem central

    items.forEach((item, index) => {
      // Define a rotação inicial de cada item
      gsap.set(item, {
        rotationY: 90,
        rotationZ: index * angleIncrement,
        transformOrigin: "50% 400px",
      });

      // Evento de mouseover para pré-visualizar a imagem e aumentar a escala
      item.addEventListener("mouseover", function () {
        const imgInsideItem = item.querySelector("img");
        previewImage.src = imgInsideItem.src;
        previewDescription.innerHTML = `<div class="${unbounded.className}">${descriptions[index % descriptions.length]}</div>`; // Atualiza a descrição com a fonte
        currentLink = links[index % links.length]; // Atualiza o link atual para o da imagem central

        // Move o item horizontalmente ao passar o mouse
        gsap.to(item, {
          x: 20,
          y: 20,
          z: 20,
          ease: "power2.out",
          duration: 0.5,
        });
      });

      // Evento de mouseout para redefinir a posição do item
      item.addEventListener("mouseout", function () {
        gsap.to(item, {
          x: 0,
          y: 0,
          z: 0,
          ease: "power2.out",
          duration: 0.5,
        });
      });

      // Evento de clique para exibir a imagem em fullscreen
      item.addEventListener("click", function (event) {
        const imgInsideItem = item.querySelector("img");
        fullscreenImage.src = imgInsideItem.src;
        fullscreenOverlay.classList.add('active');
        event.stopPropagation(); // Previne que o link seja aberto ao clicar para fullscreen
      });
    });

    // Configura a rotação inicial dos itens
    const setupRotation = () => {
      items.forEach((item, index) => {
        const currentAngle = index * angleIncrement - 90;
        gsap.set(item, {
          rotationZ: currentAngle,
        });
      });
    };

    // Configura o ScrollTrigger para atualizar a rotação dos itens com o scroll
    ScrollTrigger.create({
      trigger: 'body',
      start: "top top",
      end: "bottom bottom",
      scrub: 2,
      onRefresh: setupRotation,
      onUpdate: (self) => {
        const rotationProgress = self.progress * 360 * 1;
        items.forEach((item, index) => {
          const currentAngle = index * angleIncrement - 90 + rotationProgress;
          gsap.to(item, {
            rotationZ: currentAngle,
            duration: 1,
            ease: "power3.out",
            overwrite: "auto",
          });
        });
      }
    });

    // Evento de clique para fechar o overlay fullscreen
    fullscreenOverlay.addEventListener("click", () => {
      fullscreenOverlay.classList.remove('active');
    });

    // Adiciona animação de escala para a div previewimg
    const handleMouseOverPreview = () => {
      gsap.to(previewDiv, {
        scale: 1.2,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const handleMouseOutPreview = () => {
      gsap.to(previewDiv, {
        scale: 1,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    // Evento de clique para redirecionar ao link da imagem central
    previewDiv.addEventListener("click", () => {
      window.open(currentLink, '_blank');
    });

    previewDiv.addEventListener("mouseover", handleMouseOverPreview);
    previewDiv.addEventListener("mouseout", handleMouseOutPreview);

    // Limpa o evento de mousemove ao desmontar o componente
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      previewDiv.removeEventListener("mouseover", handleMouseOverPreview);
      previewDiv.removeEventListener("mouseout", handleMouseOutPreview);
      previewDiv.removeEventListener("click", () => {
        window.open(currentLink, '_blank');
      });
    };
  }, []);

  return (
    <div className={styles.global}>
      <div className={styles.previewimg}>
        <div className={styles.previewDescription}>
          <div className={unbounded.className}>Projects Gallery</div>
        </div>
        <img
          className={styles.img}
          src={Picture1.src} 
          alt="image"
        />
      </div>

      <div className={styles.container}>
        <div className={styles.gallery}></div>
      </div>

      <div className={styles.projects}>
        Select one of the projects and click to preview it
      </div>

      <div className={`${styles.fullscreenOverlay}`}>
        <img className={`${styles.fullscreenImage}`} src="" alt="" />
      </div>
    </div>
  );
}
