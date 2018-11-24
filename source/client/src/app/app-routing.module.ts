import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageFishComponent } from './manage-fish/manage-fish.component';
import { NewCashVoucherComponent } from './new-cash-voucher/new-cash-voucher.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ListCashVoucherComponent } from './list-cash-voucher/list-cash-voucher.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage-customer', component: ManageCustomerComponent },
  { path: 'manage-fish', component: ManageFishComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'new-invoice/:id', component: NewInvoiceComponent },
  { path: 'new-cash-voucher', component: NewCashVoucherComponent },
  { path: 'new-cash-voucher/:id', component: NewCashVoucherComponent },
  { path: 'list-invoice', component: ListInvoiceComponent },
  { path: 'list-cash-voucher', component: ListCashVoucherComponent },
  { path: 'view-invoice/:id', component: ViewInvoiceComponent },
  { path: 'view-customer/:id', component: ViewCustomerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
