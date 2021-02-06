import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import axios from 'axios'


export default function Library () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()

  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <h1>Protected Page</h1>
      Welcome
    </Layout>
  )
}


Library.getInitialProps = async({query: {account}})=>{
  console.log('AAA', account)
const res = await axios.get(`http://localhost:3000/api/creator/${account}`)
.catch(err=>console.log(err))
console.log("DATTA", res.data)
    return 'ttt'
}