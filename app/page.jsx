import React from 'react'
import HeroSection from './components/home/HeroSection'
import ServicesSection from './components/home/ServicesSection'
import CustomerReviewsSection from './components/home/CustomerReviewsSection'

export default function page() {
  return (
    <div>
      <HeroSection/>
      <ServicesSection/>
      <CustomerReviewsSection/>
    </div>
  )
}
