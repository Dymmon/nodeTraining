import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  public token !: string;

  constructor(private http: HttpClient, private router: Router, private url: ActivatedRoute) { }

  ngOnInit(): void {
    this.url.queryParams.subscribe(params=>{
      if(!params['token'])this.router.navigate(['login']);
      this.token = params['token'];
    })
    const headers = new HttpHeaders({'authorization': this.token})
    console.log(this.http.get<any>('http://localhost:25565/v1/login/done',
    {headers: headers}).subscribe((response) => {
  },
  (error: HttpErrorResponse) => {
    this.router.navigate(['login']);
  }))
    
    }
  }
