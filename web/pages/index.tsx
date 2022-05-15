import type { NextPage } from 'next'
import styles from "../styles/Home.module.scss"


const Home: NextPage = () => {
  return (
    <div className={styles.top}>
      <h1 className={styles.heading} >Hello World</h1>
    </div>
  )
}

export default Home
