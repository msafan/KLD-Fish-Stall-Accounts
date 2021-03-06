import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ManageCustomerComponent } from './manage-customer/manage-customer.component';
import { ManageFishComponent } from './manage-fish/manage-fish.component';
import { NewInvoiceComponent } from './new-invoice/new-invoice.component';
import { ListInvoiceComponent } from './list-invoice/list-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { LogoutComponent } from './logout/logout.component';
import { CashVoucherComponent } from './cash-voucher/cash-voucher.component';
import { ViewCashVoucherComponent } from './view-cash-voucher/view-cash-voucher.component';
import { SettingsComponent } from './settings/settings.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { NewPurchaseInvoiceComponent } from './new-purchase-invoice/new-purchase-invoice.component';
import { PaymentVoucherComponent } from './payment-voucher/payment-voucher.component';
import { ListPurchaseInvoiceComponent } from './list-purchase-invoice/list-purchase-invoice.component';
import { ViewPaymentVoucherComponent } from './view-payment-voucher/view-payment-voucher.component';
import { ViewSupplierComponent } from './view-supplier/view-supplier.component';
import { ViewPurchaseInvoiceComponent } from './view-purchase-invoice/view-purchase-invoice.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manage-customer', component: ManageCustomerComponent },
  { path: 'manage-fish', component: ManageFishComponent },
  { path: 'manage-user', component: ManageUserComponent },
  { path: 'manage-supplier', component: ManageSupplierComponent },
  { path: 'new-invoice', component: NewInvoiceComponent },
  { path: 'new-invoice/:id', component: NewInvoiceComponent },
  { path: 'new-purchase-invoice', component: NewPurchaseInvoiceComponent },
  { path: 'new-purchase-invoice/:id', component: NewPurchaseInvoiceComponent },
  { path: 'cash-voucher', component: CashVoucherComponent },
  { path: 'payment-voucher', component: PaymentVoucherComponent },
  { path: 'list-invoice', component: ListInvoiceComponent },
  { path: 'list-purchase-invoice', component: ListPurchaseInvoiceComponent },
  { path: 'view-invoice/:id', component: ViewInvoiceComponent },
  { path: 'view-customer/:id', component: ViewCustomerComponent },
  { path: 'view-cash-voucher/:id', component: ViewCashVoucherComponent },
  { path: 'view-purchase-invoice/:id', component: ViewPurchaseInvoiceComponent },
  { path: 'view-supplier/:id', component: ViewSupplierComponent },
  { path: 'view-payment-voucher/:id', component: ViewPaymentVoucherComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
