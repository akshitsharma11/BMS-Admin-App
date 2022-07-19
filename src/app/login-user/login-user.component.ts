import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog'; 
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {
   
  email = '';
  password = '';
  showPassword = false;
  
  emailToken = '';
  emailReset = '';
  userToken = '';
  
  forgotPwd = false;

  constructor(private authService:AuthService,private router:Router,private toast:ToastrService,public matDialog:MatDialog,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
  }
   
  onSubmit(form:NgForm)
  {
    this.spinner.show();
    form.value.email = form.value.email.trim();
    form.value.password = form.value.password.trim();

    this.authService.loginUser(form.value).subscribe(res=>{
      if(res["status"])
      {
        console.log(form.value);
        this.toast.success("Welcome Back!!",res["message"],{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
        localStorage.setItem('authUserData',JSON.stringify(res["admin"]));

        localStorage.setItem('adminAuthToken',res["token"]);
        this.authService.loggedIn.next(true);
        localStorage.setItem('userType',"admin");
        this.router.navigate(['/admin/dashboard']);
      }
      else
      {
        this.toast.error(res["message"],"Error",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      }
      this.spinner.hide();
    })    
     
  }

  passwordVisibility()
  {
    this.showPassword = !this.showPassword;
  }

  passwordForgotVisibility()
  {
    this.showPassword = !this.showPassword;
  }

  toggleForgotPassword()
  {
    this.forgotPwd = !this.forgotPwd;
  }

  openModalForgotPwd()
  {
    if(this.email==null|| this.email=='')
    {
      this.toast.error("Enter Email!!","Error",{
        timeOut:2500,
        progressBar:true,
        progressAnimation:'increasing',
        positionClass:'toast-top-right'
      })
    }
    else
    {
      this.authService.sendToken({email:this.email}).subscribe(res=>{
          if(res["status"])
          {
            const dialogConfig = new MatDialogConfig();
            //if the user clicks outside the modal, it doesn’t close
            dialogConfig.disableClose = true;
            dialogConfig.id = 'forgotPwd-component';
            dialogConfig.height = "550px";
            dialogConfig.width = "750px";
            //passing data
           
            dialogConfig.data = {email:this.email}
            
            // const modalDialog = this.matDialog.open(ForgotPasswordComponent,dialogConfig);
         
          }
      },err=>{
        this.toast.error(err,"Error Occured",{
          timeOut:2500,
          progressBar:true,
          progressAnimation:'increasing',
          positionClass:'toast-top-right'
        })
      })     
    }   
  }

  sendEmail(form:NgForm)
  {
    console.log(form.value);
    form.value.email = form.value.email.trim();
    if(form.value.email.length==0 || form.value.email.length==1)
    {
      this.toast.error("Enter Valid Email");
    }
    else{
      this.authService.sendToken({email:form.value.email}).subscribe(res=>{
        console.log(res);
        if(res["status"]){
          this.toast.success(res["message"]);
        }else{
          this.toast.error(res["message"]);
        }
      })
    }
  
  }

  resetPwd(form:NgForm)
  {
    form.value.emailReset = form.value.emailReset.trim();
    form.value.userToken = form.value.userToken.trim();
    form.value.newPassword = form.value.newPassword.trim();

    if(form.value.emailReset.length==0 || form.value.emailReset.length==1 || 
      form.value.userToken.length==0 || form.value.userToken.length==1 ||
      form.value.newPassword.length==0 || form.value.newPassword.length==1)
    {
      this.toast.error("Enter Valid Details");
    }
    else{
      this.authService.adminForgotPwd({email:form.value.emailReset,newPassword:form.value.newPassword,token:form.value.userToken}).subscribe(res=>{
        console.log(res);
        if(res["status"]){
          this.toast.success(res["message"]);
          this.forgotPwd = false;
        }else{
          this.toast.error(res["message"]);
        }
      })
    }

  }

}
