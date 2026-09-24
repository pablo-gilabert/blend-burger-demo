import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import About from "./pages/About/About"
import Contact from "./pages/Contact/Contact"
import Order from "./pages/Order/Order"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/ordernow" element={<Order/>}/>
      </Routes>
    </>
  )
}

export default App