import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
export default function Layout({cartSize, triggerSearch, children}) {
  return (
    <>
        <Header cartSize={cartSize} triggerSearch={triggerSearch}/>
            {children}
        <Footer />
    </>
  )
}
