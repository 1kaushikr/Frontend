import { useState } from "react"
import { ApplicantService } from "../Services/ApplicantService"
import { Applicant } from "../Models/Applicant";
import { Link } from "react-router-dom";
interface IState
{
    loading:boolean,
    applicant:Applicant[],
    errorMsg:string
}
const Query: React.FC=(props)=>
{
    const [query,setQuery] = useState("")
    const [clicked, setClicked] = useState(false)
    const [state,setState] = useState<IState>({
        loading:false,
        applicant:[],
        errorMsg:''
      })

    /*Handles the change in the query user does*/ 
    const EditQuery =(event:React.ChangeEvent<HTMLTextAreaElement>):void=>{
        setQuery(event.target.value)
      }
    
    /*Submits the form*/
    const Submit = ():void =>{
        setClicked(true)
        setState({loading:true,errorMsg:"",applicant:[]})
        ApplicantService.SendQuery(query).then(res=>setState({
            ...state,loading:false,applicant:res.data
          }))
          .catch(err=>setState({
            ...state, loading:false, errorMsg:err.message
          }))
        setQuery("")
    }
    if (clicked)
    {
        return(
            <>  
                <div className="container">
                <h1>Applicants</h1>
                {state.errorMsg && (<p>Error: {state.errorMsg}</p>)}
                {state.loading && (<h1>Loading....</h1>)}
                {state.errorMsg.length===0 && state.loading===false && state.applicant.length===0 && (<h1>No Applicants Found!</h1>)}
                <table>
                    <tbody>
                    {
                        state.applicant.length>0 && state.applicant.map(user=>(
                        <tr>
                            <td>
                            <Link to={'user/'+user._id} className="text-decoration-none">{user.firstName} {user.lastName}</Link>
                            </td>
                        </tr>
                        ))
                    }
                    </tbody>
                </table>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="container">
            <div className="p-3 m-0 border-0 bd-example m-0 border-0">
            <div className="form-floating">
                <textarea className="form-control" onChange={EditQuery}  style={{height: 150}} />
                <label htmlFor="floatingTextarea2">Query...</label>
                <button className="btn btn-primary" onClick={Submit}>Fetch</button>
            </div>
            </div>
            </div>
        </>
    )
}
export default Query;