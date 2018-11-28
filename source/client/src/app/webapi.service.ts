import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedModelService } from './shared-model.service';

@Injectable({
  providedIn: 'root'
})
export class WebapiService {

  constructor(private httpClient: HttpClient, private sharedModel: SharedModelService) {
  }

  Post<T>(url: string, postItem: any, callBack: (response: T, error: any) => void) {
    this.httpClient.post(this.sharedModel.BaseURI + 'api/' + url, postItem).subscribe(
      result => { callBack(result as T, null); },
      error => { callBack(null, error); }
    );
  }

  Get<T>(url: string, callBack: (response: T, error: any) => void) {
    this.httpClient.get(this.sharedModel.BaseURI + 'api/' + url).subscribe(
      result => { callBack(result as T, null); },
      error => { callBack(null, error); }
    );
  }
}
