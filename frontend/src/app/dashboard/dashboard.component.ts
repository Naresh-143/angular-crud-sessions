import { Component, OnInit } from '@angular/core';
import { ApiService} from '../api.service';
import { Student } from '../student';
import { Errors } from '../errors';
import {Router, ActivatedRoute, UrlSegment, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  headdingText: string = "Create";
  showModal: boolean = false;
  students:  Student[];
  student: any;
  searchText: any;
  selectedStudent:  Student  = { sid :  null , first_name:null , last_name:  null, email: null, password: null, avathar: null};
  imagePath : any;
  imgURL: any;
  public message: string;
  public deletemessage: string;
  showPassword: boolean = true;
  errors: Errors = { first_name:null , last_name:  null, email: null, password: null, avathar: null };
  mySubscription: any;
  success:boolean = false;

  totalStudents: number;
  page: number = 1;
  isLoadMore: boolean = true;

  constructor(private apiService : ApiService, private router: Router, private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
      }
    });
  }

  ngOnInit() {
    this.commonInitialData();
  }

  commonInitialData(){
    this.apiService.readStudents(this.page).subscribe((students: Student[])=>{
      this.students = students['students'];
      this.totalStudents = students['totalCount'];
      this.isLoadMore = (this.students && (this.students.length !== this.totalStudents));
    })
  }

  loadMore(student){
    this.page++;
    let ParentLevelThis = this;
    this.apiService.readStudents(this.page).subscribe((students: Student[])=>{
      students['students'].map(function(Object, i){
        ParentLevelThis.students.push(Object);
      });
      this.isLoadMore = (this.students && (this.students.length !== this.totalStudents));
    })
  }

  createOrUpdateStudent(form){

      var errorFlag = false;
      if(!this.selectedStudent.first_name){
        this.errors.first_name = "Enter First Name";
        errorFlag = true;
      }else{
        this.errors.first_name = null;
      }
      if(!this.selectedStudent.last_name){
        this.errors.last_name = "Enter Last Name";
        errorFlag = true;
      }else{
        this.errors.last_name = null;
      }
      if(!this.selectedStudent.email){
        this.errors.email = "Enter Email";
        errorFlag = true;
      }else{
        this.errors.email = null;
      }
      if(!this.selectedStudent.password && this.headdingText ==="Create"){
        this.errors.password = "Enter Password";
        errorFlag = true;
      }else{
        this.errors.password = null;
      }

      if(!this.imgURL){
        this.errors.avathar = "Upload Avathar";
        errorFlag = true;
      }else{
        this.errors.avathar = null;
      }

      if(!errorFlag){
          if(this.selectedStudent && this.selectedStudent.sid){
              var formData: any = new FormData();
              formData.append('sid', this.selectedStudent.sid);
              formData.append('first_name', this.selectedStudent.first_name);
              formData.append('last_name', this.selectedStudent.last_name);
              formData.append('email', this.selectedStudent.email);
              if(this.imagePath && this.imagePath[0]){
                formData.append('avathar', this.imagePath[0]);
              }
              this.apiService.updateStudent(formData).subscribe((student: Student)=>{
                  this.success = true;
                  this.message = "Student Details Updated Successfully";
                  this.errors = { first_name:null , last_name:  null, email: null, password: null, avathar: null };
                  setTimeout(()=>{
                    this.success = true;
                    this.message = "";
                    this.common_reload(); }, 1000);
              });
          }
          else{
              var formData: any = new FormData();
              formData.append('first_name', this.selectedStudent.first_name);
              formData.append('last_name', this.selectedStudent.last_name);
              formData.append('email', this.selectedStudent.email);
              formData.append('password', this.selectedStudent.password);
              formData.append('avathar', this.imagePath[0]);
              this.apiService.createStudent(formData).subscribe((student: Student)=>{
                  this.selectedStudent = { sid :  null , first_name:null , last_name:  null, email: null, password: null, avathar: null};
                  this.errors = { first_name:null , last_name:  null, email: null, password: null, avathar: null };
                  this.imgURL = null;
                  this.success = true;
                  this.message = "Student Details Saved Successfully";
                  setTimeout(()=>{
                    this.success = true;
                    this.message = "";
                    this.common_reload(); }, 1000);
              });
          }
      }
  }

  selectStudent(student: Student){
      this.headdingText = "Update";
      this.selectedStudent = student;
      this.errors = { first_name:null , last_name:  null, email: null, password: null, avathar: null };
      this.imgURL = this.selectedStudent.avathar;
      this.showPassword = false;
      this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

  addNew(){
    this.selectedStudent = { sid :  null , first_name:null , last_name:  null, email: null, password: null, avathar: null};
    this.errors = { first_name:null , last_name:  null, email: null, password: null, avathar: null };
    this.showPassword = true;
    this.headdingText = "Create";
    this.imgURL = null;
    this.showModal = true;
  }

  deleteStudent(id){
      this.apiService.deleteStudent(id).subscribe((student: Student)=>{
        this.success = true;
        this.deletemessage = "Student Details Deleted Successfully";
        setTimeout(()=>{
          this.success = true;
          this.deletemessage = "";
          this.common_reload(); }, 1000);
      });
  }

  common_reload(){
      this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/dashboard']);
      });
  }

  preview(files) {

      if (files.length === 0)
        return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;

      reader.readAsDataURL(files[0]);
      reader.onload = (_event) => {
        this.imgURL = reader.result;
      }

      this.selectedStudent.avathar = this.imgURL;
  }

}
