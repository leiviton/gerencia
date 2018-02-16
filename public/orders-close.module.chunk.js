webpackJsonp(["orders-close.module"],{

/***/ "../../../../../src/app/close/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"successModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h4 class=\"text-center\">Editar Pedido: {{ order.id }} </h4>\r\n                <h4 class=\"text-center\"> {{ mesa }} </h4>\r\n                <h4 class=\"text-center\">Total: {{ order.total  | currency:'BRL':true}}</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"col-md-12\">\r\n                    <form #myForm=\"ngForm\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label for=\"tipo\" class=\"label col-md-2\">Tipo: </label>\r\n                            <select id=\"tipo\" name=\"tipo\" class=\"form-control col-md-2\" [(ngModel)]=\"order.type\" disabled>\r\n                                <option value=\"0\"> Delivery</option>\r\n                                <option value=\"1\"> Salão</option>\r\n                                <option value=\"2\"> Retirada</option>\r\n                            </select>\r\n                            <label for=\"mesa\" class=\"label col-md-2\" *ngIf=\"order.type == 1\">Mesa: </label>\r\n                            <select id=\"mesa\" name=\"mesa_id\" class=\"form-control col-md-2\" [(ngModel)]=\"order.mesa.data.id\" *ngIf=\"order.type == 1\" disabled>\r\n                                <option *ngFor=\"let g of mesas.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                            <label for=\"status\" class=\"label col-md-2\">Status: </label>\r\n                            <select id=\"status\" name=\"staus\" class=\"form-control col-md-2\" [(ngModel)]=\"order.status\" disabled>\r\n                                <option value=\"3\">Fechada</option>\r\n                            </select>\r\n\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"col-md-12\" style=\"padding-bottom: 5px;\">\r\n                    <form #myForm=\"ngForm\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"row borderdiv\" style=\"height: 370px; overflow: auto\">\r\n                    <div class=\"col-md-6 mb-4 padding\" *ngIf=\"order.type != 1\">\r\n                        <!-- Nav tabs -->\r\n                        <tabset>\r\n                            <tab heading=\"Cliente\">\r\n                                <form name=\"form\" class=\"form-inline\">\r\n                                    <input type=\"text\" class=\"form-control col-md-12 name\" name=\"name\" [(ngModel)]=\"client.name\" placeholder=\"Nome Cliente\" disabled/>\r\n                                    <br><br>\r\n                                    <input ngxPhoneMask type=\"text\" class=\"form-control col-md-12\" name=\"phone\" [(ngModel)]=\"client.phone\" placeholder=\"Telefone\" disabled />\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12\" name=\"email\" [(ngModel)]=\"client.email\" placeholder=\"Email\" disabled />\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12\" name=\"address.address\" [(ngModel)]=\"client.address.address\" placeholder=\"Rua\" [disabled]=\"editar\"/>\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-3\" name=\"address.numero\" [(ngModel)]=\"client.address.numero\" placeholder=\"Numero\" [disabled]=\"editar\">\r\n                                    <div class=\"separate1\"></div>\r\n                                    <input type=\"text\" class=\"form-control col-md-8\" name=\"address.bairro\" [(ngModel)]=\"client.address.bairro\" placeholder=\"Bairro\" [disabled]=\"editar\"/>\r\n                                    <br><br>\r\n                                    <select name=\"cidade\" id=\"cidade\" class=\"form-control col-md-12\" [(ngModel)]=\"client.address.city_id\" disabled>\r\n                                        <option value=\"0\">Selecione cidade</option>\r\n                                        <option value=\"3128709\">Guaxupé</option>\r\n                                        <option value=\"3128303\">Guaranésia</option>\r\n                                        <option value=\"3136900\">Juruaia</option>\r\n                                        <option value=\"3144102\">Muzambinho</option>\r\n                                        <option value=\"3163904\">São Pedro da União</option>\r\n                                    </select>\r\n                                    <br><br>\r\n                                    <div class=\"padding\" *ngIf=\"editar == false\">\r\n                                        <button type=\"button\" class=\"btn btn-default btn-info\" (click)=\"saveClient()\">Atualizar endereço</button>\r\n                                    </div>\r\n                                </form>\r\n                            </tab>\r\n                        </tabset>\r\n                    </div><!--/.col-->\r\n                    <div class=\"col-lg-6 padding\" [ngClass]=\"{'col-md-12 col-lg-12': order.type != 0 && order.type != 2, 'col-md-6 col-lg-6': order.type != 1}\">\r\n                        <div class=\"table-responsive\" style=\"height: 160px; overflow: auto\">\r\n                            <table class=\"table scrollbox table-striped\">\r\n                                <thead>\r\n                                <tr class=\"th-table title-table\">\r\n                                    <th>#</th>\r\n                                    <th>Produto</th>\r\n                                    <th>Valor</th>\r\n                                    <th>Quantadade</th>\r\n                                    <th>SubTotal</th>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                <tr *ngFor=\"let i of products.data\">\r\n                                    <td *ngIf=\"i.ativo == 'S'\">{{ i.product.data.id }}</td>\r\n                                    <td *ngIf=\"i.ativo == 'S'\">{{ i.product.data.name }}\r\n                                        <p *ngFor=\"let c of i.complement.data\" style=\"font-size: 10px; margin-bottom: 0;\"> {{ c.complement.data.name }}: {{ c.price | currency:'BRL':true }}</p>\r\n                                        <p style=\"font-size: 10px; margin-bottom: 0;\">{{ i.historico }}</p>\r\n                                    </td>\r\n                                    <td *ngIf=\"i.ativo == 'S'\">{{ i.product.data.price | currency:'BRL':true}}</td>\r\n                                    <td *ngIf=\"i.ativo == 'S'\">{{ i.qtd }}</td>\r\n                                    <td *ngIf=\"i.ativo == 'S'\">\r\n                                        {{ i.subtotal | currency:'BRL':true }}\r\n                                    </td>\r\n                                </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <hr>\r\n                        <div class=\"col-md-12 text-center alert alert-success total-pagamento\"><p class=\"qtd\">TOTAL: {{ order.total | currency:'BRL':true }}</p></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-primary\" (click)=\"save()\"><i class=\"fa fa-print\"></i> Imprimir (F7)</button>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar (ESC)</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/close/components/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/close/services/orders.service.ts");
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





var EditComponent = (function () {
    function EditComponent(httpService, router, route, toasterService) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.order = {
            id: 0,
            status: 0,
            mesa: {
                data: {
                    id: 1
                }
            }
        };
        this.client = {
            id: 1,
            name: '',
            phone: '',
            address: {
                address: null,
                numero: null,
                bairro: null,
                city_id: 0
            },
            email: ''
        };
        this.products = {};
        this.mesas = {
            data: null
        };
        this.mesa = '';
        this.pesquisa = {
            value: null,
            telefone: null
        };
        this.result = {
            qtd: 1
        };
        this.qtd = 1;
        this.editar = true;
        this.imprimir = false;
        document.onkeydown = (function (e) {
            if (e.keyCode == 120) {
                _this.update();
            }
            if (e.keyCode == 27) {
                _this.close();
            }
            if (e.keyCode == 118) {
                _this.save();
            }
        });
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().addClass('show');
        __WEBPACK_IMPORTED_MODULE_1_jquery__('name').disabled = false;
        this.route.params
            .subscribe(function (params) {
            _this.httpService.builder().view(params['id'], 'order')
                .then(function (res) {
                _this.order = res.data;
                if (res.data.client.data.user) {
                    _this.client.id = res.data.client.data.id;
                    _this.client.name = res.data.client.data.name;
                    _this.client.phone = res.data.client.data.phone;
                    _this.client.email = res.data.client.data.user.data.email;
                    _this.client.address.address = res.data.client.data.addressClient.data.address;
                    _this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    _this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    _this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                    _this.products = res.data.items;
                    _this.mesa = res.data.mesa.data.name;
                }
                else {
                    _this.client.id = res.data.client.data.id;
                    _this.client.name = res.data.client.data.name;
                    _this.client.phone = res.data.client.data.phone;
                    _this.client.email = '';
                    _this.client.address.address = res.data.client.data.addressClient.data.address;
                    _this.client.address.numero = res.data.client.data.addressClient.data.numero;
                    _this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
                    _this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
                    _this.products = res.data.items;
                    _this.mesa = res.data.mesa.data.name;
                }
                _this.hideLoading();
            });
            _this.httpService.setAccessToken();
            _this.httpService.builder()
                .list({}, 'mesas/all')
                .then(function (res) {
                _this.mesas = res;
            });
        });
        this.httpService.eventEmitter.emit();
    };
    EditComponent.prototype.update = function () {
        var _this = this;
        this.showLoading();
        var order = {
            'status': this.order.status,
            'mesa_id': this.order.mesa.data.id
        };
        this.httpService.builder('order')
            .update(this.order.id, order)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
            _this.order = res.data;
            _this.client.id = res.data.client.data.id;
            _this.client.name = res.data.client.data.name;
            _this.client.phone = res.data.client.data.phone;
            if (res.data.client.data.user) {
                _this.client.email = res.data.client.data.user.data.email;
            }
            else {
                _this.client.email = res.data.client.data.user.data.email;
            }
            _this.client.address.address = res.data.client.data.addressClient.data.address;
            _this.client.address.numero = res.data.client.data.addressClient.data.numero;
            _this.client.address.bairro = res.data.client.data.addressClient.data.bairro;
            _this.client.address.city_id = res.data.client.data.addressClient.data.city.data.id;
            _this.products = res.data.items;
            _this.mesa = res.data.mesa.data.name;
            _this.hideLoading();
            _this.toasterService.pop('success', 'Sucesso', 'Pedido ' + _this.order.id + ' com sucesso!');
        });
    };
    EditComponent.prototype.buscar = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('search')
            .search(this.pesquisa.value)
            .then(function (res) {
            _this.pesquisa.value = null;
            _this.result = res.data;
            _this.hideLoading();
            _this.addItem(_this.result[0]);
            var pedido = {
                items: _this.httpService.get().items,
                order_id: _this.order.id
            };
            _this.httpService.builder()
                .insert(pedido, 'addItem')
                .then(function (res) {
                _this.httpService.eventEmitter.emit();
                _this.httpService.clear();
                _this.order = res.data;
                _this.products = res.data.items;
                _this.imprimir = true;
            });
        });
    };
    EditComponent.prototype.addItem = function (item) {
        this.httpService.addItem(item, this.qtd);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo ' + item.id + ' adicionado.');
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/close']);
    };
    EditComponent.prototype.save = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/close/printer/' + this.order.id + '/N']);
    };
    EditComponent.prototype.habilitarEdicao = function () {
        this.editar = !this.editar;
    };
    EditComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    EditComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    EditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/close/components/relatorio-mov-caixa.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/close/components/orders.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar </button>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">Status</th>\n                    <th class=\"title text-center\">Tipo</th>\n                    <th class=\"title text-center\">Codigo</th>\n                    <th class=\"title-table text-center\"> Total</th>\n                    <th class=\"title\"> Cliente</th>\n                    <th class=\"title text-center\">Data</th>\n                    <th class=\"title text-center\">Hora</th>\n                    <th class=\"title text-center\">Previsão</th>\n                    <th class=\"title text-center\">Mesa</th>\n                    <th class=\"title text-center\">Ações</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"10\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of orders.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <span class=\"badge badge-pill badge-success\" *ngIf=\"o.status === 3\" tooltip=\"Pagamento realizado\"> Pago</span>\n                      <span class=\"badge badge-pill badge-info\" *ngIf=\"o.status === 2\" tooltip=\"Em transito\">Em transito</span>\n                      <span class=\"badge badge-pill badge-primary\" *ngIf=\"o.status === 1\" tooltip=\"Preparado\">Preparado</span>\n                      <span class=\"badge badge-pill badge-new\" *ngIf=\"o.status === 0\" tooltip=\"Na cozinha\">Cozinha</span>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <i class=\"fa fa-motorcycle\" *ngIf=\"o.type == 0\" tooltip=\"Delivery\"></i>\n                      <i class=\"fa fa-upload\" *ngIf=\"o.type == 2\" tooltip=\"Retirada\"></i>\n                      <i class=\"fa fa fa-cutlery\" *ngIf=\"o.type == 1\" tooltip=\"Mesa\"></i>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.id }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.total | currency:'BRL':true }}</td>\n                    <td class=\"text-capitalize\" *ngIf=\"tamanho > 0\">{{ o.client.data.name }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:0:10 }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:11:19}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.previsao }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.mesa.data.name }} </td>\n                    <td class=\"text-center\">\n                      <a class=\"btn btn-link text-alert pagamento\" *ngIf=\"o.status == 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Ver pagamentos\"><i class=\"fa fa-money\"></i></a>\n                      <a class=\"btn btn-link text-success pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Pagar pedido\"><i class=\"fa fa-dollar\"></i></a>\n                      <a class=\"btn btn-link pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['printer/'+ o.id]+'/S'\" tooltip=\"Imprimir pedido\"><i class=\"fa fa-print\"></i></a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n </div>\n\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header novo\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">De</label>\n        <input type=\"date\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n\n        <label for=\"fim\">Até</label>\n        <input type=\"date\" id=\"fim\" class=\"form-control\" name=\"fim\" [(ngModel)]=\"pesquisa.fim\" required>\n      </div>\n      <div class=\"modal-footer novo\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar()\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/close/components/orders.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersCloseComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/close/services/orders.service.ts");
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





