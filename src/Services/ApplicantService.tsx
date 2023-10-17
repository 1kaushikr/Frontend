import Axios from "axios"

export class ApplicantService 
{
    private static URL:string ='https://localhost:7265'
    /*Gets al the applicanats from Backend*/
    public static GetAllApplicant()
    {
        let applicantURL:string = this.URL+'/Applicant/Get'
        let res = Axios.get(applicantURL)
        return res
    }

    /*Get applicant of particular Id*/
    public static GetApp(appId:string)
    {
      let applicantURL:string = this.URL+'/Applicant/Retrieve?id='+appId
      return Axios.get(applicantURL)
    }

    /*Post a applicant */
    public static Post(x:any)
    {
        var payLoad={
        FirstName:x.firstName,
        LastName:x.lastName,
        Dob:x.dob,
        PhoneList:x.phoneList,
        EmailList:x.emailList,
        EduList:x.eduList,
        ExpList:x.expList,
        ProList:x.proList,
        Skill:x.skill
      }
      let applicantURL:string = this.URL+'/Applicant/Post'
      return Axios.post(applicantURL, payLoad)
    }

    /*Post the query query and in return gets the applicants relevant to the query*/
    public static SendQuery(userquery:string)
    {
      var payload={
        query:userquery   
      }

      let applicantURL:string = this.URL+'/Applicant/Query'
      return Axios.post(applicantURL, payload)
    }
}
