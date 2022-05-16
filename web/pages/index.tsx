import type { NextPage } from 'next'
import LoginBox from '../components/LoginBox'
import styles from "../styles/Home.module.scss"


const Home: NextPage = () => {
  return (
    <div className={styles.home}>
        <LoginBox />
    </div>
  )
}

export default Home