var OrdersCloseComponent = (function () {
    function OrdersCloseComponent(httpService, router, toasterService) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.toasterService = toasterService;
        this.cor = false;
        this.orders = {
            data: []
        };
        this.tamanho = 0;
        this.pesquisa = {
            inicio: null,
            fim: null,
            status: null
        };
        document.onkeydown = (function (e) {
            if (e.keyCode == 113) {
                return _this.showModal();
            }
        });
    }
    OrdersCloseComponent.prototype.ngOnInit = function () {
        this.showLoading();
        this.httpService.setAccessToken();
        setTimeout(this.hideLoading(), 2000);
    };
    OrdersCloseComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/close/edit/' + id]);
    };
    OrdersCloseComponent.prototype.new = function () {
        return this.router.navigate(['/orders/new']);
    };
    OrdersCloseComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").hide();
    };
    OrdersCloseComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").show();
    };
    OrdersCloseComponent.prototype.showModal = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".modal").show().addClass('show');
    };
    OrdersCloseComponent.prototype.hideModal = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".modal").hide();
    };
    OrdersCloseComponent.prototype.pesquisar = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null) {
            var options = {
                filters: [
                    { status: 3 },
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
        else {
            this.toasterService.pop('error', 'Erro', 'Preencha inicio, fim e status para pesquisar.');
            this.hideLoading();
        }
    };
    OrdersCloseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/close/components/orders.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */]) === "function" && _c || Object])
    ], OrdersCloseComponent);
    return OrdersCloseComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=orders.component.js.map

