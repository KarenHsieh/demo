import Head from 'next/head'
import styles from './layout.module.scss'

export default function Layout({ children, home }) {
  return (
    <>
      <div>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Learn how to build a personal website using Next.js"
          />
{/*           <meta
            property="og:image"
            content={}
          /> 
          <meta name="og:title" content={} />
          */}
        </Head>
      </div>
    </>
  )
}