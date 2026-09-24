import styles from "./footer.module.css"
import { Link } from "react-router-dom"
import logo from "../../assets/icons/logo.jpg"

const Footer = () => {
  return (
    <footer>
      <section className={styles.redFooter}>

        <p>¿TENÉS HAMBRE?</p>
        <Link to="/order">PEDI AHORA</Link>

      </section>

      <section className={styles.darkFooter}>

        <div>
          <h1>BLEND BURGER</h1>
          <h2>GUERNICA</h2>
        </div>

        <div>
          <img src={logo} alt="Blend Burger Logo."/>
        </div>

      </section>
    </footer>
  )
}

export default Footer