import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';

import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import {AppMessageService} from "../../../app-message.service";

@Component({
    templateUrl: 'new.component.html'
})
export class NewComponent implements OnInit {

    constructor(private httpService: UsersService, private router: Router, private route: ActivatedRoute
        ,private toasterService: AppMessageService
    ) {}

    user = {
        name:null,
        email:null,
        role:null,
        password: null,
        roles:[]
    };
    roles = {
        data:[]
    };

    country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    ngOnInit(): void {
       this.showLoading();
        let u = {role:null};
        u = JSON.parse(localStorage.getItem('user') || null);
        if(u.role !== 'gerente' && u.role !== 'admin')
        {
            this.toasterService.message('Sem permissão','Usuário sem acesso, contate o administrador','error');
            this.router.navigate(['/']);
        }
        jQuery('#infoModal').show().addClass('show');
        this.httpService.builder()
            .list({},'roles')
            .then((res)=>{
                this.roles.data = res;
                this.hideLoading();
        });
    }

    save(e)
    {
        this.showLoading();
        if(this.user.name != null && this.user.name.length > 4
            && this.user.email != null && this.user.email.length > 4
            && this.user.password != null && this.user.password.length > 4) {
            this.user.roles = this.countries;
            this.user.role = this.countries[0].name;
            console.log('user',this.user);
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(this.user, 'users')
                .then(() => {
                    this.httpService.eventEmitter.emit();
                    this.hideLoading();
                    this.toasterService.message('Sucesso', 'Usuário salvo com sucesso','success');
                    this.close();
                });
        }else{
            this.hideLoading();
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.','error');
        }

    }

    filterCountryMultiple(event) {
        let query = event.query;
        this.httpService.builder()
            .list({},'roles')
            .then((res)=>{
                this.roles.data = res;
                this.filteredCountriesMultiple = this.filterCountry(query, res);
            });
    }

    filterCountry(query, countries: any[]):any[] {
        //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
        let filtered : any[] = [];
        for(let i = 0; i < countries.length; i++) {
            let country = countries[i];
            if(country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }
        }
        return filtered;
    }


    close(){
        jQuery('#infoModal').hide();
        this.router.navigate(['/cadastro/users']);
    }

    hideLoading(){
        jQuery("#bifrostBarSpinner").hide();
    }

    showLoading(){
        jQuery("#bifrostBarSpinner").show();
    }
}