/***/ }),

/***/ "../../../../../src/app/close/components/payment.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"payment\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: block; overflow-y: auto;\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h4 class=\"text-center\">Pedido: {{ order.id }} </h4>\r\n                <h4 class=\"text-center\"> {{ mesa }} </h4>\r\n                <h4 class=\"text-center\"> Total: {{ order.total | currency:'BRL':true }}</h4>\r\n            </div>\r\n            <div class=\"modal-body\" style=\"height: 500px; overflow: auto\">\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"row col-md-12\">\r\n                        <div class=\"col-md-6\">\r\n                            <h5 class=\"text-capitalize\">{{ client.name }}</h5>\r\n                        </div>\r\n                        <div class=\"col-md-6\">\r\n                            <h5 class=\"text-capitalize\">{{ client.address }}</h5>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-12\" *ngIf=\"order.payment\">\r\n                    <div class=\"table-responsive\">\r\n                        <div class=\"card\">\r\n                            <div class=\"card-header\">\r\n                                <i class=\"fa fa-money\"></i> Pagamentos\r\n                            </div>\r\n                            <div class=\"card-body\">\r\n                                <div class=\"talbe-responsive\">\r\n                                    <table class=\"table scrollbox table-striped\">\r\n                                        <thead>\r\n                                        <tr class=\"th-table title-table\">\r\n                                            <th class=\"text-center\">Vr.Pago</th>\r\n                                            <th>Desconto</th>\r\n                                            <th class=\"text-center\">Acrescimo</th>\r\n                                            <th class=\"text-center\">Total</th>\r\n                                            <th class=\"text-center\">Tipo</th>\r\n                                            <th class=\"text-center\">Data</th>\r\n                                        </tr>\r\n                                        </thead>\r\n                                        <tbody style=\"height: 250px; overflow: auto\">\r\n                                        <tr class=\"th-table\" *ngFor=\"let p of order.payment.data; let i = index\">\r\n                                            <td class=\"text-center\">{{ p.total_pago | currency:'BRL':true }}</td>\r\n                                            <td>{{ p.desconto | currency:'BRL':true }}</td>\r\n                                            <td class=\"text-center\">{{ p.acrescimo | currency:'BRL':true }}</td>\r\n                                            <td class=\"text-center\">{{ order.total | currency:'BRL':true }}</td>\r\n                                            <td class=\"text-center\">{{ p.type.data.name }}</td>\r\n                                            <td class=\"text-center\">{{ p.created_at }}</td>\r\n                                        </tr>\r\n                                        </tbody>\r\n                                    </table>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"card\">\r\n                        <div class=\"card-header\">\r\n                            <i class=\"fa fa-shopping-bag\"></i> Produtos\r\n                        </div>\r\n                        <div class=\"card-body\" style=\"padding-bottom: 0px\">\r\n                            <div class=\"table-responsive\">\r\n                                <table class=\"table scrollbox table-striped\">\r\n                                    <thead>\r\n                                    <tr class=\"th-table title-table\">\r\n                                        <th class=\"text-center\">#</th>\r\n                                        <th>Produto</th>\r\n                                        <th class=\"text-center\">Valor</th>\r\n                                        <th class=\"text-center\">Qtd.</th>\r\n                                        <th class=\"text-center\">Subtotal</th>\r\n                                    </tr>\r\n                                    </thead>\r\n                                    <tbody style=\"height: 170px; overflow: auto\">\r\n                                    <tr class=\"th-table\" *ngFor=\"let p of products.data; let i = index\">\r\n                                        <td class=\"text-center\" *ngIf=\"p.ativo == 'S'\" >{{ p.product.data.id }}</td>\r\n                                        <td *ngIf=\"p.ativo == 'S'\">{{ p.product.data.name }}\r\n                                            <p *ngFor=\"let c of p.complement.data\" style=\"font-size: 10px; margin-bottom: 0;\"> {{ c.complement.data.name }}: {{ c.price | currency:'BRL':true }}</p>\r\n                                            <p style=\"font-size: 10px; margin-bottom: 0;\">{{ p.historico }}</p>\r\n                                        </td>\r\n                                        <td class=\"text-center\" *ngIf=\"p.ativo == 'S'\">{{ p.price | currency:'BRL':true }}</td>\r\n                                        <td class=\"text-center\" *ngIf=\"p.ativo == 'S'\">{{ p.qtd }}</td>\r\n                                        <td class=\"text-center\" *ngIf=\"p.ativo == 'S'\">{{ p.subtotal | currency:'BRL':true }}</td>\r\n                                    </tr>\r\n                                    </tbody>\r\n                                </table>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer novo\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Fechar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/close/components/payment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_orders_service__ = __webpack_require__("../../../../../src/app/close/services/orders.service.ts");
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





