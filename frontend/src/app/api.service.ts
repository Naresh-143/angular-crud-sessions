import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from './student';
import { ILogin } from './login';   
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = "http://api.angularphp.com";
  constructor(private httpClient: HttpClient) { }

  logout() :void {    
    sessionStorage.removeItem('token');    
  }  

  isLoggedIn() {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  readStudents(page:number): Observable<Student[]>{
    return this.httpClient.get<Student[]>(`${this.PHP_API_SERVER}/view.php?page=${page}`);
  }

  createStudent(student: Student): Observable<Student>{
    return this.httpClient.post<Student>(`${this.PHP_API_SERVER}/insert.php`, student);
  }

  updateStudent(student: Student){
    return this.httpClient.post<Student>(`${this.PHP_API_SERVER}/update.php`, student);   
  }

  deleteStudent(id: number){
    return this.httpClient.delete<Student>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }

  loginStudent(login:ILogin){
    return this.httpClient.post<ILogin>(`${this.PHP_API_SERVER}/login.php`, login);
  }
  
}
