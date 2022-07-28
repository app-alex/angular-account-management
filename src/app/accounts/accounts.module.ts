import { SharedModule } from './../shared/shared.module';
import { AccountAddComponent } from './account-add/account-add.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountsComponent } from './accounts.component';
import { AccountEditComponent } from './account-edit/account-edit.component';

const components = [
  AccountsComponent,
  AccountAddComponent,
  AccountEditComponent,
];

@NgModule({
  declarations: [...components],
  imports: [SharedModule, AccountsRoutingModule],
})
export class AccountsModule {}
