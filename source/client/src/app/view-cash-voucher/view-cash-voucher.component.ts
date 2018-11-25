import { Component, OnInit } from '@angular/core';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-view-cash-voucher',
  templateUrl: './view-cash-voucher.component.html',
  styleUrls: ['./view-cash-voucher.component.css']
})
export class ViewCashVoucherComponent extends BaseComponentModule {

  constructor(router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
  }

}
