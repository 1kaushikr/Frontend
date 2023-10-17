import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { Applicant } from '../Models/Applicant'
import { ApplicantService } from '../Services/ApplicantService'

interface IParams{
    id:string
}
interface IState{
  loading:boolean,
  applicant:Applicant,
  errorMsg:string
}
const About: React.FC=()=>
{
  const {id}=useParams<IParams|any>()
  const [state,setState]=useState<IState>({
    loading:true,
    applicant:{} as Applicant,
    errorMsg:""
  })
  useEffect(()=>{
    if(id)
    {
      ApplicantService.GetApp(id)
      .then(res=>setState({
        ...state,loading:false,applicant:res.data
      }))
      .catch(err=>setState({
        ...state,loading:false,errorMsg:err.message
      }))
    }
  },[id,state])
  const {loading, applicant,errorMsg}=state
  const {firstName,lastName,dob,emailList,phoneList,eduList,expList,proList,skill}=applicant
  return (
    <>
      <div className="container">
        { loading? <h1>Loading.....</h1>: errorMsg? <h1>{errorMsg}</h1>:
          <div>
              <div>
                  <h2 style={{paddingTop: 25}}>Personal Details: </h2>
              </div>
              <div>
                First Name: {firstName}
              </div>
              {
              lastName.length===0? <></>:  
              <div>
                Last Name: {lastName}
              </div>
              } 
              <div>
                DOB: {dob}
              </div>
              {
                phoneList?.length===0?<></>:
                <div>
                  <h2 style={{paddingTop: 25}}>Phone Numbers: </h2>
                </div>
              }
              {
                phoneList.map(ele=>(
                ele.length===0?<></>:
                <div key={ele}>
                  {ele}
                </div>
              ))
              }
              {
                emailList?.length===0?<></>:
                <div>
                    <h2 style={{paddingTop: 25}}>Emails: </h2>
                </div>
              }
              {
                  emailList.map(ele=>(
                    ele.length===0?<></>:
                    <div key={ele}>
                      {ele}
                    </div>
                ))
              } 
              
              {
                eduList[0].org.length===0?<></>:
                <div style={{paddingTop: 25}}>
                  <h2>Educations:</h2>
                </div>
              }

              { eduList?.length>0 && eduList.map(ele=>{
                return (
                  <div key={ele.org}>
                  {
                    ele.org.length===0?<></>:
                    <div>    
                    Institution: {ele.org}
                    </div>
                  }
                  {
                    ele.deg.length===0?<></>:
                    <div>    
                    Degree: {ele.deg}
                    </div>
                  }
                  {
                    ele.major.length===0?<></>:
                    <div>    
                    Major: {ele.major}
                    </div>
                  }
                  {
                    ele.startDate.length===0?<></>:
                    <div>    
                    Start Date: {ele.startDate}
                    </div>
                  }
                  {
                    ele.endDate.length===0?<></>:
                    <div  style={{paddingBottom: 15}}>
                      End Date: {ele.endDate}
                    </div>
                  }
                 </div>
                )
                })} 

              {
                expList[0].org.length===0?<></>:
                <div style={{paddingTop: 25}}>
                  <h2>Experiences:</h2>
                </div>
              }
              { expList?.length>0 && expList.map(ele=>{
                return (
                  <div key={ele.org}>
                  {
                    ele.org.length===0?<></>:
                    <div>    
                    Institution: {ele.org}
                    </div>
                  }
                  {
                    ele.role.length===0?<></>:
                    <div>    
                    Role: {ele.role}
                    </div>
                  }
                  {
                    ele.respon.length===0?<></>:
                    <div>    
                    Responsibilities: {ele.respon}
                    </div>
                  }
                  {
                    ele.startDate.length===0?<></>:
                    <div>    
                    Start Date: {ele.startDate}
                    </div>
                  }
                  {
                    ele.endDate.length===0?<></>:
                    <div  style={{paddingBottom: 15}}>
                      End Date: {ele.endDate}
                    </div>
                  }
                 </div>
                )
                })} 
               {
                proList[0].name.length===0?<></>:
                <div style={{paddingTop: 25}}>
                  <h2>Projects:</h2>
                </div>
              }
              { proList?.length>0 && proList.map(ele=>{
                return (
                  <div key={ele.name}>
                  {
                  ele.name.length===0?<></>:
                    <div>    
                    Title: {ele.name}
                    </div>
                  }
                  {
                    ele.respon.length===0?<></>:
                    <div>    
                    Responsibilities: {ele.respon}
                    </div>
                  }
                  {
                    ele.startDate.length===0?<></>:
                    <div>    
                    Start Date: {ele.startDate}
                    </div>
                  }
                  {
                    ele.endDate.length===0?<></>:
                    <div  style={{paddingBottom: 15}}>
                      End Date: {ele.endDate}
                    </div>
                  }
                 </div>
                )
                })} 
              {
                skill.length===0?<></>:
                  <>
                <div style={{paddingTop: 25}}>
                  <h2>Skills:</h2>
                </div>
                <div>
                  {
                  skill.map(ele=>(
                    <>
                      {ele+" "}
                    </>
                  ))
                  }
                </div>
                </>
              }
          </div>
        }
      </div>
    </>
  )
}
export default About;