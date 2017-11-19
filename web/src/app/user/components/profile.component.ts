import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

import * as jQuery from 'jquery';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    
    constructor(private authService: AuthService){}
    user: any = {
        name: null,
        email: null
    }

    ngOnInit () {
        this.authService.getUser()
            .then((user: any) => {
                this.user = user;
            })
    }

    save(e){
        e.preventDefault();
        if(this.user.name && this.user.email !== ''){
            this.authService.builder()
            .editProfile(this.user)
            .then((user: any) => {
                this.user = user;
            });
        }else{
            this.authService.getUser()
            .then((user: any) => {
                this.user = user;
            })
        }
    }
}