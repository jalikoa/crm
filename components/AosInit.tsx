"use client"

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'

export default function AosInit() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
      offset: 120,
      delay: 0,
    })
  }, [])

  return null
}
