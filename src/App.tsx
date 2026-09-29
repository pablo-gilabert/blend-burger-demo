import { useLayoutEffect } from "react"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"

import Footer from "./components/Footer/Footer"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Menu from "./pages/Menu/Menu"
import NotFound from "./pages/NotFound/NotFound"
import Order from "./pages/Order/Order"

import styles from "./app.module.css"

const ScrollToTop = () => {
	const location = useLocation()

	useLayoutEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" })
	}, [location.key])

	return null
}

const App = () => {
	return (
		<div className={styles.app}>
			<ScrollToTop />
			<Navbar />

			<main className={styles.content} id="main-content">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/menu" element={<Menu />} />
					<Route path="/order" element={<Order />} />
					<Route path="/ordernow" element={<Navigate to="/order" replace />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>

			<Footer />
		</div>
	)
}

export default App
