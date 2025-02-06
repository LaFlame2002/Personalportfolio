'use client'
import React from 'react'
import styles from './style.module.scss';
import Rounded from '../../common/RoundedButton';
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const contactFormSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  message: z.string().min(1).max(500),
})

export default function Contact() {
  const { handleSubmit, register } = useForm({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = (data) => {
    console.log(data)
  }

  return (
    <div className={styles.aboutcontainer}>
      <div className={styles.body}>
        <h1 className={styles.sobre}>Contact me</h1>
        <p className={styles.texto}>
          Please contact me directly at__  
          <a className={styles.underline} href='mailto:goodguilhermedutra2002@gmail.com'>
            goodguilhermedutra2002@gmail.com
          </a> 
          __or through this form.
        </p>
        <form 
          className={styles.box}
          onSubmit={handleSubmit(onSubmit)}
        >
          <input className={styles.name} placeholder="  Name"
            {...register('name')}
          /> 
          <input className={styles.email} type='email' placeholder="  Your email"
            {...register('email')}
          />  
          <textarea className={styles.textbox} placeholder="Your message"
            {...register('message')}
          />
          <Rounded>
            <button type="submit" className={styles.submit}>Submit</button>
          </Rounded>
        </form>
      </div>
    </div>
  );
}
