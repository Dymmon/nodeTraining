import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { catchError, concatMap, of, take, throwError } from 'rxjs';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  public token !: string;

  constructor(private router: Router, private url: ActivatedRoute, private loginService: LoginService) { }

  ngOnInit(): void {
    this.consecutiveReqs().subscribe((response) => {
    },(error: HttpErrorResponse) => {
      this.router.navigate(['login']);})
    }

    consecutiveReqs(){
      return this.url.queryParams.pipe(take(1),
        concatMap((result) =>{
          if(result){
            const header = new HttpHeaders({'authorization': result['token']});
            return this.loginService.getDone(header); 
          }
          return of({});
        }),
        catchError(err => throwError(err))
      );
    }
  }
