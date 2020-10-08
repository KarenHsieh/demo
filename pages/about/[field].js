
import path from 'path'
const aboutDirectory = path.join(process.cwd(), 'about')

function PrintField({content}) {
  return (
    <div>
      <h5>印出欄位內容</h5>
      {
        for (var data in content) {
          <section>
            <p>Json Content = {Json.stringify(data)}</p>
          </section>
        }
      }
    </div>
  )
}

export async function getStaticPaths() {

  const res = await fetch('https://randomuser.me/api/');
  let infos = await res.json()
  infos = JSON.parse(JSON.stringify(infos)).results[0]


  const paths = infos.forEach((info) => `/about/${info.field}`)

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(aboutDirectory, params.field)
  const res = await fetch(fullPath);
  const content = await res.json();
  
  return { props: { content } }
}

export default PrintField