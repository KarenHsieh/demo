import { useRouter } from 'next/router'
export default function About() {
  const router = useRouter();
  // console.log(router.query);
  return (
    <>
    <h3> This is about page</h3>

    </>
  )
}