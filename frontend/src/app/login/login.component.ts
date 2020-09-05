import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  
import { ILogin } from '../login';  
import { ApiService} from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';  

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string;  
  submitted: boolean = false;
  constructor(   
    private formBuilder : FormBuilder,  
    private router : Router,  
    private apiService : ApiService ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({  
      username: ['', Validators.required],  
      password: ['', Validators.required]  
    });  
    this.returnUrl = '/dashboard';  
    
    if(sessionStorage.getItem('token')){
      this.router.navigate([this.returnUrl]);
    }else{
      this.apiService.logout();
    }
  }

  login() {  
      this.submitted = true;
      // stop here if form is invalid  
      if (this.loginForm.invalid) {  
        return;  
      } else {  
          if (this.loginForm.controls.username.value && this.loginForm.controls.password.value) {  
            console.log("Login successful");  
            var formData: any = new FormData();
              formData.append('username', this.loginForm.controls.username.value);
              formData.append('password', this.loginForm.controls.password.value);
              this.apiService.loginStudent(formData).subscribe((login: ILogin)=>{
                  if(login['status']){
                      sessionStorage.setItem('token', login['id']);  
                      this.router.navigate([this.returnUrl]);  
                  }else{
                    this.message = login['message'];  
                  }
              });
           
          } else {  
            this.message = "Please check your userid and password";  
          }  
      }  
  }  
   
 }  