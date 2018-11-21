import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageFishComponent } from './manage-fish/manage-fish.component';
import { NewCashVoucherComponent } from './new-cash-voucher/new-cash-voucher.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage-customer', component: ManageCustomerComponent },
  { path: 'manage-fish', component: ManageFishComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'new-cash-voucher', component: NewCashVoucherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
