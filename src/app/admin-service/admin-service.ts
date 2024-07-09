import { Injectable } from '@angular/core';
import {  HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
  
@Injectable({
    providedIn: 'root',
  })
export class AdminService {
 
  token = localStorage.getItem('jwtToken');

/*   apiUrl = 'http://192.168.1.221:9090/JSIS'; */
  /* PATH_OF_API = 'http://192.168.1.107:8080/JSIS'; */
/*   apiUrl='http://localhost:9090/JSIS' */
  apiUrl = 'http://localhost:8085';

  constructor(private http: HttpClient) {}
requestOptions:any;
 

  ngOnInit() {
  
  
  }
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  requestHeaders = new HttpHeaders({ 'No-Auth': 'True','Content-Type':'application/json','Accept':'*/*'
 });

changePassword(username:string, passwordData:any):Observable<any> {
  return this.http.put(this.apiUrl + '/changePassword/'+username, passwordData);
}
resetPassword(username:string, passwordData:any):Observable<any> {
  return this.http.put(this.apiUrl + '/resetPassword/'+username, passwordData);
}
//Department Controller
getOffices(): Observable<any> {
  return this.http.get(this.apiUrl+'/offices');
}
getOfficeById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/office/${id}`);
}
getOfficeByParentId(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/getOfficeByParentId/${id}`);
}
createOffice(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/office',data);
}
updateOffice(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateOffice/${id}`,data);
}
deleteOffice(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/office/"+id);
}

//Department Controller
getSubOffices(): Observable<any> {
  return this.http.get(this.apiUrl+'/subOffices');
}
getSubOfficeById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/subOffice/${id}`);
}
createSubOffice(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/subOffice',data);
}
updateSubOffice(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateSubOffice/${id}`,data);
}
deleteSubOffice(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/subOffice/"+id);
}

//Kebele Controller
getKebeles(): Observable<any> {
  return this.http.get(this.apiUrl+'/kebeles', {
    headers: this.requestHeader,
  });
}
getKebeleById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/kebele/${id}`);
}
createKebele(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/kebele',data);
}
updateKebele(data:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/kebele`,data);
}
deleteKebele(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/kebele/"+id);
}


//Goth Controller
getGoths(): Observable<any> {
  return this.http.get(this.apiUrl+'/goths');
}
getGothById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/goth/${id}`);
}
createGoth(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/goth',data);
}
getGotByKebeleName(kebele:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getGotByKebeleName/${kebele}`, {
    headers: this.requestHeader,
  });
}
updateGoth(data:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/goth`,data);
}
deleteGoth(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/goth/"+id);
}

//JobSeeker Controller
getJobSeekers(): Observable<any> {
  return this.http.get(this.apiUrl+'/jobSeekers');
}

filterJobSeekerData(column,value,employeeStatus): Observable<any> {
  return this.http.get(`${this.apiUrl}/filterData/${column}/${value}/${employeeStatus}`);
}

filterJobSeekerDataByRange(column,fromValue,toValue,employeeStatus): Observable<any> {
  return this.http.get(`${this.apiUrl}/filterDataByRange/${column}/${fromValue}/${toValue}/${employeeStatus}`);
}

getJobSeekersByEmploymentStatus(status:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getJobSeekersByEmploymentStatus/${status}`);
}
getJobSeekerById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/jobSeeker/${id}`);
}
createJobSeeker(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/saveJobSeeker',data, {
    headers: this.requestHeader,
  });
}
updateJobSeeker(data:any,id:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateJobSeeker/${id}`,data);
}
updateJobSeekerTrainer(data:any,id:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateJobSeekerTrainer/${id}`,data);
}
updateJobSeekerHired(data:any,id:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateJobSeekerHired/${id}`,data);
}

deleteJobSeeker(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/deleteJobSeeker/"+id);
}
 
getUsers(): Observable<any> {
  return this.http.get(this.apiUrl+'/users');
}
getUsersByRole(role:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/usersByRole/${role}`);
}

getZonalUsersByRole(role:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/zonalUsersByRole/${role}`);
}
getUserById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/user/${id}`);
}
getUserByUsername(username):Observable<any>{
  return this.http.get(`${this.apiUrl}/getUserByUsername/${username}`);
}
createUser(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/saveUser',data);
}
updateUser(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateUser/${id}`,data);
}
deleteUser(id:number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/deleteUser/${id}`);
}


//Notification controller
getNotificationByUserName(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getNotificationByUserName`);
}

getSomeNotification(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getSomeNotification`);
}

submitNotification(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/saveNotification',data);
}

setToSeen(id): Observable<any> {
  return this.http.get(`${this.apiUrl}/setToSeen/${id}`);
}