var PaymentComponent = (function () {
    function PaymentComponent(httpService, router, route, toasterService) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.order = {
            id: 0,
            total: 0
        };
        this.mesa = '';
        this.products = {};
        this.total = 0;
        this.type_id = null;
        this.payment = {
            'order_id': null,
            'total_pago': 0,
            'desconto': 0,
            'acrescimo': 0,
            'total_original': 0,
            'payment_types': '',
            'data_pagamento': ''
        };
        this.troco = 0;
        this.tipo = {};
        this.valor_pag = 0;
        this.divisao = 1;
        this.result_div = 0;
        this.client = {
            name: '',
            address: ''
        };
        document.onkeydown = (function (e) {
            if (e.keyCode == 27) {
                _this.close();
            }
        });
    }
    PaymentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#payment').show().addClass('show');
        this.tipos();
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(function (params) {
            _this.httpService.builder().view(params['id'], 'order')
                .then(function (res) {
                _this.order = res.data;
                _this.payment.order_id = _this.order.id;
                _this.payment.total_pago = res.data.payment.data[0].total_pago;
                _this.payment.total_original = res.data.total;
                _this.payment.data_pagamento = res.data.payment.data[0].created_at;
                _this.payment.desconto = res.data.payment.data[0].desconto;
                _this.payment.acrescimo = res.data.payment.data[0].acrescimo;
                _this.payment.payment_types = res.data.payment.data[0].type.data.name;
                _this.products = res.data.items;
                _this.client.name = res.data.client.data.name;
                _this.client.address = res.data.client.data.endereco;
                _this.mesa = res.data.mesa.data.name;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    PaymentComponent.prototype.tipos = function () {
        var _this = this;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'typepayment')
            .then(function (res) {
            _this.tipo = res;
        });
    };
    PaymentComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#payment').hide();
        this.router.navigate(['/close']);
    };
    PaymentComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    PaymentComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    PaymentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/close/components/payment.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], PaymentComponent);
    return PaymentComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=payment.component.js.map

/***/ }),

