import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageFishComponent } from './manage-fish/manage-fish.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { NewCashVoucherComponent } from './new-cash-voucher/new-cash-voucher.component';
import { GridComponent } from './grid/grid.component';
import { FooterComponent } from './footer/footer.component';
import { AutoCompleteTextBoxComponent } from './auto-complete-text-box/auto-complete-text-box.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { HttpClientModule } from '@angular/common/http';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ListCashVoucherComponent } from './list-cash-voucher/list-cash-voucher.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
		horizontal: {
			position: 'right',
			distance: 12
		},
		vertical: {
			position: 'top',
			distance: 12,
			gap: 10
		}
	},
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavMenuComponent,
    LoginComponent,
    HomeComponent,
    ManageCustomerComponent,
    ManageFishComponent,
    NewInvoiceComponent,
    NewCashVoucherComponent,
    GridComponent,
    FooterComponent,
    AutoCompleteTextBoxComponent,
    ListInvoiceComponent,
    ListCashVoucherComponent,
    ViewCustomerComponent,
    ViewInvoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    LocalStorageModule.withConfig({
      prefix: 'KLDFishStallAccounts',
      storageType: 'localStorage'
    }),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
