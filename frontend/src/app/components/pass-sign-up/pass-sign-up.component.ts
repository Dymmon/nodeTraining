import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';
import { JSEncrypt } from 'jsencrypt'


@Component({
  selector: 'app-pass-sign-up',
  templateUrl: './pass-sign-up.component.html',
  styleUrls: ['./pass-sign-up.component.scss']
})
export class PassSignUpComponent implements OnInit {

  public signUpForm !: FormGroup;
  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private loginService: LoginService,  private url: ActivatedRoute) { }

  ngOnInit(): void {
    this.Reqs2()
    .subscribe(res=>{
      const rut = res['rut'];
      const dv = rut.slice(-1);
      const digits = rut.substring(0, rut.length - 1);
      if(!this.validate(digits, dv))this.router.navigate(['login']);
    })
    this.signUpForm = this.formBuilder.group({
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
    (pass === this.signUpForm.value["pass2"])?this.getKeyRut()
    .subscribe(res =>{
      alert("Signup Successfull");
      this.router.navigate(['login']);
    })
    :alert("Invalid credentials");
  }

  getKeyRut(){
    return this.url.queryParams.pipe(take(1),
    concatMap((result)=>{
      if(result['rut']){
        const rut = result['rut'];
        const headers = new HttpHeaders({
          'dv': rut.slice(-1),
          'rut': rut.substring(0, rut.length - 1)
        });
        return this.loginService.getPubPem(headers).pipe(take(1),
        concatMap((result) =>{
          if(result.pubPem){
            var encrypt = new JSEncrypt({default_key_size: '2048'});
            encrypt.setPublicKey(result.pubPem);
            const encryptedPass = encrypt.encrypt(this.signUpForm.value['pass1']);
            const headers = new HttpHeaders({
              'dv': result.dv,
              'rut': result.rut
            });
            return this.consecutiveReqs(encryptedPass)
          }
          return of({})
        })
        )
      }
      return of({});
    }));
  }

  Reqs2(){
    return this.url.queryParams.pipe(take(1))
  }
  consecutiveReqs(pass:any){
    return this.Reqs2().pipe(take(1),
    concatMap((res) =>{
      if(res){
        const dv = res['rut'].slice(-1);
        const digits = res['rut'].substring(0, res['rut'].length - 1);
        const headers = new HttpHeaders({'rut':digits, 'dv': dv});
        return this.loginService.postSignUp(pass, headers)
      }
      return of({})
    }), catchError(err => throwError(err)));
  }
}