/***/ "../../../../../src/app/close/components/printer.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"printer\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog modal-lg modal-default\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\" style=\"height: 530px\">\r\n                <div *ngIf=\"innerHtml\"\r\n                     [innerHTML]=\"innerHtml\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/close/components/printer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_orders_service__ = __webpack_require__("../../../../../src/app/close/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PrinterComponent = (function () {
    function PrinterComponent(httpService, router, route, toasterService, sanitizer) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.sanitizer = sanitizer;
        this.order = {
            id: 0,
            link_printer: ''
        };
        this.link_printer = '';
        document.onkeydown = (function (e) {
            if (e.keyCode == 27) {
                _this.close();
            }
        });
    }
    PrinterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#printer').on('show.bs.modal').show().addClass('show');
        this.route.params
            .subscribe(function (params) {
            var url = '';
            if (params['i'] == 'S') {
                url = 'printer';
            }
            else {
                url = 'printer';
            }
            _this.httpService.builder().view(params['id'], url)
                .then(function (res) {
                _this.innerHtml = _this.sanitizer.bypassSecurityTrustHtml("<object data='" + res.data.link_printer + "' name='my_iframe' onload='window.option();window.print();window.close()' type='application/pdf' height='500' width='780' class='embed-responsive-item'>" +
                    "Object " + res.data.link_printer + " failed" +
                    "</object>");
                _this.link_printer = 'http://108.61.155.169' + res.data.link_printer;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    PrinterComponent.prototype.imprimir = function (num, id) {
        window.focus();
        window.print();
    };
    PrinterComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#printer').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/close']);
    };
    PrinterComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").hide();
    };
    PrinterComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").show();
    };
    PrinterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/close/components/printer.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object])
    ], PrinterComponent);
    return PrinterComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=printer.component.js.map

