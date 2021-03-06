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
        /*for (var index in cart.items){
            itemAux = cart.items[index];
            if (itemAux.id == item.id){
                itemAux.qtd = itemAux.qtd + item.qtd;
                itemAux.subtotal = this.calculateSubtotal(itemAux);
                exists = true;
                break;
            }
        }*/
        item.product_id = item.id;
        item.subtotal = this.calculateSubtotal(item);
        cart.items.push(item);
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }

    addComp(complement,i) {
        let cart = this.get(),itemAux = cart.items[i];
        let valor = 0;

        complement.complement_id = complement.id;
        complement.qtd = 1;
        valor = valor + complement.price;

        itemAux.subtotal += valor;
        itemAux.complements.push(complement);

        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }
    addComplement(complement,i){
        let cart = this.get(),itemAux = cart.items[i];
        let valor = 0;
        for (let j in complement)
        {
            complement[j].complement_id = complement[j].id;
            complement[j].qtd = 1;
            valor = valor + complement[j].price;
        }
        itemAux.subtotal += valor;
        itemAux.complements = complement;
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }

    removeComplement(i,idItem)
    {
        let index;
        let cart = this.get(),itemAux,subTotal = cart.items[idItem].subtotal;
        for (var ind in cart.items[idItem].complements){
            itemAux = cart.items[idItem].complements[ind];
            if (itemAux.id == i){
                index = ind;
                subTotal-=itemAux.price;
                break;
            }
        }

        cart.items[idItem].complements.splice(index,1);
        cart.items[idItem].subtotal = subTotal;
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key,JSON.stringify(cart));
    }
    obs(o,i){
        let cart = this.get(),itemAux = cart.items[i];
        itemAux.historico = o;
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
