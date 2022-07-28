import { RoleGuard } from './../auth/guards/role.guard';
import { AuthGuard } from './../auth/guards/auth.guard';
import { ApplicationsComponent } from './applications.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ApplicationsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationsRoutingModule {}
