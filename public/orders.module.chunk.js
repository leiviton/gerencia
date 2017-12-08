webpackJsonp(["orders.module"],{

/***/ "../../../../../src/app/orders/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"successModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-success\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n                <h5 class=\"modal-title\">Pedido: {{ order.id}}</h5>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <h6 class=\"text-left\"> {{ client }}</h6>\r\n                <h6 class=\"text-right\" style=\"margin-top: -24px\">{{ order.created_at }}</h6>\r\n                <table class=\"table table-striped\">\r\n                    <thead>\r\n                    <tr>\r\n                        <th>#</th>\r\n                        <th>Produto</th>\r\n                        <th>Valor</th>\r\n                        <th>Quantadade</th>\r\n                        <th>Total</th>\r\n                    </tr>\r\n                    </thead>\r\n                    <tbody>\r\n                    <tr *ngFor=\"let i of products.data\">\r\n                        <td>{{ i.product.data.id }}</td>\r\n                        <td>{{ i.product.data.name }}</td>\r\n                        <td>{{ i.product.data.price | currency:'BRL':true}}</td>\r\n                        <td>{{ i.qtd }}</td>\r\n                        <td>\r\n                            {{ i.price | currency:'BRL':true }}\r\n\r\n                        </td>\r\n                    </tr>\r\n                    </tbody>\r\n                </table>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <div class=\"modal-button\">\r\n                    <a class=\"btn btn-link Left\"><i class=\"fa fa-print\"></i> Imprimir</a>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\"><i class=\"fa fa-arrow-circle-right\"></i> Fechar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/orders/components/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditComponent = (function () {
    function EditComponent(httpService, router, route) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.order = {};
        this.client = '';
        this.products = {};
        this.loading = true;
    }
    EditComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    EditComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().addClass('show');
        this.route.params
            .subscribe(function (params) {
            _this.httpService.builder().view(params['id'], 'order')
                .then(function (res) {
                _this.order = res.data;
                _this.client = res.data.client.data.user.data.name;
                _this.products = res.data.items;
                console.log(_this.products);
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders']);
    };
    EditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/edit.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"new_order\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: block; overflow-y: auto;\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h5 class=\"modal-title\">Novo Pedido</h5>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"col-md-12\">\r\n                    <form #myForm=\"ngForm\" (keyup.enter)=\"buscar()\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"col-md-2\">Buscar: </label>\r\n                            <input type=\"text\" class=\"form-control col-md-3\" name=\"pesquisa\" [(ngModel)]=\"pesquisa.value\" placeholder=\"Digite produto\" required minlength=\"2\" autofocus=\"autofocus\">\r\n                            <label class=\"label qtd col-md-2\"> Qtd.</label>\r\n                            <input class=\"form-control col-md-1\" type=\"number\" min=\"1\" max=\"10\" name=\"qtd\" [(ngModel)]=\"qtd\" />\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n\r\n                <div class=\"col-md-12\" style=\"padding-bottom: 5px;\">\r\n                    <form #myForm=\"ngForm\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"col-md-2\" *ngIf=\"mesa_id === 1\">Telefone: </label>\r\n                            <input *ngIf=\"mesa_id === 1\"  type=\"text\" class=\"form-control col-md-4\" name=\"pesquisa\"  placeholder=\"Digite Telefone\" required minlength=\"11\" [(ngModel)]=\"pesquisa.telefone\" (blur)=\"buscarCliente()\">\r\n                            <label for=\"mesa\" class=\"label col-md-2\">Mesa: </label>\r\n                            <select id=\"mesa\" name=\"category_id\" class=\"form-control col-md-4\" [(ngModel)]=\"mesa_id\">\r\n                                <option *ngFor=\"let g of mesas\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"row borderdiv\">\r\n                    <div class=\"col-md-4 mb-4 padding\" style=\"height: 300px; overflow: auto\" *ngIf=\"mesa_id===1\">\r\n                        <!-- Nav tabs -->\r\n                        <tabset>\r\n                            <tab heading=\"Cliente\">\r\n                                <p>Nome: </p>\r\n                                <p>Telefone: </p>\r\n                                <p>Endereço: </p>\r\n                                <p>Email: </p>\r\n                            </tab>\r\n                            <tab heading=\"50 ultimos\">\r\n                                <p>Pedido:</p>\r\n                                <p>Data:</p>\r\n                                <p>Produtos:</p>\r\n                            </tab>\r\n                        </tabset>\r\n                    </div><!--/.col-->\r\n                <div class=\"col-lg-8 padding\" [ngClass]=\"{'col-md-12 col-lg-12': mesa_id !== 1, 'col-md-8 col-lg-8': mesa_id === 1}\">\r\n                    <div class=\"table-responsive\" style=\"height: 240px; overflow: auto\">\r\n                        <table class=\"table scrollbox table-striped\">\r\n                            <thead>\r\n                                <tr class=\"th-table title-table\">\r\n                                    <th class=\"text-center\">#</th>\r\n                                    <th>Produto</th>\r\n                                    <th class=\"text-center\">Valor</th>\r\n                                    <th class=\"text-center\">Qtd.</th>\r\n                                    <th class=\"text-center\">Subtotal</th>\r\n                                    <th class=\"text-center\"></th>\r\n                                </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                                <tr class=\"th-table\" *ngFor=\"let p of items.items; let i = index\">\r\n                                    <td class=\"text-center\">{{ p.id }}</td>\r\n                                    <td>{{ p.name }}</td>\r\n                                    <td class=\"text-center\">{{ p.price | currency:'BRL':true }}</td>\r\n                                    <td class=\"text-center\">{{ p.qtd }}</td>\r\n                                    <td class=\"text-center\">{{ p.subtotal | currency:'BRL':true }}</td>\r\n                                    <td class=\"text-center\"><button class=\"btn btn-sm btn-default\" (click)=\"removeItem(i)\"><i class=\"fa fa-remove text-danger\"></i></button></td>\r\n                                </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                <hr>\r\n                <div class=\"col-md-12 text-center\"><p class=\"qtd\">TOTAL: {{ total | currency:'BRL':true }}</p></div>\r\n            </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <div class=\"modal-button\">\r\n                    <a class=\"btn btn-link Left\"><i class=\"fa fa-print\"></i> Imprimir</a>\r\n                    <button class=\"btn btn-info\" (click)=\"save()\" *ngIf=\"mesa_id !== 1\"><i class=\"fa fa-save\"></i> Salvar pedido</button>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\"><i class=\"fa fa-arrow-circle-right\"></i> Fechar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n<div tabindex=\"-1\" class=\"modal fade\" id=\"pesquisa\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header\">\r\n            </div>\r\n            <div class=\"modal-body\">\r\n\r\n            </div>\r\n            <div class=\"modal-footer\">\r\n                <div class=\"modal-button\">\r\n                    <a class=\"btn btn-link Left\"><i class=\"fa fa-print\"></i> Imprimir</a>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"closeMd()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\"><i class=\"fa fa-arrow-circle-right\"></i> Fechar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/orders/components/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NewComponent = (function () {
    function NewComponent(httpService, router, route, toasterService) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.cart = this.httpService.get();
        this.order = {};
        this.client = '';
        this.items = [];
        this.result = {};
        this.qtd = 1;
        this.total = 0;
        this.pesquisa = {
            value: null,
            telefone: null
        };
        this.mesa_id = 1;
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.cart) {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        console.log('items', this.items);
        this.total = this.httpService.get().total;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'mesas')
            .then(function (res) {
            _this.mesas = res.data;
            console.log('mesas', _this.mesas);
        });
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').show().addClass('show');
        setTimeout(function () {
            _this.hideLoading();
        }, 300);
    };
    NewComponent.prototype.buscarCliente = function () {
        console.log(this.pesquisa.telefone);
    };
    NewComponent.prototype.buscar = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
            _this.pesquisa.value = null;
            _this.result = res.data;
            _this.hideLoading();
            if (res.data.length > 1) {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').show().addClass('show');
            }
            else {
                if (res.data.length === 1) {
                    _this.addItem(_this.result[0]);
                    _this.total = _this.httpService.get().total;
                    _this.items = _this.httpService.get();
                    _this.qtd = 1;
                    console.log('item', _this.items);
                }
            }
            console.log("pesquisou", _this.result);
        });
        console.log("pesquisou", this.pesquisa);
    };
    NewComponent.prototype.addItem = function (item) {
        item.qtd = this.qtd;
        this.httpService.addItem(item);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo ' + item.id + ' adicionado.');
    };
    NewComponent.prototype.removeItem = function (i) {
        this.httpService.removeItem(i);
        this.total = this.httpService.get().total;
        this.items = this.httpService.get();
        this.toasterService.pop('info', 'Informação', 'Item removido.');
    };
    NewComponent.prototype.save = function () {
        var _this = this;
        console.log('mesa', this.mesa_id);
        this.showLoading();
        this.httpService.setAccessToken();
        if (this.httpService.get().items.length > 0) {
            var pedido = {
                items: this.httpService.get().items,
                total: this.httpService.get().total,
                mesa_id: this.mesa_id,
                client_id: 1
            };
            this.httpService.builder()
                .insert(pedido, 'order')
                .then(function (res) {
                _this.httpService.clear();
                _this.httpService.eventEmitter.emit();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso');
                _this.close();
            });
        }
        else {
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'É necessário adicionar ao menos um produto');
        }
    };
    NewComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').hide();
        this.router.navigate(['/orders']);
    };
    NewComponent.prototype.closeMd = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
    };
    NewComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    NewComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    NewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/new.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], NewComponent);
    return NewComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/orders.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar</button>\n              <a class=\"btn btn-success\" [routerLink]=\"['new']\"><i class=\"fa fa-plus\"></i> Novo</a>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">Status</th>\n                    <th class=\"title text-center\">Codigo</th>\n                    <th class=\"title-table text-center\"> Total</th>\n                    <th class=\"title\"> Cliente</th>\n                    <th class=\"title text-center\">Data</th>\n                    <th class=\"title text-center\">Hora</th>\n                    <th class=\"title text-center\">Previsão</th>\n                    <th class=\"title text-center\">Tipo</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"7\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of orders.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <span class=\"badge badge-success\" *ngIf=\"o.status === 2\" tooltip=\"Finalizada\">Finalizada</span>\n                      <span class=\"badge badge-info\" *ngIf=\"o.status === 1\" tooltip=\"Em preparo\">Entregue</span>\n                      <span class=\"badge badge-danger\" *ngIf=\"o.status === 0\" tooltip=\"Pendente\">Cozinha</span>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.id }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.total | currency:'BRL':true }}</td>\n                    <td *ngIf=\"tamanho > 0\">{{ o.client.data.user.data.name }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:0:10 }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:11:19}}</td>\n                    <td class=\"text-cester\" *ngIf=\"tamanho > 0\">{{ o.previsao }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <i class=\"fa fa-motorcycle\" *ngIf=\"o.type === 1\" tooltip=\"Delivery\"></i>\n                      <i class=\"fa fa fa-cutlery\" *ngIf=\"o.type === 0\" tooltip=\"Mesa\"></i>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n </div>\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">De</label>\n        <input type=\"date\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n\n        <label for=\"fim\">Até</label>\n        <input type=\"date\" id=\"fim\" class=\"form-control\" name=\"fim\" [(ngModel)]=\"pesquisa.fim\" required>\n        <label class=\"col-form-label\" for=\"select\">Status</label>\n        <select name=\"status\" class=\"form-control\" id=\"select\" [(ngModel)]=\"pesquisa.status\" required>\n          <option value=\"null\">Selecione o status</option>\n          <option value=\"0\">Pendentes</option>\n          <option value=\"1\">Em preparo</option>\n          <option value=\"2\">Entrega</option>\n          <option value=\"3\">Fechado</option>\n        </select>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar(pesquisa)\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/orders/components/orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OrdersComponent = (function () {
    function OrdersComponent(httpService, router, toasterService) {
        this.httpService = httpService;
        this.router = router;
        this.toasterService = toasterService;
        this.cor = false;
        this.orders = {};
        this.tamanho = 0;
        this.pesquisa = {
            inicio: null,
            fim: null,
            status: null
        };
    }
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(function () {
            _this.httpService.builder().list({}, 'orders')
                .then(function (res) {
                _this.orders = res;
                _this.tamanho = res.data.length;
                console.log(_this.tamanho);
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    OrdersComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/orders/edit/' + id]);
    };
    OrdersComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").hide();
    };
    OrdersComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").show();
    };
    OrdersComponent.prototype.showModal = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".modal").show().addClass('show');
    };
    OrdersComponent.prototype.hideModal = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".modal").hide();
    };
    OrdersComponent.prototype.pesquisar = function (fields) {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null && this.pesquisa.status) {
            console.log(this.pesquisa.inicio);
            var options = {
                filters: [
                    { status: this.pesquisa.status },
                    { inicio: this.pesquisa.inicio },
                    { fim: this.pesquisa.fim }
                ]
            };
            this.httpService.builder().list(options, 'filters')
                .then(function (res) {
                _this.orders = res;
                console.log(_this.orders);
                _this.tamanho = res.data.length;
                _this.hideModal();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');
            });
        }
        else if (this.pesquisa.status !== null && this.pesquisa.inicio === null && this.pesquisa.fim === null) {
            var options = {
                filters: [
                    { status: this.pesquisa.status }
                ]
            };
            this.httpService.builder().list(options, 'filters/')
                .then(function (res) {
                _this.orders = res;
                console.log(_this.orders);
                _this.tamanho = res.data.length;
                console.log(_this.tamanho);
                _this.hideModal();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Dados carregados com sucesso');
            });
            this.hideLoading();
        }
        else {
            this.hideLoading();
        }
    };
    OrdersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/orders.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */]) === "function" && _c || Object])
    ], OrdersComponent);
    return OrdersComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=orders.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/orders-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_orders_component__ = __webpack_require__("../../../../../src/app/orders/components/orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_edit_component__ = __webpack_require__("../../../../../src/app/orders/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_new_component__ = __webpack_require__("../../../../../src/app/orders/components/new.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_orders_component__["a" /* OrdersComponent */],
        data: {
            title: 'Pedidos'
        },
        children: [
            {
                path: 'edit/:id',
                component: __WEBPACK_IMPORTED_MODULE_3__components_edit_component__["a" /* EditComponent */],
                data: {
                    title: 'Editar'
                }
            },
            {
                path: 'new',
                component: __WEBPACK_IMPORTED_MODULE_4__components_new_component__["a" /* NewComponent */],
                data: {
                    title: 'Novo'
                }
            }
        ]
    }
];
var OrdersRoutingModule = (function () {
    function OrdersRoutingModule() {
    }
    OrdersRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], OrdersRoutingModule);
    return OrdersRoutingModule;
}());

