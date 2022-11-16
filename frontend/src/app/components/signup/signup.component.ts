import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      rut: ['', Validators.required, Validators.minLength(7), Validators.maxLength(10)],
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
    })
  }
  validate = (rut: String, dv: String) =>{
    let suma = 0, num = 2;
    try {
      while(rut){
          const temp = rut.slice(-1);
          rut = rut.substring(0, rut.length - 1);
          if(num > 7){
              num = 2;
          }
          suma += parseInt(temp) * num;
          num++;
      }
      let sumString = (11 - suma%11).toString();
      if(sumString == "10"){
        sumString = "k"
      }
      if(sumString == dv){
          return 1;
      }
      return 0; 
  } catch (error) {
      return 0;
  }
   
};

  signUp(){
    const pass = this.signUpForm.value["pass1"];
    const rut = this.signUpForm.value["rut"];
    const dv = rut.slice(-1);
    const digits = rut.substring(0, rut.length - 1);

    if(this.validate(digits, dv) && (pass === this.signUpForm.value["pass2"])){
      const headers = new HttpHeaders({
        'rut': digits,
        'dv': dv
      })
      this.loginService.postSingUp(pass,headers)
      .subscribe(res=>{
      alert("Signup Successfull");
      this.signUpForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
    })
    }else{
      alert("Invalid credentials");
    }
  }
}
