import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Layout from '../../../components/layout'
import AccessDenied from '../../../components/access-denied'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link'
import Card from '@material-ui/core/Card';
const List2 =({list})=>{

if(list){
    let obj2 = {}
  console.log('This list', list.data[0].answers)
  if(list.success === true){
return list.data.map((z, innn) =>  <TableRow key={innn}>{z.answers.sort((a, b) => a.id - b.id).map((x, i) => (
        x.type === 'several'? <TableCell  align="center" component="th" scope="row">

      {Object.keys(x.answers).join(', ')}
        </TableCell> :<TableCell>{x.answers}</TableCell>
      
    ))} </TableRow>)

  
  }
  else{
    return 'false'
  }
}
else{
  return 'false2'
}
}




export default function Library ({list}) {
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

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: 'rgb(241 240 240);',
      color: theme.palette.common.black ,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <h1>Your Library</h1>
      {list.data.length > 0 ?
      <Table  size="small" aria-label="a dense table">

        <TableHead >
          <TableRow >
          {list.data[0].answers.map(r1 =>{
            return<StyledTableCell align="center">{r1.question}</StyledTableCell>
              })}
          </TableRow>
        </TableHead>
        <TableBody>
            <List2 list={list}/> 
        
        </TableBody>
       
      </Table>
         : 
         
         <Table  size="small" aria-label="a dense table">

         <TableHead >
           <TableRow >
           <StyledTableCell align="center"><h2>No answers</h2></StyledTableCell>
           </TableRow>
         </TableHead>
        
       </Table>
         }
       

     
    </Layout>
  )
}


Library.getInitialProps = async({query: {id}})=>{

const res = await axios.get(`http://localhost:3000/api/answers/${id}`)
.catch(err=>console.log(err))
console.log(res.data)
    return {list: res.data}
}