import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from "./login/login.component";
import {BASE_PATH} from "./shared/variables";
import {environment} from "../environments/environment";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import {ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonDirective} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {MessageService} from 'primeng/api';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        CheckboxModule,
        ButtonDirective,
        Ripple,
        InputTextModule
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: BASE_PATH, useValue: environment.apiUrl},
        provideHttpClient(withInterceptorsFromDi()),
      MessageService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
