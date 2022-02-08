import React, { useState } from 'react'
import ResponsiveAppBar from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Main from '@/components/main/Main'
import IsLogged from '../context'

function App() {
  const [isLogged, setLogged] = useState(false)
  return (
    <IsLogged.Provider value={{ isLogged, setLogged }}>
      <>
        <ResponsiveAppBar />
        <Main />
        <Footer />
      </>
    </IsLogged.Provider>
  )
}

export default App
