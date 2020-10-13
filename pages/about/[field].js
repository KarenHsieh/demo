
import path from 'path'
// const aboutDirectory = path.join(process.cwd(), 'about')

function PrintField({fieldValue}) {

  return (
    <div>
      <h5>印出欄位內容</h5>
      <section>
        <p>{JSON.stringify(fieldValue)}</p>
      </section>
    </div>
  )
}

export async function getStaticPaths() {
  
  const infos = await getData();
  const fields = Object.getOwnPropertyNames(infos);

  const paths = fields.map((value) => ({
    params: { field: value },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  
  const infos = await getData();
  
  return { 
    props: {
      fieldValue: infos[params.field]
    } 
  }
}

async function getData() {
  const res = await fetch('https://randomuser.me/api/');
  
  let infos = await res.json()
  infos = JSON.parse(JSON.stringify(infos)).results[0]
  return infos;
}

export default PrintField