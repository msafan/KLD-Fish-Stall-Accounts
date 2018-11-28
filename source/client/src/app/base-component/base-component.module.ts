import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BaseComponentModule implements OnInit {
  constructor(protected router: Router, protected sharedModel: SharedModelService) { }

  public ngOnInit(): void {
    if (!this.sharedModel.User)
      this.router.navigate(['/logout'])
  }
}
