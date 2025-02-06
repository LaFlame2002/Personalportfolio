import styles from './style.module.scss';

import Rounded from '../../common/RoundedButton';
import { useRef } from 'react';
import { useScroll, motion, useTransform, useSpring } from 'framer-motion';


export default function index() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })
    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])
    return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                       
                        <h2>Let's Talk</h2>
                    </span>
              
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Rounded  backgroundColor={"#334BD3"} className={styles.button}>
                            <p>Get in touch</p>
                        </Rounded>
                    </motion.div>
                   
                </div>
                <div className={styles.nav}>
                        <Rounded>
                            <p>goodguilhermedutra2002@gmail.com</p>
                        </Rounded>
                        <Rounded>
                            <p>+55 22 997079764</p>
                        </Rounded>
                </div>
                <div className={styles.info}>
                 
             
                </div>
            </div>
        </motion.div>
    )
}