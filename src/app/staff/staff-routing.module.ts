import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {UserType} from '../shared/models/user-type';
import {userTypeGuard} from '../shared/guards/user-type.guard';
import {LayoutComponent} from './components/layout/layout.component';
import {HomeComponent} from './components/home/home.component';

const staffRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    runGuardsAndResolvers: 'always',
    data: {userType: UserType.Staff},
    canActivate: [userTypeGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(staffRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StaffRoutingModule { }
