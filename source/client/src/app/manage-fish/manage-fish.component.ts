import { Component, OnInit, ViewChild } from '@angular/core';
import { GridComponent } from '../grid/grid.component';
import { GridOptions, GridColumn, TextFilter, NumberFilter, Fish } from '../models/models.module';
import { WebapiService } from '../webapi.service';
import { NotifierService } from 'angular-notifier';
import { BaseComponentModule } from '../base-component/base-component.module';
import { Router } from '@angular/router';
import { SharedModelService } from '../shared-model.service';

@Component({
  selector: 'app-manage-fish',
  templateUrl: './manage-fish.component.html',
  styleUrls: ['./manage-fish.component.css']
})
export class ManageFishComponent extends BaseComponentModule {
  @ViewChild(GridComponent) _grid: GridComponent;

  _fish: Fish = { ID: -1, Name: '' };
  _selectedFish: Fish = undefined;
  _canByPass: boolean = true;
  _gridOptions: GridOptions = {
    Columns: [
      new GridColumn('Name', 'Fish Name', 'string', true, new TextFilter('', 'eq'))
    ],
    Filterable: true,
    IsPaginated: true,
    PageSize: 20
  };

  constructor(private webApiService: WebapiService, private notifier: NotifierService, router: Router, sharedModel: SharedModelService) {
    super(router, sharedModel);
  }

  ngOnInit() {
    super.ngOnInit();
    this.getAllFishes();
  }

  getAllFishes() {
    this.webApiService.Get<Array<Fish>>('Fish/GetAllFishes', (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else if (response) {
        this._grid.clear();
        this._grid.addRows(response);
      }
    });
  }

  clear() {
    this._fish = { ID: -1, Name: '' };
    this._selectedFish = undefined;
    this._grid.clearSelection();
    this._canByPass = true;
  }

  save() {
    this._canByPass = false;
    if (!this.isFormValid())
      return;

    if (this._fish.ID != -1) {
      this.webApiService.Post<Fish>('Fish/EditFish', this._fish, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllFishes();
          this.clear();
          this.notifier.notify('success', 'Updated successfully');
        }
      });
    } else {
      this.webApiService.Post<Fish>('Fish/AddFish', this._fish, (response, error) => {
        if (error) {
          this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
        } else if (response) {
          this.getAllFishes();
          this.clear();
          this.notifier.notify('success', response.Name + ' added successfully');
        }
      });
    }
  }

  isFormValid() {
    if (!this.isFishNameValid())
      return false;
    return true;
  }

  isFishNameValid() {
    if (this._canByPass)
      return true;

    return this._fish.Name;
  }

  selectedFishChanged(fish: Fish) {
    this._selectedFish = fish;
  }

  editFish() {
    this._fish = { ID: this._selectedFish.ID, Name: this._selectedFish.Name };
  }

  deleteFish() {
    this.webApiService.Get<any>('Fish/DeleteFish/?id=' + this._selectedFish.ID, (response, error) => {
      if (error) {
        this.notifier.notify('error', error.error.ExceptionMessage ? error.error.ExceptionMessage : error.message);
      } else {
        this.getAllFishes();
        this.clear();
        this.notifier.notify('success', 'Fish deleted successfully');
      }
    });
  }
}
