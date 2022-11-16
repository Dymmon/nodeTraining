import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      rut: ['', Validators.required],
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
    let rut = this.signUpForm.value["rut"];
    const dv = rut.slice(-1);
    rut = rut.substring(0, rut.length - 1);

    if((pass === this.signUpForm.value["pass2"]) && this.validate(rut, dv) ){
      const headers = new HttpHeaders({
        'rut': rut,
        'dv': dv
      })
      this.http.post<any>('http://localhost:25565/v1/login/signup',
      {password: pass},{headers:headers}).subscribe(res=>{
      alert("Signup Successfull");
      this.signUpForm.reset();
      this.router.navigate(['login'])
    },err=>{
      alert("Something went wrong")
      console.log(err);
    })
    }else{
      alert("Invalid credentials");
    }
  }
}
