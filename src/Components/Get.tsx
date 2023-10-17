import { Applicant } from "../Models/Applicant";
import React,{useState,useEffect} from "react";
import { ApplicantService } from "../Services/ApplicantService";
import { Link } from "react-router-dom";
interface IState
{
    loading:boolean,
    applicant:Applicant[],
    errorMsg:string
}
const  Get: React.FC=()=>
{
  const [state,setState] = useState<IState>({
    loading:false,
    applicant:[],
    errorMsg:''
  })

  useEffect(()=>{
    setState({loading:true,errorMsg:"",applicant:[]})
    ApplicantService.GetAllApplicant().then(res=>setState({
      ...state,loading:false,applicant:res.data
    }))
    .catch(err=>setState({
      ...state, loading:false, errorMsg:err.message
    }))
  },[])
  return (
    <>
    <div className="container">
    <h1>Applicants</h1>
    {state.loading && (<h1>Loading...</h1>)}
    {state.errorMsg && (<p>Error: {state.errorMsg}</p>)}
    {state.errorMsg.length===0 && state.loading===false && state.applicant.length===0 && (<h1>No Applicants Found!</h1>)}
    <table>
      <tbody>
        {
          state.applicant.map(user=>(
            <tr key={user._id}>
              <td>
              <Link to={'user/'+user._id} >{user.firstName} {user.lastName}</Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
    </div>
    </>
  );
}

export default Get;