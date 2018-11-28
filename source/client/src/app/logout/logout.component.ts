import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private sharedModle: SharedModelService,
    private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.localStorage.clearAll();
    this.sharedModle.User = undefined;
    this.router.navigate(['/login']);
  }

}
