import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../environments/environment';

import { Router } from '@angular/router';

import {ToasterService} from 'angular2-toaster';

import * as jQuery from 'jquery';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppHttpService{
    protected url: string;
    protected header: Headers;
    protected token = null;

    request() {
        return this.http;
    }

    constructor (protected http: Http, private router: Router, private toaster: ToasterService) {
        this.setAccessToken();
    }

    setAccessToken () {
        this.token = this.getToken();
        this.header = new Headers({'Authorization': 'Bearer ' + this.token, 'Accept': 'application/json'});
    }

    builder(resource: string){
        this.url = environment.server_url + '/api/v1/admin/' + resource;
        return this;
    }

    list(options: any = {},u: string) {
        let url = this.url;
        if(options.filters !== undefined)
        {
            url = url + u +'?';
            let filters = options.filters;
            let where = [];
            filters.forEach((item, index) => {
                let field = Object.keys(item)[0];
                let value = item[field];
                where.push({field:value});
                url = url + 'where[' + field + ']=' + value +'&';
            });
            let observable = this.http.get(url, {headers: this.header});
            return this.toPromise(observable);
        }else {
            let observable = this.http.get(url + u,{headers: this.header});
            return this.toPromise(observable);
        }
    }

    search(search: string)
    {
        let observable = this.http.get(this.url + '?value='+search, {headers: this.header});
            return this.toPromise(observable);
    }

    view(id: number, url: string) {
        let observable = this.http.get(this.url + url + '/' + id, {headers: this.header});
            return this.toPromise(observable);
    }

    valid(id: number, data: object)
    {
        let observable = this.http.put(this.url + '/' + id, data, {headers: this.header});
        return this.toPromise(observable);
    }
    update(id: number, data: object)
    {
        let observable = this.http.put(this.url + '/' + id, data, {headers: this.header});
        return this.toPromise(observable);
    }

    insert (data: object, u)
    {
        let observable = this.http.post(this.url + u, data, {headers: this.header});
        return this.toPromise(observable);
    }

    delete(id: number)
    {
        let observable = this.http.delete(this.url + '/' + id, {headers: this.header});
        return this.toPromise(observable);
    }

    protected toPromise(request)
    {
        return request.toPromise()
            .then((res) => {
                return res.json() || {}
            })
            .catch((err) =>{
                jQuery(".container-loading").hide();
            console.log('erro',err);
                let message = 'Algo deu errado, informe o erro' + err.status + 'ao administrador';
                if(err.status === 401)
                {
                    message = 'Você não tem permissão para acessar isso, informe um usuario e senha validos';
                    this.toaster.pop('error', 'Erro', message);
                    localStorage.removeItem('user');
                    this.router.navigate(['/user/login']);
                }
                if (err.status === 500)
                {
                    message = 'Ops não foi possivel realizar opeção';
                    this.toaster.pop('error', 'Erro', message);
                    this.router.navigate(['/pages/500']);
                }
                if (err.status === 422)
                {
                    message = 'Erro de validação, verifique os campos';
                    this.toaster.pop('error', 'Erro', message);
                }
                if (err.status === 404)
                {
                    message = 'Verifique sua conexão ou tente novamente';
                    this.toaster.pop('error', 'Erro', message);
                    this.router.navigate(['/pages/404']);
                }
        });
    }

    private getCookie(name: string) {
        let cookies = document.cookie;
        if (!cookies) {
            return null;
        }

        let cookiesCollection: string[] = cookies.split(';');
        for(let i= 0; i < cookiesCollection.length; i++) {
            let cookieCurrent = cookiesCollection[i].split('=');

            if (cookieCurrent[0].trim() === name) {
                return cookieCurrent[1] || null;
            }
        }

        return null;
    }

    private getToken()
    {
        return localStorage.getItem('token');
    }

}