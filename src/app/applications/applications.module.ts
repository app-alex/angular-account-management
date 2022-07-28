import { SharedModule } from './../shared/shared.module';
import { ApplicationEditComponent } from './application-edit/application-edit.component';
import { ApplicationAddComponent } from './application-add/application-add.component';
import { ApplicationsComponent } from './applications.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationsRoutingModule } from './applications-routing.module';

const components = [
  ApplicationsComponent,
  ApplicationAddComponent,
  ApplicationEditComponent,
];

@NgModule({
  declarations: [...components],
  imports: [SharedModule, ApplicationsRoutingModule],
})
export class ApplicationsModule {}