setAllToSeen(): Observable<any> {
  return this.http.get(`${this.apiUrl}/setAllToSeen`);
}

deleteNotification(id): Observable<any> {
  return this.http.delete(`${this.apiUrl}/deleteNotification/${id}`);
}

//report controller
getReports(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/reports/${id}`);
}
getReportsByUsername(username:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/reportsByUsername/${username}`);
}
getReportSiraHidet(role:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getReportSiraHidet/${role}`);
}
getSentToZoneReports(office:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getSentToZoneReports/${office}`);
}
getReportsByOffice(office:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/reportsByOffice/${office}`);
}
reportsByStatus(status:string,userName:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/reportsByStatusAndUserName/${status}/${userName}`);
}
getReportById(id:any): Observable<any> {
  return this.http.get(`${this.apiUrl}/getReportById/${id}`);
}

createReport(data:FormData): Observable<any> {
  return this.http.post(this.apiUrl+'/saveReport',data);
}
updateReport(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateReport/${id}`,data);
}
updateReportStatus(remark,status:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateStatus/${status}/${id}`,remark);
}

updateAcceptanceStatus(remark,status:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateAcceptanceStatus/${status}/${id}`,remark);
}

deleteReport(id:number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/deleteReport/${id}`);
}
// industry controller

createOtherIndustry(data:FormData): Observable<any> {
  return this.http.post(this.apiUrl+'/saveOtherIndustry',data);
}
getIndustries(): Observable<any> {
  return this.http.get(`${this.apiUrl}/otherIndustries`);
}
getActiveIndustries(): Observable<any> {
  return this.http.get(`${this.apiUrl}/getActiveIndustries`, {
    headers: this.requestHeader,
  });
}
updateIndustryStatus(status:number,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateIndustryStatus/${status}/${id}`,"");
}
updateOtherIndustry(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateOtherIndustry/${id}`,data);
}

getIndustryById(id:any): Observable<any> {
  return this.http.get(`${this.apiUrl}/getOtherIndustryById/${id}`, {
    headers: this.requestHeader,
  });
}

// announcement controller

createAnnouncement(data:FormData): Observable<any> {
  return this.http.post(this.apiUrl+'/saveAnnouncement',data);
}
announcements(): Observable<any> {
  return this.http.get(`${this.apiUrl}/announcements`);
}
getActiveAnnouncements(): Observable<any> {
  return this.http.get(`${this.apiUrl}/activeAnnouncements`, {
    headers: this.requestHeader,
  });
}
updateAnnouncement(data:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateAnnouncement/${id}`,data);
}
updateAnnouncementStatus(status:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateAnnouncementStatus/${status}/${id}`,'');
}
getAnnouncementById(id:number): Observable<any> {
  return this.http.get<any>(`${this.apiUrl}/announcement/${id}`);
}
deleteAnnouncement(id:number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/announcement/${id}`);
}
//ContactUs Controller
getContactUss(): Observable<any> {
  return this.http.get(this.apiUrl+'/contactUss');
}
getContactUssByEmploymentStatus(status:string): Observable<any> {
  return this.http.get(`${this.apiUrl}/getContactUssByEmploymentStatus/${status}`);
}
getContactUsById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/contactUs/${id}`);
}
createContactUs(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/saveContactUs',data, {
    headers: this.requestHeader,
  });
}
getFaqss(): Observable<any> {
  return this.http.get(this.apiUrl+'/contactUss');
}
deleteContactUs(id:number): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/deleteContactUs/${id}`);
}

//home controller
getHomeInfo(): Observable<any> {
  return this.http.get(this.apiUrl+'/homeInfo', {
    headers: this.requestHeader,
  });
}

//Settings Controller
getSettings(): Observable<any> {
  return this.http.get(this.apiUrl+'/settings', {
    headers: this.requestHeader,
  });
}
updateReg(status:any,id:number): Observable<any> {
  return this.http.put(`${this.apiUrl}/updateReg/${id}`,status);
}
//Faqs Controller

getFaqsById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/Faqs/${id}`);
}

//Document Controller
getDocuments(): Observable<any> {
  return this.http.get(this.apiUrl+'/documents');
}
getDocumentById(id:number): Observable<any> {
  return this.http.get(`${this.apiUrl}/document/${id}`);
}
createDocument(data:any): Observable<any> {
  return this.http.post(this.apiUrl+'/document',data);
}
updateDocument(data:any): Observable<any> {
  return this.http.put(`${this.apiUrl}/document`,data);
}
deleteDocument(id:number): Observable<any> {
  return this.http.delete(this.apiUrl+"/document/"+id);
}

}