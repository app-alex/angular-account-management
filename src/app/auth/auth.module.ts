import { SharedModule } from './../shared/shared.module';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
