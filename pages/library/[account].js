import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout'
import AccessDenied from '../../components/access-denied'
import axios from 'axios'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from 'next/link'
const hostname = process.env.NEXT_PUBLIC_NEXTAUTH_URL

const List2 =({list})=>{
if(list){

  if(list.success === true){
  
    return list.data.map((x, i) => (
      <TableRow key={i}>
        <TableCell style={{ fontSize: '1.1em'}}  align="center" component="th" scope="row">
          {i + 1}
        </TableCell>
        <TableCell style={{ fontSize: '1.1em'}} align="left" component="th" scope="row">
        <Link   href={`/library/edit/${x._id}`}><a style={{ textDecoration: 'none !important' }}>
          {x.title}
          </a></Link>
        </TableCell>
        
        {/* <TableCell style={{ fontSize: '1.1em'}} align="left" component="th" scope="row">
       
          {x.title}
         
        </TableCell> */}
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
    <Layout >
      <div >
        <div style={{margin: 0, float: 'right', marginTop: '1em'}}><img style={{ float: 'right'}} src="/steps2.png" alt="me" style={{width: '5em', height: '5em'}} /></div>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Reggae+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
</style>
    
     </div>
      <TableContainer component={Paper}>
      <center><h3 style={{color: 'rgb(63, 81, 181)', fontSize: '1.9em', padding: '0.1em', margin: 0, fontWeight: 700, fontFamily: 'Architects Daughter, cursive'}} >Next Library</h3></center>
      <Table  size="small" aria-label="a dense table">
        <TableHead >

    
          <TableRow >
          <StyledTableCell style={{color: 'rgb(63, 81, 181)', fontSize: '1.8em', fontWeight: 700, fontFamily: 'Architects Daughter, cursive'}} align="center">#</StyledTableCell>
            <StyledTableCell style={{color: 'rgb(63, 81, 181)', fontSize: '1.8em', fontWeight: 700, fontFamily: 'Architects Daughter, cursive'}} align="left">Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { list.data.length <=4 ?
        <TableRow key='+'>
        <TableCell style={{ fontSize: '1.1em'}}  align="center" component="th" scope="row">
          +
        </TableCell>
       
        <TableCell style={{ fontSize: '1.1em'}}  align="left" component="th" scope="row">
        <Link style={{  textDecoration: 'none'}} href={`/survey`}><a style={{ textDecoration: 'none' }}>
          <i>Create a new survey</i>
          </a></Link>
        </TableCell>
     
    
      </TableRow> : 
      
      <TableRow key='01'>
      <TableCell style={{ fontSize: '1.1em'}}  align="center" component="th" scope="row">
        
      </TableCell>
     
      <TableCell style={{ fontSize: '1.1em'}}  align="left" component="th" scope="row">
      <Link style={{  textDecoration: 'none'}} href={`/survey`}><a style={{ textDecoration: 'none' }}>
        <i>You have reached the limit of free edition</i>
        </a></Link>
      </TableCell>
   
  
    </TableRow>}
        <List2 list={list}/>
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{margin: 0}}><img src="/steps1.png" alt="me" style={{width: '7em', height: '7em'}} /></div>
    </Layout>
  )
}


Library.getInitialProps = async({query: {account}})=>{
const res = await axios.get(`https://first-step911.herokuapp.com/api/creator/${account}`)
.catch(err=>console.log(err))
    return {list: res.data}
}