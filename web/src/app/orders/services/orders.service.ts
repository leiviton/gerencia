import { Injectable, EventEmitter } from '@angular/core';
import { AppHttpService } from '../../app-http.service';

@Injectable()
export class OrdersService extends AppHttpService {
    eventEmitter: EventEmitter<any> = new EventEmitter;
    key = 'cart';
    cartAux = JSON.parse(localStorage.getItem(this.key) || null);
    builder(resource: string = '') {
        return super.builder(resource);
    }

    clear()
    {
       this.initCart();
    }

    get()
    {
        return JSON.parse(localStorage.getItem(this.key) || null);
    }

    getItem(i)
    {
        return this.get().items[i];
    }

    addItem(item,qtd)
    {
        var cart = this.get(),itemAux,exists = false;
        item.qtd = qtd;
        item.complements = [];
        for (var index in cart.items){
            itemAux = cart.items[index];
            if (itemAux.id == item.id){
                itemAux.qtd = itemAux.qtd + item.qtd;
                itemAux.subtotal = this.calculateSubtotal(itemAux);
                exists = true;
                break;
            }
        }
        item.product_id = item.id;
        if(exists === false){
            item.subtotal = this.calculateSubtotal(item);
            cart.items.push(item);
        }
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }

    addComplement(complement,i){
        let cart = this.get(),itemAux = cart.items[i];
        let valor = 0;
        let h = '';
        itemAux.historico = 'Com:';
        for (let j in complement)
        {
            complement[j].complement_id = complement[j].id;
            complement[j].qtd = 1;
            valor = valor + complement[j].price;
        }
        itemAux.historico += h;
        console.log('valor',valor);
        itemAux.subtotal += valor;
        itemAux.complements = complement;
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }

    removeItem(i)
    {
        let cart = this.get();
        cart.items.splice(i,1);

        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }

    calculateSubtotal = function (item) {
        return item.price * item.qtd;
    };

    getTotal(items)
    {
        var sum = 0;
        items.forEach(function (item) {
            sum += item.subtotal;
        });

        return sum;
    }

    initCart()
    {
        localStorage.setItem(this.key,JSON.stringify({
            items:[],
            total:0
        }));
    }


}
