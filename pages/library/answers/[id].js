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
import {useRouter} from 'next/router'
import Link from 'next/link'
import Card from '@material-ui/core/Card';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from '@material-ui/core/IconButton';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
const hostname = process.env.NEXT_PUBLIC_NEXTAUTH_URL


export default function Library ({list}) {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const router = useRouter()
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 10,
  });



  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch('/api/examples/protected')
      const json = await res.json()
      if (json.content) { setContent(json.content) }
     console.log('list.data', list.data)
  
   
   
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


  const handleClick01 = async()=>{
    let r_id = router.query.id
    router.push(`/library/edit/${r_id }`);
     
  }
  const handleClick02 = async()=>{
    let r_id = router.query.id
    router.push(`/library/export/${r_id }`);
     
  }

  const table_data =(list)=>{

    if(list){
        let obj2 = {}
      console.log('This list', list.data)
    
      if(list.success === true ){
        let new_obj = {columns: [], rows: []};
        list.data.map((z, innn) =>  z.answers.sort((a, b) => a.id - b.id).map((x, i) => {
         if(i === 0) new_obj.rows.push({id: z._id})
          x.type === 'several'? 
          new_obj.rows[innn][x.question] = Object.keys(x.answers).join(', ')
         : new_obj.rows[innn][x.question] = x.answers
        
        }))
    if(list.data.length > 0){
      list.data[0].answers.map((r1, i) =>{
    if(i === 0){
      new_obj.columns.push({field: "id", headerName: 'Id', hide: true })
      new_obj.columns.push({hide: false})
      new_obj.columns[i+1].field = r1.question
      new_obj.columns[i+1].headerName = r1.question
      new_obj.columns[i+1].width  = 250
    }
    else{
      new_obj.columns.push({hide: false})
      new_obj.columns[i+1].field = r1.question
      new_obj.columns[i+1].headerName = r1.question
      new_obj.columns[i+1].width  = 250
    }
      })}
      console.log('HERE@', new_obj)
    return new_obj
      
      }
      else{
        return 'false'
      }
    }
    else{
      return 'false2'
    }
    }
    let values = table_data(list)
    console.log('DATA', values)
  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  return (
    <Layout>
      <div style={{float: 'right !important', textAlign: 'right !important', display: 'flex', alignItems: 'flexEnd', width: '100%'}}>
  <Tooltip  align='right' title="Go back">
            <IconButton onClick={handleClick01}>
              <KeyboardBackspaceIcon  style={{background: 'rgb(0 0 0 / 4%)', padding: '0.1em', borderRadius: '50%'}}/>
            </IconButton>
          </Tooltip>
  <Tooltip align='right' title="Export">
            <IconButton onClick={handleClick02}>
              <SaveAltIcon  style={{background: 'rgb(0 0 0 / 4%)', padding: '0.1em', borderRadius: '50%'}}/>
            </IconButton>
          </Tooltip>
        
</div> 
      {list.data.length > 0 ?
    
    <div style={{ height: 400, width: '100%' }}>
    <DataGrid
      {... table_data(list)}
      components={{
        Toolbar: GridToolbar,
      }}
    />
  </div>
   
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

// table_data(list)
Library.getInitialProps = async({query: {id}})=>{

  // ${process.env.NEXTAUTH_URL}
const res = await axios.get(`${hostname}/api/answers/${id}`)
.catch(err=>console.log(err))
console.log(res.data)
    return {list: res.data}
}