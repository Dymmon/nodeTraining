import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-rut-login',
  templateUrl: './rut-login.component.html',
  styleUrls: ['./rut-login.component.scss']
})
export class RutLoginComponent implements OnInit {

  public signInForm !: FormGroup ;
  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      rut: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]]
    })
  }
  
  signIn(){
    const rut = this.signInForm.value["rut"];
    (this.signInForm.valid)? this.inDB(rut)
    .subscribe(res=>{
      (res.code === 200)?this.router.navigate(['login/password'], {queryParams:{rut: rut}}):alert("Missing data");})
    : alert("Missing data");
  }

  inDB(rut: string){
    const headers = new HttpHeaders({'dv':rut.slice(-1), 'rut': rut.substring(0, rut.length - 1)});
    return this.loginService.lInDB(headers).pipe(take(1))
  }
}
