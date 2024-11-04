import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BaseLayoutComponent} from './components/base-layout/base-layout.component';
import {RouterOutlet} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';



@NgModule({
  declarations: [
    BaseLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    MenuModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    MenubarModule,
    PanelMenuModule
  ],
  exports: [
    MenuModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    MenubarModule,
    PanelMenuModule
  ]
})
export class SharedModule { }
