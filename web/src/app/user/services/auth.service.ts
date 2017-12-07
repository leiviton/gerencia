import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { AppHttpService } from '../../app-http.service';
import { environment } from '../../../environments/environment';


import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter();

    builder (resource: string = '') {
       return super.builder('auth/' + resource);
    }

    getUser() {
       return this.builder()
                    .list({},'user');
    }

    changePassword(data) {
        let observable = this.http.post(this.url + '/change-password', data, {headers: this.header});
        return observable.toPromise()
                    .then((res) => {
                        return res.json() || {};
                    });
    }

    editProfile(data) {
        let observable = this.http.post(this.url + '/edit-profile', data, {headers: this.header});
        return observable.toPromise()
                    .then((res) => {
                        return res.json() || {};
                    });
    }

    login(data) {
       let observable = this.http.post(environment.server_url + '/oauth/token',data);
       return this.toPromise(observable);
    }

    logout() {
        let observable = this.http.get(this.url + 'logout');
        return this.toPromise(observable);
    }
}