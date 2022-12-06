import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState, selectUserAuthorized } from 'src/app/components/redux/app.reducers';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    }
  }
