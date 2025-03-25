"use client"

import Hero from './Hero'
import Navbar from './Navbar'
import React from 'react'
import { useSession } from 'next-auth/react'

const page = () => {
  const session =  useSession()
  console.log(session)
  return (
    <>
    <Navbar />
    <Hero />
    </>
  )
}

export default page