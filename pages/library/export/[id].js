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

const List2 =({list})=>{
if(list){

  if(list.success === true){
    return list.data.map((x, i) => (
      <TableRow key={i}>
        <TableCell  align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell  align="center" component="th" scope="row">
        <Link href={`/library/edit/${x._id}`}><a>
          {x.title}
          </a></Link>
        </TableCell>
        
    
      </TableRow>
      
    ))
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
  const [listIt, setListIt] = useState(list.data)

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
  console.log('LLL', list)
  return (
    <Layout>
      <h1>Your Library</h1>
      <TableContainer component={Paper}>
      <Table  size="small" aria-label="a dense table">
        <TableHead >
          <TableRow >
          <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell align="center">Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { list.data.length <=4 ?
        <TableRow key='0'>
        <TableCell  align="center" component="th" scope="row">
          0
        </TableCell>
       
        <TableCell  align="center" component="th" scope="row">
        <Link href={`/survey`}><a>
          Create a new survey
          </a></Link>
        </TableCell>
     
    
      </TableRow> : ('')}
        <List2 list={listIt}/>
        </TableBody>
      </Table>
    </TableContainer>
    </Layout>
  )
}


Library.getInitialProps = async({query: {id}})=>{

    const res = await axios.get(`http://localhost:3000/api/changer/${id}`)
    .catch(err=>console.log(err))
        return {list: res.data}
      // return ''
    }