import React, { useState } from 'react'
import ResponsiveAppBar from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import Main from '@/components/main/Main'
import IsLogged, { FormStatus } from '@/components/context'
import { DT_DISABLED } from '@/components/const';

function App() {
  const [isLogged, setLogged] = useState(false)
  const [dialogType, setDialogType] = useState(DT_DISABLED

  return (
    <IsLogged.Provider value={{ isLogged, setLogged }}>
      <FormStatus.Provider value={{ dialogType, setDialogType }}>
        <>
          <ResponsiveAppBar />
          <Main />
          <Footer />
        </>
      </FormStatus.Provider>
    </IsLogged.Provider>
  )
}

export default App
