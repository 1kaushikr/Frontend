export interface Skill
{
  skill:string
}
export interface Education
{
  org:string,
  deg:string,
  major:string,
  startDate:string,
  endDate:string
}
export interface Experience
{
  org:string,
  role:string,
  startDate:string,
  endDate:string,
  respon:string
}
export interface Project
{
  name:string,
  startDate:string,
  endDate:string,
  respon:string
}
export interface Applicant {
    _id:string,
    firstName:string,
    lastName:string,
    dob:string,
    emailList:string[],
    phoneList:string[],
    eduList:Education[],
    expList:Experience[],
    proList:Project[],
    skill:string[]
  }

