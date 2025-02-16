
export default function Page({ data }) {

  return (
    <div>
      <p>e-mail: {data} </p>
      <p>senha: {JSON.parse(data)} </p>
    </div>
  )
}

// This gets called on every request
export async function getData() {
  
  

  // Pass data to the page via props
  return { props: { data } }
}