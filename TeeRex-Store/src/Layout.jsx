import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
export default function Layout({cartSize, children}) {
  return (
    <>
        <Header cartSize={cartSize} />
            {children}
        <Footer />
    </>
  )
}
