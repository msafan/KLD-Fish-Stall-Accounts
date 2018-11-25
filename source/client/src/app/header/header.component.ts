import { Component, OnInit } from '@angular/core';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public sharedModel: SharedModelService) { }

  ngOnInit() {
  }

}
