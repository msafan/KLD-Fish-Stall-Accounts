import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponentModule {

  constructor(router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
