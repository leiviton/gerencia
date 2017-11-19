import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PasswordComponent } from './components/password.component';
import { ProfileComponent } from './components/profile.component';

import { AuthService } from './services/auth.service';
//import { LogoutComponent } from './components/logout.component';
import { } from 'user-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        PasswordComponent,
        ProfileComponent,
       // LogoutComponent
    ],
    providers: [ AuthService ]
})
export class UserModule {}