//# sourceMappingURL=orders-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/orders/orders.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersModule", function() { return OrdersModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_orders_component__ = __webpack_require__("../../../../../src/app/orders/components/orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_edit_component__ = __webpack_require__("../../../../../src/app/orders/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_new_component__ = __webpack_require__("../../../../../src/app/orders/components/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__orders_routing_module__ = __webpack_require__("../../../../../src/app/orders/orders-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_cuppa_ng2_grid_cuppa_ng2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var OrdersModule = (function () {
    function OrdersModule() {
    }
    OrdersModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_9__orders_routing_module__["a" /* OrdersRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap__["c" /* TooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_12_cuppa_ng2_grid_cuppa_ng2_dataGrid__["a" /* CuppaDataGridModule */],
                __WEBPACK_IMPORTED_MODULE_13_ngx_bootstrap_tabs__["a" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap__["a" /* DatepickerModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__components_orders_component__["a" /* OrdersComponent */], __WEBPACK_IMPORTED_MODULE_7__components_edit_component__["a" /* EditComponent */], __WEBPACK_IMPORTED_MODULE_8__components_new_component__["a" /* NewComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_11__services_orders_service__["a" /* OrdersService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */]]
        })
    ], OrdersModule);
    return OrdersModule;
}());

