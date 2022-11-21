import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-rut-sign-up',
  templateUrl: './rut-sign-up.component.html',
  styleUrls: ['./rut-sign-up.component.scss']
})
export class RutSignUpComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      rut: ['',[Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
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
    const rut = this.signUpForm.value["rut"];
    const dv = rut.slice(-1);
    const digits = rut.substring(0, rut.length - 1);

    (this.validate(digits, dv) && this.signUpForm.valid)?
    this.inDB(rut).subscribe(res=>{
      (res.code === 200)?this.router.navigate(['signup/password'], {queryParams:{rut: rut}}): alert("Invalid data")
    }): alert("Invalid data");
  }
  inDB(rut: string){
    const headers = new HttpHeaders({'dv':rut.slice(-1), 'rut': rut.substring(0, rut.length - 1)});
    return this.loginService.sUpInDB(headers).pipe(take(1))
  }

}
