import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private router: Router,) {
    this.store.select('rut').subscribe(res=>{
      if(res != 'Authorized') this.router.navigate(['login']);
    })
  }

  ngOnInit(): void {
    }
  }