//# sourceMappingURL=orders.module.js.map

/***/ }),

/***/ "../../../../../src/app/orders/services/orders.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_http_service__ = __webpack_require__("../../../../../src/app/app-http.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var OrdersService = (function (_super) {
    __extends(OrdersService, _super);
    function OrdersService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        _this.key = 'cart';
        _this.cartAux = JSON.parse(localStorage.getItem(_this.key) || null);
        _this.calculateSubtotal = function (item) {
            return item.price * item.qtd;
        };
        return _this;
    }
    OrdersService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    OrdersService.prototype.clear = function () {
        this.initCart();
    };
    OrdersService.prototype.get = function () {
        return JSON.parse(localStorage.getItem(this.key) || null);
    };
    OrdersService.prototype.getItem = function (i) {
        return this.get().items[i];
    };
    OrdersService.prototype.addItem = function (item) {
        var cart = this.get(), itemAux, exists = false;
        for (var index in cart.items) {
            itemAux = cart.items[index];
            if (itemAux.id == item.id) {
                itemAux.qtd = itemAux.qtd + item.qtd;
                itemAux.subtotal = this.calculateSubtotal(itemAux);
                exists = true;
                break;
            }
        }
        item.product_id = item.id;
        if (exists === false) {
            item.subtotal = this.calculateSubtotal(item);
            cart.items.push(item);
        }
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key, JSON.stringify(cart));
    };
    OrdersService.prototype.removeItem = function (i) {
        var cart = this.get();
        cart.items.splice(i, 1);
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key, JSON.stringify(cart));
    };
    OrdersService.prototype.getTotal = function (items) {
        var sum = 0;
        items.forEach(function (item) {
            sum += item.subtotal;
        });
        return sum;
    };
    OrdersService.prototype.initCart = function () {
        localStorage.setItem(this.key, JSON.stringify({
            items: [],
            total: 0
        }));
    };
    OrdersService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], OrdersService);
    return OrdersService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=orders.service.js.map

/***/ })

});
//# sourceMappingURL=orders.module.chunk.js.map