function User({ user }) {
  return (
    <div>
      <h3>this page is testing getStaticProps</h3>
      <ul>
        <li>{ user.name.first } { user.name.last }</li>
        <li>{ user.email }</li>
        <li>{ user.cell }</li>
      </ul>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://randomuser.me/api/');
  let data = await res.json(); // 這裡的await很重要! 沒加的話一直報 cannot be serialized as JSON 錯誤
  data = JSON.parse(JSON.stringify(data)).results[0]
  
  return { props: { user: data } }
}

export default User

