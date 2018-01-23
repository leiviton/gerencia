import { Component, OnInit } from "@angular/core";
import { AuthService} from "../services/auth.service";
import { Router} from "@angular/router";


import * as jQuery from 'jquery';

@Component({
    selector: 'logout-dashboard',
    template: ''
})

export class LogoutComponent implements OnInit {


    constructor(private router: Router, private authService: AuthService){}

    ngOnInit(){
        this.showLoading();
        this.authService.builder()
            .logout()
            .then(() => {
                localStorage.removeItem('token');
                localStorage.setItem('user','');
                this.hideLoading();
                this.router.navigate(['/user/login']);
            })
    }

    hideLoading(){
        jQuery(".container-loading").hide();
    }
    showLoading(){
        jQuery(".container-loading").show();
    }
}