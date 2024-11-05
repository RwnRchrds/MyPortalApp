import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppLayoutComponent} from './components/app-layout/app-layout.component';
import {RouterOutlet} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {ToastModule} from 'primeng/toast';
import {AvatarModule} from 'primeng/avatar';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {ButtonModule} from 'primeng/button';
import {SidebarModule} from 'primeng/sidebar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputTextModule} from 'primeng/inputtext';



@NgModule({
  declarations: [
    AppLayoutComponent
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
    PanelMenuModule,
    ButtonModule,
    SidebarModule,
    OverlayPanelModule,
    CardModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule
  ],
  exports: [
    MenuModule,
    MessageModule,
    MessagesModule,
    ToastModule,
    AvatarModule,
    MenubarModule,
    PanelMenuModule,
    ButtonModule,
    SidebarModule,
    OverlayPanelModule,
    CardModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule
  ]
})
export class SharedModule { }
