import { Injectable, EventEmitter } from '@angular/core';
import { AppHttpService } from '../../app-http.service';

@Injectable()
export class CaixasService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter;
    key = 'cart';
    cartAux = JSON.parse(localStorage.getItem(this.key) || null);
    builder(resource: string = '') {
        return super.builder(resource);
    }
}
