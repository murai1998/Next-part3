import Layout from '../components/layout'
import { fakeSurvey } from "../lib/lib.js";
import ReactSurvey from "react-survey";




export default function Page2 () {
 
  return (
    <Layout>
        <ReactSurvey data={fakeSurvey} />
      <p>Hello</p>
   
    </Layout>
  )
}

