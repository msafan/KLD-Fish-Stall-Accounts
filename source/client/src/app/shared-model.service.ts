import { Injectable } from '@angular/core';
import { AuthenticatedUser } from './models/models.module';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable({
  providedIn: 'root'
})
export class SharedModelService {
  public User: AuthenticatedUser;
  public BaseURI: string;

  constructor(localStorage: LocalStorageService) {
    this.BaseURI = 'http://localhost:53259/';
    this.User = JSON.parse(localStorage.get('userCredentails'));
  }
}
