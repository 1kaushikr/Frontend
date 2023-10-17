import { ChangeEvent, useEffect, useState } from "react"
import { ApplicantService } from "../Services/ApplicantService"
import React from "react"
import '../Styles/styles.css'
import { WithContext as ReactTags } from 'react-tag-input'

export interface IUser {
    firstName:string,
    lastName:string,
    dob:string
}
interface IState
{
    loading:boolean,
    errorMsg:string
}

const Create: React.FC=()=>
{
  const [clicked,setClicked] = useState(false)
  const [state,setState] = useState<IState>({
    loading:false,
    errorMsg:""
  })
  const [user, setUser] = useState<IUser>({
      firstName:"",
      lastName:"",
      dob:""
  })

  /*Handles the changes user does to First Name, Last Name, dob*/
  const EditUser =(event: ChangeEvent<HTMLInputElement>):void=>
  {
    if(event.target.name==='firstName')
    {
      setValidationErrors({
        ...validationErrors,
        firstName:""
      })
    }
    if(event.target.name==='dob')
    {
      setValidationErrors({
        ...validationErrors,
        dob:""
      })
    }
    setUser({
        ...user,
        [event.target.name]:event.target.value,
    })
  }


  const [emails, setEmails] = useState([""])

  /* Handles the change done by user to ith email present in email list 'emails' */
  const EditEmails=(value: ChangeEvent<HTMLInputElement>,i: number):void=>
  {
    const temp = [...emails]
    temp[i] = value.target.value
    setEmails(temp)
    const updatedEmailError = [...validationErrors.emailErrors]
    if(updatedEmailError.length>i)
    {
      updatedEmailError[i]=""
      setValidationErrors({
        ...validationErrors,
        emailErrors:updatedEmailError
      })
    }
  }

  /* Add new email in the email list 'emails' */
  const AddEmail=():void=>{
    const temp = [...emails,""]
    setEmails(temp)
  }

  /* Remove the ith email from the email list 'emails' */
  const RemoveEmail=(i:number):void=>{
    emails.splice(i,1)
    const temp = [...emails]
    setEmails(temp)
    const updatedEmailError = [...validationErrors.emailErrors]
    if(updatedEmailError.length>i)
    {
      updatedEmailError.splice(i,1)
      setValidationErrors({
        ...validationErrors,
        emailErrors:updatedEmailError
      })
    }
  }


  const [phones, setPhones] = useState([""])
  
  /* Handles the change done by user to ith phone number present in phone list 'phones' */
  const EditPhones=(value: ChangeEvent<HTMLInputElement>,i: number):void=>
  {
    const temp = [...phones]
    temp[i] = value.target.value
    setPhones(temp)
    const updatedPhoneError = [...validationErrors.phoneErrors]
    if(updatedPhoneError.length>i)
    {
      updatedPhoneError[i]=""
      setValidationErrors({
        ...validationErrors,
        phoneErrors:updatedPhoneError
      })
    }
  }

  /* Add new phone number in the phone list 'phones' */
  const AddPhone=():void=>{
    const temp = [...phones,""]
    setPhones(temp)
  }

  /* Remove the ith phone number from the phones list 'phones' */
  const RemovePhone=(i:number):void=>{
    validationErrors['phoneErrors'].splice(i,1)
    phones.splice(i,1)
    const temp = [...phones]
    setPhones(temp)
    const updatedPhoneError = [...validationErrors.phoneErrors]
    if(updatedPhoneError.length>i)
    {
      updatedPhoneError.splice(i,1)
      setValidationErrors({
        ...validationErrors,
        phoneErrors:updatedPhoneError
      })
    }
  }


  const var1={Org:"",Deg:"",Major:"",StartDate:"",EndDate:""}
  const [eduList,setEdu] = useState<any[]>([var1])
  const [ongEdu,setOngEdu] = useState<boolean[]>([false])

  /* Handles the change done by user to ith Education Entity present in education entity list 'eduList' 
  In Education entity I have given Id to each field '1' to College, '2' to Degree, '3' to Major, '4' to Starting Date
  '5' to Ending Data,'6' for checkbox if a person currently pursuing the current entity. 
  Hence they can be handeled by tapping into Id*/
  const EditEdu=(value: ChangeEvent<HTMLInputElement>, i: number):void=>
  {
    const temp = [...eduList]
    const id = value.target.id
    const updatedEduError = [...validationErrors.eduErrors] 
    if (id==="1")
    {
      if(updatedEduError.length>i)
      {
        updatedEduError[i]['Org']=""
      }
      temp[i].Org=value.target.value
    }
    else if (id==="2")
    {
      if(updatedEduError.length>i)
      {
        updatedEduError[i]['Deg']=""
      }
      temp[i].Deg=value.target.value
    }
    else if (id==="3")
    {
      if(updatedEduError.length>i)
      {
        updatedEduError[i]['Major']=""
      }
      temp[i].Major=value.target.value
    }
    else if (id==="4")
    {
      if(updatedEduError.length>i)
      {
        updatedEduError[i]['StartDate']=""
      }
      temp[i].StartDate=value.target.value
    }
    else if (id==="5")
    {
      temp[i].EndDate=value.target.value
    }
    else if(id==="6")
    {
      ongEdu[i]=value.target.checked
    }
    setValidationErrors({
      ...validationErrors,
      eduErrors:updatedEduError
    })
    setEdu(temp)
  }

/* Add new Education Entity in the Education Entity list 'eduList' */  
  const AddEdu=():void=>{
    const temp = [...eduList,{Org:"",Deg:"",Major:"",StartDate:"",EndDate:""}]
    setEdu(temp)
    const temp2 = [...ongEdu,false]
    setOngEdu(temp2)
  }

/* Remove ith Education Entity from the Education Entity list 'eduList' */  
  const RemoveEdu=(i:number):void=>{
    const temp = [...eduList]
    setEdu(temp)
    const updatedEduError = [...validationErrors.eduErrors]
    if(updatedEduError.length>i)
    {
      updatedEduError.splice(i,1)
      setValidationErrors({
        ...validationErrors,
        eduErrors:updatedEduError
      })
    }
  }


  const var2={Org:"",Role:"",StartDate:"",EndDate:"",Respon:""}
  const [expList,setExp] = useState<any[]>([var2])
  const [ongExp,setOngExp] = useState<boolean[]>([false])

  /* Handles the change done by user to ith Experience Entity present in Experience entity list 'expList' 
  In Experience entity I have given Id to each field '1' to Organization, '2' to Role, '3' to Starting Date
  '4' to Ending Data, '5' to Responsibilities, '6' for checkbox if a person currently pursuing the current entity. 
  Hence they can be handeled by tapping into Id*/
  const EditExp=(value: any, i: number):void=>
  {
    const temp = [...expList]
    const id = value.target.id 
    const updatedExpError = [...validationErrors.expErrors]
    if (id==="1")
    {
      if(updatedExpError.length>i)
      {
        updatedExpError[i]['Org']=""
      }
      temp[i].Org=value.target.value
    }
    else if (id==="2")
    {
      if(updatedExpError.length>i)
      {
        updatedExpError[i]['Role']=""
      }
      temp[i].Role=value.target.value
    }
    else if (id==="3")
    {
      if(updatedExpError.length>i)
      {
        updatedExpError[i]['StartDate']=""
      }
      temp[i].StartDate=value.target.value
    }
    else if (id==="4")
    {
      temp[i].EndDate=value.target.value
    }
    else if (id==="5")
    {
      temp[i].Respon=value.target.value
    }
    else if(id==="6")
    {
      ongExp[i]=value.target.checked
    }
    setValidationErrors({
      ...validationErrors,
      expErrors:updatedExpError
    })
    setExp(temp)
  }

  /* Add new Experience Entity in the Experience Entity list 'expList' */  
  const AddExp=():void=>{
    const temp = [...expList,{Org:"",Role:"",StartDate:"",EndDate:"",Respon:""}]
    setExp(temp)
    const temp2 = [...ongExp,false]
    setOngExp(temp2)
  }

  /* Remove ith Experience Entity from the Experience Entity list 'expList' */ 
  const RemoveExp=(i:number):void=>{
    const temp = [...expList]
    setEdu(temp)
    const updatedExpError = [...validationErrors.expErrors]
    if(updatedExpError.length>i)
    {
      updatedExpError.splice(i,1)
      setValidationErrors({
        ...validationErrors,
        expErrors:updatedExpError
      })
    }
  }


  const var3={Name:"",StartDate:"",EndDate:"",Respon:""}
  const [proList,setPro] = useState<any[]>([var3])
  const [ongPro,setOngPro] = useState<boolean[]>([false])

  /* Handles the change done by user to ith Project Entity present in Project entity list 'proList'.
  In Project entity I have given Id to each field '1' to Name of Project, '2' to Starting Date, '3' to Ending Data, 
  '4' to Responsibilities, '5' for checkbox if a person currently pursuing the current entity. 
  Hence they can be handeled by tapping into Id*/
  const EditPro=(value: any, i: number):void=>
  {
    const temp = [...proList]
    const id = value.target.id 
    const updatedProError = [...validationErrors.proErrors]
    if (id==="1")
    {
      if(updatedProError.length>i)
      {
        updatedProError[i]['Name']=""
      }
      temp[i].Name=value.target.value
    }
    else if (id==="2")
    {
      if(updatedProError.length>i)
      {
        updatedProError[i]['StartDate']=""
      }
      temp[i].StartDate=value.target.value
    }
    else if (id==="3")
    {
      temp[i].EndDate=value.target.value
    }
    else if (id==="4")
    {
      temp[i].Respon=value.target.value
    }
    else if(id==="5")
    {
      ongPro[i]=value.target.checked
    }
    setValidationErrors({
      ...validationErrors,
      proErrors:updatedProError
    })
    setPro(temp)
  }

  /* Add new Project Entity in the Project Entity list 'proList' */  
  const AddPro=():void=>{
    const temp = [...proList,{Name:"",StartDate:"",EndDate:"",Respon:""}]
    setPro(temp)
    const temp2 = [...ongExp,false]
    setOngPro(temp2)
  }

  /* Remove ith Project Entity from the Project Entity list 'proList' */
  const RemovePro=(i:number):void=>{
    const temp = [...proList]
    setEdu(temp)
    const updatedProError = [...validationErrors.proErrors]
    if(updatedProError.length>i)
    {
      updatedProError.splice(i,1)
      setValidationErrors({
        ...validationErrors,
        proErrors:updatedProError
      })
    }
  }


  const keyCodes = {
    comma: 188,
    enter: 13,
  }
  const delimiters = [keyCodes.comma, keyCodes.enter]
  const [tags, setTag] = useState([{id:'1', text:"Google Search"}])

  /*Delete ith skill tag*/ 
  const deleteTag= (i:number):void => {
    setTag(tags.filter((skill, index) => index !== i))
  }

  /*Add skill tag to end of list*/ 
  const addTag = (tag:any):void => {
    setTag([...tags, tag])
  }
  const var4 = {
    firstName:"",
    dob:"",
    emailErrors: [],
    phoneErrors: [],
    eduErrors:[],
    expErrors:[],
    proErrors:[],
  }  
  const [validationErrors, setValidationErrors] = useState<{firstName:string,
    dob:string,
    emailErrors: string[],
    phoneErrors: string[],
    eduErrors: any[],
    expErrors: any[],
    proErrors: any[],
  }>(var4)

  /*Submits the form. Before submitting checks for valid values of first name, dob, 1st email and 1st phone number 
  First sets loading=True and error="" Then calls the post method of service. When post method completes set loading=True
  and convert the state clicked=True. Clicked=True means if post method gets an error an erros will be showed otherwise
  the response */

const Submit = ():void =>{
    setValidationErrors(var4)
    var shouldReturn = false
    if(user.firstName.trim()==='')
    {
      validationErrors['firstName'] = "First Name is required"
      shouldReturn = true
    }
    if(user.dob.trim()==='')
    {
      validationErrors['dob'] = "Date of Birth is required"
      shouldReturn = true
    }
    const temp3: string[]=[]
    emails.forEach((email)=>{
      if(email.trim()==='')
      {
        temp3.push("Invalid length for E-mail")
        shouldReturn = true
      }
      else
      {
        temp3.push("")
      }
    })

    const temp4: string[]=[]
    phones.forEach((phone)=>{
      if(phone.trim()==='')
      {
        temp4.push("Invalid length for Phone Number")
        shouldReturn = true
      }
      else
      {
        temp4.push("")
      }
    })
    
    const temp = [...validationErrors.expErrors,{Org:"",Role:"",StartDate:""}]
    expList.forEach((experience,index)=>{
      if(temp.length>index && (experience['Org'].trim()==='' || experience['Role'].trim()==='' || experience['StartDate'].trim()===''))
      {
        shouldReturn = true
        if(experience['Org'].trim()==='')
        {
          temp[index]['Org']="Invalid Name for Organization"
        }
        if(experience['Role'].trim()==='')
        {
          temp[index]['Role']="Write something about your designation"
        }
        if(experience['StartDate'].trim()==='')
        {
          temp[index]['StartDate']="Choose a starting date"
        }
      }
    })
    const temp1 = [...validationErrors.proErrors,{Name:"",StartDate:""}]
    proList.forEach((project,index)=>{
      if(temp1.length>index && (project['Name'].trim()==='' || project['StartDate'].trim()===''))
      {
        shouldReturn = true
        if(project['Name'].trim()==='')
        {
          temp1[index]['Name']="Mention the name of the Project"
        }
        if(project['StartDate'].trim()==='')
        {
          temp1[index]['StartDate']="Choose a starting date"
        }
      }
    })

    const temp2 = [...validationErrors.eduErrors,{Org:"",Deg:"",Major:"",StartDate:""}]
    eduList.forEach((education,index)=>{
      if(temp2.length>index && (education['Org'].trim()==='' || education['Deg'].trim()==='' || education["Major"].trim()==='' || education['StartDate'].trim()===''))
      {
        shouldReturn = true
        if(education['Org'].trim()==='')
        {
          temp2[index]["Org"]="Invalid Name for Institution"
        }
        if(education['Deg'].trim()==='')
        {
          temp2[index]['Deg']="Invalid Degree"
        }
        if(education['Major'].trim()==='')
        {
          temp2[index]['Major']="Write Correct Major"
        }
        if(education['StartDate'].trim()==='')
        {
          temp2[index]['StartDate']="Choose a starting date"
        }
      }
    })
    setValidationErrors({
      ...validationErrors,
      phoneErrors:temp4,
      emailErrors:temp3,
      eduErrors:temp2,
      expErrors:temp,
      proErrors:temp1
    })
    if(shouldReturn)
    {
      return
    }
    
    setState({loading:true,errorMsg:""})
    setClicked(true)
    var skill=[]
    for (var tag of tags)
    {
      skill.push(tag['text'])
    }
    const model ={
      firstName:user.firstName,
      lastName:user.lastName,
      dob:user.dob,
      emailList:emails,
      phoneList:phones,
      eduList:eduList,
      expList:expList,
      proList:proList,
      skill:skill
    }
    ApplicantService.Post(model).then(()=>setState({
      ...state,loading:false,errorMsg:""
    }))
    .catch(err=>setState({
      ...state, loading:false, errorMsg:err.message
    }))
  }

  if(clicked)
  {
    if(state.errorMsg)
    {
      return (
        <>
          <p>Error: {state.errorMsg}</p>
        </>
      )
    }
    else if(state.loading)
    {
      return (
        <>
          <h1>Loading....</h1>
        </>
      )
    }
    return (
      <>
        <h1>Submitted Successfully!</h1>
      </>
    )
  }
  return (
    <>    
    <div className="container"> 
      <form>
        <div style={{padding: 5}}>
          <label style={{paddingRight:35
          }}> First Name:
          </label>
          <input type="text" size={40} defaultValue={user.firstName} onChange={EditUser} name="firstName" placeholder="First Name" className={validationErrors.firstName.length>0 ? 'error' : ''} />
          {validationErrors.firstName.length>0 && <div className="error-message">{validationErrors.firstName}</div>}
        </div>
        <div style={{padding: 5}}>
          <label style={{paddingRight:35}}> Last Name:
          </label> 
          <input type="text" size={40} value={user.lastName} onChange={EditUser} name="lastName" placeholder="Last Name"/>
        </div>
        <div style={{padding: 5}}>
          <label style={{paddingRight:20}}> Date of birth: 
          </label>
          <input  type="date" value={user.dob} onChange={EditUser} name="dob" placeholder="D.O.B." className={validationErrors.dob.length>0 ? 'error' : ''}/>
          {validationErrors.dob.length>0 && <div className="error-message">{validationErrors.dob}</div>}
        </div>
      </form>
        <div style={{padding: 5}}>
        Emails:
        </div>
            {
              emails.map((item,i)=>{
                return (
                  <div key={i} style={{padding: 5}}>
                    <input value={item} size={40} type="email" onChange={e=>EditEmails(e,i)} placeholder="Your_Email@example.com" className={validationErrors.emailErrors.length>i && validationErrors.emailErrors[i].length>0 ? 'error' : ''}/>
                    {i>0?<button onClick={()=>RemoveEmail(i)}  className="btn btn-close" aria-label="Close"></button>:<></>}
                    {validationErrors.emailErrors.length>i && validationErrors.emailErrors[i].length>0 && <div className="error-message">{validationErrors.emailErrors[i]}</div>}
                  </div>
                )
              })
            }
            <div style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 5}}>
              <button onClick={AddEmail} className="btn btn-success">Add Email</button>
            </div>
        <div style={{padding: 5}}>
        Phones:
        </div>
            {
              phones.map((item,i)=>{
                  return (
                  <div key={i} style={{padding: 5}}>
                    <input value={item} size={40} onChange={e=>EditPhones(e,i)} placeholder="+91-xxxx-xxxx-xx" className={validationErrors.phoneErrors.length>i && validationErrors.phoneErrors[i].length>0 ? 'error' : ''}/>
                    {i>0?<button onClick={()=>RemovePhone(i)}  className="btn btn-close" aria-label="Close"></button>:<></>}
                    {validationErrors.phoneErrors.length>i && validationErrors.phoneErrors[i].length>0 && <div className="error-message">{validationErrors.phoneErrors[i]}</div>}
                  </div>
                  )
                })
            }
            <div style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 5}}>
              <button onClick={AddPhone} className="btn btn-success">Add Phone</button>
            </div>
        <div style={{padding: 5}}>
        Educational Details:
        </div>
            {
              eduList.map((item,i)=>{
                return (
                <div key={i} style={{paddingTop: 20}}>
                  <div style={{padding: 2}}>
                    <input id ="1" type="text"  size={40} value={item.Org} onChange={e=>EditEdu(e,i)} placeholder="Institute/University Name" className={validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Org'].length>0 ? 'error' : ''}/>
                    {i>0?<button onClick={()=>RemoveEdu(i)}  className="btn btn-close" aria-label="Close"></button>:<></>}
                    {validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Org'].length>0 && <div className="error-message">{validationErrors.eduErrors[i]['Org']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input id ="2" type="text" size={40} value={item.Deg} onChange={e=>EditEdu(e,i)} placeholder="Degree" className={validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Deg'].length>0 ? 'error' : ''}/>
                    {validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Deg'].length>0 && <div className="error-message">{validationErrors.eduErrors[i]['Deg']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input id ="3" type="text" size={40} value={item.Major} onChange={e=>EditEdu(e,i)} placeholder="Major" className={validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Major'].length>0 ? 'error' : ''}/>
                    {validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['Major'].length>0 && <div className="error-message">{validationErrors.eduErrors[i]['Major']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:30}}>
                        Start Date: 
                    </label>
                    <input id ="4" type="date"value={item.StartDate} onChange={e=>EditEdu(e,i)} placeholder="Start Date" className={validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['StartDate'].length>0 ? 'error' : ''}/>
                    {validationErrors.eduErrors.length>i && validationErrors.eduErrors[i]['StartDate'].length>0 && <div className="error-message">{validationErrors.eduErrors[i]['StartDate']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input onChange={e=>EditEdu(e,i)} type="checkbox" id="6"/>
                    <label style={{paddingLeft:10}}> Ongoing</label>
                  </div>
                  {ongEdu[i]?<></>:
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:35}}>
                        End Date: 
                    </label>
                  <input id ="5" type="date" value={item.EndDate} onChange={e=>EditEdu(e,i)}/>
                </div>
                }
                </div>
                )
              })
            }
            <div style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 5}}>
              <button onClick={AddEdu} className="btn btn-success">Add Education</button>
            </div>
        <div style={{padding: 5}}>
        Experiences:
        </div>
            {
              expList.map((item,i)=>{
                return (
                <div key={i} style={{paddingTop: 20}}>
                  <div style={{padding: 2}}>
                    <input id ="1" type="text" size={40} value={item.Org} onChange={e=>EditExp(e,i)} placeholder="Name of the Organization" className={validationErrors.expErrors.length>i && validationErrors.expErrors[i]['Org'].length>-1 ? 'error' : ''}/>
                    {i>0?<button onClick={()=>RemoveExp(i)}  className="btn btn-close" aria-label="Close"></button>:<></>}
                    {validationErrors.expErrors.length>i && validationErrors.expErrors[i]['Org'].length>0 && <div className="error-message">{validationErrors.expErrors[i]['Org']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input id ="2" type="text" size={40} value={item.Role} onChange={e=>EditExp(e,i)} placeholder="Role/Designation" className={validationErrors.expErrors.length>i && validationErrors.expErrors[i]['Role'].length>0 ? 'error' : ''}/>
                    {validationErrors.expErrors.length>i && validationErrors.expErrors[i]['Role'].length>0 && <div className="error-message">{validationErrors.expErrors[i]['Role']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:30}}>
                        Start Date: 
                    </label>
                    <input id ="3" type="date" value={item.StartDate} onChange={e=>EditExp(e,i)} className={validationErrors.expErrors.length>i && validationErrors.expErrors[i]['StartDate'].length>0 ? 'error' : ''}/>
                    {validationErrors.expErrors.length>i && validationErrors.expErrors[i]['StartDate'].length>0 && <div className="error-message">{validationErrors.expErrors[i]['StartDate']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input onChange={e=>EditExp(e,i)} type="checkbox" id="6"/>
                    <label style={{paddingLeft:10}}> Ongoing</label>
                  </div>
                  {ongExp[i]?<></>:
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:35}}>
                        End Date: 
                    </label> 
                    <input id ="4" type="date" value={item.EndDate} onChange={e=>EditExp(e,i)} />
                  </div>
                }
                  <div style={{padding: 2}}>
                    <textarea value={item.Respon} id ="5" className="form-control" onChange={e=>EditExp(e,i)}  style={{height: 125}} placeholder="Role and Responsibilities" />
                  </div>
                </div>
                )
              })
            }
                <div style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 5}}>
                  <button onClick={AddExp}className="btn btn-success" >Add Experience</button>
                </div>
        <div style={{padding: 5}}>
        Projects:
        </div>
            {
              proList.map((item,i)=>{
                return (
                  <div key={i} style={{paddingTop: 20}}>
                    <div style={{padding: 2}}>
                    <input id ="1" type="text" size={40} value={item.Name} onChange={e=>EditPro(e,i)} placeholder="Title of the project" className={validationErrors.proErrors.length>i && validationErrors.proErrors[i]['Name'].length>0 ? 'error' : ''}/>
                    {i>0?<button onClick={()=>RemovePro(i)}  className="btn btn-close" aria-label="Close"></button>:<></>}
                    {validationErrors.proErrors.length>i && validationErrors.proErrors[i]['Name'].length>0 && <div className="error-message">{validationErrors.proErrors[i]['Name']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:30}}>
                    Start Date: 
                    </label>
                    <input id ="2" type="date" value={item.StartDate} onChange={e=>EditPro(e,i)} className={validationErrors.proErrors.length>i && validationErrors.proErrors[i]['StartDate'].length>0 ? 'error' : ''} />
                    {validationErrors.proErrors.length>i && validationErrors.proErrors[i]['StartDate'].length>0 && <div className="error-message">{validationErrors.proErrors[i]['StartDate']}</div>}
                  </div>
                  <div style={{padding: 2}}>
                    <input onChange={e=>EditPro(e,i)} type="checkbox" id="5"/>
                    <label style={{paddingLeft:10}}> Ongoing</label>
                  </div>
                  {ongPro[i]?<></>:
                  <div style={{padding: 2}}>
                    <label style={{paddingRight:35}}>
                      End Date: 
                    </label>
                    <input id ="3" type="date" value={item.EndDate} onChange={e=>EditPro(e,i)} />
                  </div>
                  }
                  <div style={{padding: 2}}>
                    <textarea value={item.Respon} id ="4" className="form-control" onChange={e=>EditPro(e,i)}  style={{height: 125}} placeholder="Role and Responsibilities" />
                  </div>
                  </div>
                )
              })
            }
            <div style={{paddingTop: 5, paddingBottom: 20, paddingLeft: 5}}>
              <button onClick={AddPro} className="btn btn-success">Add Project</button>
            </div>
        Skills:
        <div>
        <div style={{paddingTop: 20}}>
        <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={deleteTag}
          handleAddition={addTag}
          inputFieldPosition="bottom"
        />
        </div>
          <div style={{paddingTop:45}}>
            <button onClick={Submit} className="btn btn-primary" >Submit</button>
          </div>
        </div>
        </div>
    </>
  )
}

export default Create