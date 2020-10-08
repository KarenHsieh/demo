import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import ClickToResultPage from '../components/common'

export default function Home() {
  const handleClick = () => {
    console.log('handleClick');
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h3 className={styles.title}>
          this is home page
        </h3>

        <h3>
          <Link href="/results" as="/results/abc">
            <a className={styles.link}>Go Result Page</a>
          </Link>
        </h3>

        <h5>
          Click <Link href={{ pathname: '/about', query: { type: 'store' }}}><a className={styles.link}>here</a></Link> to get more
        </h5>

        <Link href="/results" passHref>
          <ClickToResultPage onClick={ handleClick } />
        </Link>
        
        

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
