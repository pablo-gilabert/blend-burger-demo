import styles from "./home.module.css"
import Navbar from "../../components/Navbar/Navbar"
import bbq from "../../assets/images/hamb-bbq.png"
import stacker from "../../assets/images/mila-stacker.png"
import armado from "../../assets/images/hamb-armado.png"

const Home = () => {
  return (
    <div>
      <Navbar/>

      <main>
        <section>

          <p>VENÍS POR LA BURGER.</p>
          <p>TE QUEDÁS POR EL PLAN.</p>

          <div className={styles.baseline}></div>

          <p>Smash burgers, milanesas, patio, cumples, eventos y karaoke.</p>

          <img src={bbq} alt="Hamburguesa con queso cheddar y salsa barbacoa."/>

        </section>

        <section>

          <div className={styles.featured}>
            <h1>BLEND - BURGER - GUERNICA</h1>
          </div>

          <h2>COMBO DESTACADO</h2>
          <img className={styles.featuredImg} src={stacker} alt="Milanesa de ternera con salsa stacker, pepino, bacon y papas fritas"/>

          <div className={styles.baseline}></div>
          
          <h2>Difícil mirar, más difícil resistirse.</h2>
          <img className={styles.featuredImg} src={armado} alt="Armado en producción de hamburguesas"/>

        </section>
      </main>
    </div>
  )
}

export default Home