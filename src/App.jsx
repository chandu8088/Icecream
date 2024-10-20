import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header/Header'
import IceCream from './IceCream/IceCream'
import IceCreamDetails from './IceCreamDetails/IceCreamDetails'
import Users from './Users/Users'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header></Header>
    {/* <IceCream></IceCream> */}
    {/* <IceCreamDetails></IceCreamDetails> */}
    <Users></Users>
    </>
  )
}

export default App
