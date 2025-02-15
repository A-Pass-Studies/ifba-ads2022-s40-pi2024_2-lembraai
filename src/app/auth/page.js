'use client';

interface c {
  email:string,
  senha: string
}

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
  
  const data:c = {
    email:"e@w.com",
    senha: "1234"
  }

  // Pass data to the page via props
  return { props: { data } }
}