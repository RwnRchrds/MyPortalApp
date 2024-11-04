import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './components/home/home.component';
import {LayoutComponent} from './components/layout/layout.component';
import {SharedModule} from '../shared/shared.module';
import {StaffRoutingModule} from './staff-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    SharedModule
  ]
})
export class StaffModule { }
