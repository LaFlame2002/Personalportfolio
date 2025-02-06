/*'use client'

import Picture2 from '../../../public/images/1.jpg';
import Picture3 from '../../../public/images/3.jpg';
import Picture4 from '../../../public/images/4.jpg'

import Picture6 from '../../../public/images/6.jpg'
import Picture7 from '../../../public/images/7.jpg'
import Image from 'next/image';
import { useScroll, useTransform, motion} from 'framer-motion';
import { useRef } from 'react';

import styles from './style.module.scss'

export default function Index() {
  
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end']
  })

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  return (
    <div className={styles.container}>
       <div className={styles.sticky}>
        <div className={styles.el}>
          <motion.div style={{scale: scale4}} className={styles.imageContainer}>
            <Image
              src={Picture1}
              fill
              alt="image"
              placeholder='blur'
              />
          </motion.div>
        </div>
       </div>
    </div>
  )
}
*/
