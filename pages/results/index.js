import { useRouter } from 'next/router'

export default function Test(number) {
  const router = useRouter()
  console.log(router);
  return (
    <>
      <h3>This is index</h3>
    </>
  )
}

export async function getStaticProps(context) {
  console.dir(context);
  return {
    props: {}, // will be passed to the page component as props
  }
}