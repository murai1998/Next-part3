import Layout from '../components/layout'

export default function Page ({data }) {
  const quote = data[Math.floor(Math.random() * data.length)]
  return (
    <Layout>
      <p>{quote.text}</p>
    <p>{quote.author}</p>
    </Layout>
  )
}

export const  getStaticProps = async() => {
  const res = await fetch('https://type.fit/api/quotes')
  const data = await res.json()

  return {
    props: {
      data,
    },
    revalidate: 100, 
  }
}

