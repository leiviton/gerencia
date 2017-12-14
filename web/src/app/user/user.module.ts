import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordComponent } from './components/password.component';
import { ProfileComponent } from './components/profile.component';

import { LoginComponent } from "./components/login.component"

import { UserRoutingModule } from "./user-routing.module"
import { AuthService } from './services/auth.service';
import { LogoutComponent } from './components/logout.component';

import { LoadingModule } from 'ngx-loading';

@NgModule({
    imports: [
        UserRoutingModule,
        CommonModule,
        FormsModule,
        LoadingModule
    ],
    declarations: [
        PasswordComponent,
        ProfileComponent,
        LogoutComponent,
        LoginComponent
    ],
    providers: [ AuthService ]
})
export class UserModule {}