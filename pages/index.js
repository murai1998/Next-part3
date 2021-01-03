import Layout from '../components/layout'


// export default function Page (props) {
//   const [ session, loading ] = useSession()
//   console.log('This props', session)
//   return (
    
//     <Layout>
//   { session !== undefined   ? 
//     <>
//      <p>Hi, </p>
//      <p>We are very happy you have jouned us. Welcome!</p>
//      </>
//      : ('')
//   }
//     </Layout>
    
//   )
// }



import { signIn, signOut, useSession } from 'next-auth/client'

export default function Page() {
  const [session, loading] = useSession()

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </>
      )}
      {session && (
       <Layout>
       { session !== undefined   ? 
         <>
          <p>Hi, </p>
          <p>We are very happy you have jouned us. Welcome!</p>
          </>
          : ('')
       }
         </Layout>
      )}
    </>
  )
}