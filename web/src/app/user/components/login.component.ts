import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


import * as jQuery from 'jquery';
@Component({
    templateUrl: './logar.component.html',
})
export class LoginComponent {
    user: any = {
        username: null,
        password: null,
    };

    constructor(private AuthService: AuthService, private router: Router) {

    }

    login(e) {
        e.preventDefault();

        this.showLoading();
        if (!this.user.username || !this.user.password) {
            return;
        }

        let data = {
            grant_type: 'password',
            client_id: environment.client_id,
            client_secret: environment.client_secret,
            username: this.user.username,
            password: this.user.password,
            scope: ''
        };

        this.AuthService.login(data).then((res) => {
            document.cookie = "token=" + res.access_token + "; expires=" + res.expires_in;
            localStorage.setItem('token',res.access_token);
            this.AuthService.setAccessToken();
            this.AuthService.getUser()
                .then((res) => {
                    localStorage.setItem('user',JSON.stringify(res));
                    this.hideLoading();
                    this.router.navigate(['/dashboard']);
            });
        }).catch(() => {
            this.hideLoading();
        })
    }
    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}