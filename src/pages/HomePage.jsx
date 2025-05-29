import React from 'react'
import Layout from '../layout/Layout'
import HeroSection from '../components/HeroSection'
import IntroSection from '../components/IntroSection'

const HomePage = () => {
  return (
    <Layout>
        <HeroSection/>
        <IntroSection/>
    </Layout>
  )
}

export default HomePage