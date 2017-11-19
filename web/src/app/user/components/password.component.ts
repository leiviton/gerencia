import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html'
})
export class PasswordComponent{

    constructor(private authService: AuthService){}
   
    user: any = {
        password: null,
        password_confirmation:null
    }

    save(e){
        e.preventDefault();

        if(this.user.password && this.user.password !== '' && this.user.password === this.user.password_confirmation){
            this.authService.builder().changePassword(this.user)
            .then(() => {
            });
        }else{
        }
    }
}