import Layout from '../components/layout'
import {  useSession } from 'next-auth/client'

export default function Page (props) {
  const [ session, loading ] = useSession()
  console.log('This props', session)
  return (
    
    <Layout>
  { session !== undefined   ? 
    <>
     <p>Hi, </p>
     <p>We are very happy you have jouned us. Welcome!</p>
     </>
     : ('')
  }
    </Layout>
    
  )
}