/***/ }),

/***/ "../../../../../src/app/close/orders-close.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersCloseModule", function() { return OrdersCloseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_orders_component__ = __webpack_require__("../../../../../src/app/close/components/orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_payment_component__ = __webpack_require__("../../../../../src/app/close/components/payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__orders_routing_module__ = __webpack_require__("../../../../../src/app/close/orders-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__services_orders_service__ = __webpack_require__("../../../../../src/app/close/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_cuppa_ng2_grid_cuppa_ng2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_phone_mask__ = __webpack_require__("../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_printer_component__ = __webpack_require__("../../../../../src/app/close/components/printer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_edit_component__ = __webpack_require__("../../../../../src/app/close/components/relatorio-mov-caixa.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var OrdersCloseModule = (function () {
    function OrdersCloseModule() {
    }
    OrdersCloseModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_8__orders_routing_module__["a" /* OrdersCloseRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_9_ngx_bootstrap__["b" /* TooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_11_cuppa_ng2_grid_cuppa_ng2_dataGrid__["a" /* CuppaDataGridModule */],
                __WEBPACK_IMPORTED_MODULE_12_ngx_bootstrap_tabs__["a" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_13_ng2_currency_mask__["CurrencyMaskModule"],
                __WEBPACK_IMPORTED_MODULE_14_ngx_phone_mask__["a" /* NgxPhoneMaskModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__components_orders_component__["a" /* OrdersCloseComponent */], __WEBPACK_IMPORTED_MODULE_7__components_payment_component__["a" /* PaymentComponent */], __WEBPACK_IMPORTED_MODULE_15__components_printer_component__["a" /* PrinterComponent */], __WEBPACK_IMPORTED_MODULE_16__components_edit_component__["a" /* EditComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_10__services_orders_service__["a" /* OrdersService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */]]
        })
    ], OrdersCloseModule);
    return OrdersCloseModule;
}());

