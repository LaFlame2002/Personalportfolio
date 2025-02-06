'use client'

import "./globals.css";
import { Experience } from "../components/Lambo/Experience";
import Landing from '../components/Landing';
import Description from '../components/Description';
import Header from '../components/Header';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import { Unbounded } from "next/font/google";
import { useEffect, useState } from 'react'


const unbounded = Unbounded({
  subsets: ['latin'],
  weight: '400',
});


export default function Home () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])
  return (
         <main className="relative h-screen ">
        
          <Landing /> 
          <Experience /> 
          <Description />
          <Projects />
          <Contact />
    
  

         </main>
     )
  }
