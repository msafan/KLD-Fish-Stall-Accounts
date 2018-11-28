import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  public valueOf(obj, columnName) {

    if (!obj)
      return "";

    if (columnName.toString().indexOf('.') == -1)
      return obj[columnName];

    var indexOf = columnName.indexOf('.');
    var key = columnName.substring(0, indexOf);
    var remaniningSubString = columnName.substring(indexOf + 1);

    return this.valueOf(obj[key], remaniningSubString);
  }
}