//# sourceMappingURL=orders-close.module.js.map

/***/ }),

/***/ "../../../../../src/app/close/orders-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersCloseRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_orders_component__ = __webpack_require__("../../../../../src/app/close/components/orders.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_payment_component__ = __webpack_require__("../../../../../src/app/close/components/payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_printer_component__ = __webpack_require__("../../../../../src/app/close/components/printer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_edit_component__ = __webpack_require__("../../../../../src/app/close/components/relatorio-mov-caixa.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_orders_component__["a" /* OrdersCloseComponent */],
        data: {
            title: 'Pedidos Fechados'
        },
        children: [
            {
                path: 'edit/:id',
                component: __WEBPACK_IMPORTED_MODULE_5__components_edit_component__["a" /* EditComponent */],
                data: {
                    title: 'Editar'
                }
            },
            {
                path: 'printer/:id/:i',
                component: __WEBPACK_IMPORTED_MODULE_4__components_printer_component__["a" /* PrinterComponent */],
                data: {
                    title: 'Printer'
                }
            },
            {
                path: 'payment/:id',
                component: __WEBPACK_IMPORTED_MODULE_3__components_payment_component__["a" /* PaymentComponent */],
                data: {
                    title: 'Editar'
                }
            }
        ]
    }
];
var OrdersCloseRoutingModule = (function () {
    function OrdersCloseRoutingModule() {
    }
    OrdersCloseRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], OrdersCloseRoutingModule);
    return OrdersCloseRoutingModule;
}());

//# sourceMappingURL=orders-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/close/services/orders.service.ts":
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
    OrdersService.prototype.addItem = function (item, qtd) {
        var cart = this.get(), itemAux, exists = false;
        item.qtd = qtd;
        item.complements = [];
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
    OrdersService.prototype.addComplement = function (complement, i) {
        var cart = this.get(), itemAux = cart.items[i];
        var valor = 0;
        var h = '';
        itemAux.historico = 'Com:';
        for (var j in complement) {
            valor = valor + complement[j].price;
            h += complement[j].name + ',';
        }
        itemAux.historico += h;
        console.log('valor', valor);
        itemAux.subtotal += valor;
        itemAux.complements = complement;
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
//# sourceMappingURL=orders-close.module.chunk.js.map