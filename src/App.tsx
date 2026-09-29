import { Route, Routes } from "react-router-dom"

import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import Order from "./pages/Order/Order"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/ordernow" element={<Order/>}/>
      </Routes>
    </>
  )
}

export default App