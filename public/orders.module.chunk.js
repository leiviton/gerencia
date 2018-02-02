webpackJsonp(["orders.module"],{

/***/ "../../../../../src/app/orders/components/complement.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"new_order\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"z-index: 9999\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h5 class=\"modal-title\">Novo Pedido</h5>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body padding\">\r\n                <p>Teste</p>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-info\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Salvar pedido (F9)</button>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n\r\n\r\n"

/***/ }),

/***/ "../../../../../src/app/orders/components/complement.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComplementComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var ComplementComponent = (function () {
    function ComplementComponent() {
    }
    ComplementComponent.prototype.ngOnInit = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').show().addClass('show');
    };
    ComplementComponent.prototype.close = function () {
    };
    ComplementComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/complement.component.html")
        })
    ], ComplementComponent);
    return ComplementComponent;
}());

//# sourceMappingURL=complement.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"successModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h4 class=\"text-center\">Editar Pedido: {{ order.id }} </h4>\r\n                <h4 class=\"text-center\"> {{ mesa }} </h4>\r\n                <h4 class=\"text-center\">Total: {{ order.total  | currency:'BRL':true}}</h4>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <div class=\"col-md-12\">\r\n                    <form #myForm=\"ngForm\" (keyup.enter)=\"buscar()\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label class=\"col-md-2\">Buscar: </label>\r\n                            <input type=\"text\" class=\"form-control col-md-3\" name=\"pesquisa\" [(ngModel)]=\"pesquisa.value\" placeholder=\"Digite produto\" required  autofocus=\"autofocus\">\r\n                            <label class=\"label qtd col-md-2\"> Qtd.</label>\r\n                            <input class=\"form-control col-md-1\" type=\"number\" name=\"qtd\" [(ngModel)]=\"qtd\" min=\"1\"  />\r\n                            <label for=\"tipo\" class=\"label col-md-2\">Tipo: </label>\r\n                            <select id=\"tipo\" name=\"tipo\" class=\"form-control col-md-2\" [(ngModel)]=\"order.type\">\r\n                                <option value=\"0\"> Delivery</option>\r\n                                <option value=\"1\"> Salão</option>\r\n                                <option value=\"2\"> Retirada</option>\r\n                            </select>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"col-md-12\" style=\"padding-bottom: 5px;\">\r\n                    <form #myForm=\"ngForm\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <label for=\"mesa\" class=\"label col-md-2\" *ngIf=\"order.type == 1\">Mesa: </label>\r\n                            <select id=\"mesa\" name=\"mesa_id\" class=\"form-control col-md-4\" [(ngModel)]=\"mesa_id\" *ngIf=\"order.type == 1\">\r\n                                <option value=\"null\">Selecione a mesa</option>\r\n                                <option value=\"{{order.mesa.data.id}}\">{{ order.mesa.data.name }}</option>\r\n                                <option *ngFor=\"let g of mesas.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                            <label for=\"status\" class=\"label col-md-2\">Status: </label>\r\n                            <select id=\"status\" name=\"staus\" class=\"form-control col-md-3\" [(ngModel)]=\"order.status\">\r\n                                <option value=\"null\">Selecione um status</option>\r\n                                <option value=\"0\">Cozinha</option>\r\n                                <option value=\"1\">Preparado</option>\r\n                                <option value=\"2\">Em transito</option>\r\n                            </select>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"row borderdiv\" style=\"height: 370px; overflow: auto\">\r\n                    <div class=\"col-md-6 mb-4 padding\" *ngIf=\"order.type != 1\">\r\n                        <!-- Nav tabs -->\r\n                        <tabset>\r\n                            <tab heading=\"Cliente\">\r\n                                <form name=\"form\" class=\"form-inline\">\r\n                                    <input type=\"text\" class=\"form-control col-md-12 name text-capitalize\" name=\"name\" [(ngModel)]=\"client.name\" placeholder=\"Nome Cliente\" disabled/>\r\n                                    <br><br>\r\n                                    <input ngxPhoneMask type=\"text\" class=\"form-control col-md-12\" name=\"phone\" [(ngModel)]=\"client.phone\" placeholder=\"Telefone\" disabled />\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12\" name=\"email\" [(ngModel)]=\"client.email\" placeholder=\"Email\" disabled />\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12 text-capitalize\" name=\"address.address\" [(ngModel)]=\"client.address.address\" placeholder=\"Rua\" [disabled]=\"editar\"/>\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-3 text\" name=\"address.numero\" [(ngModel)]=\"client.address.numero\" placeholder=\"Numero\" [disabled]=\"editar\">\r\n                                    <div class=\"separate1\"></div>\r\n                                    <input type=\"text\" class=\"form-control col-md-8 text-capitalize\" name=\"address.bairro\" [(ngModel)]=\"client.address.bairro\" placeholder=\"Bairro\" [disabled]=\"editar\"/>\r\n                                    <br><br>\r\n                                    <select name=\"cidade\" id=\"cidade\" class=\"form-control col-md-12\" [(ngModel)]=\"client.address.city_id\" disabled>\r\n                                        <option value=\"0\">Selecione cidade</option>\r\n                                        <option value=\"3128709\">Guaxupé</option>\r\n                                        <option value=\"3128303\">Guaranésia</option>\r\n                                        <option value=\"3136900\">Juruaia</option>\r\n                                        <option value=\"3144102\">Muzambinho</option>\r\n                                        <option value=\"3163904\">São Pedro da União</option>\r\n                                    </select>\r\n                                    <br><br>\r\n                                    <div class=\"padding\" *ngIf=\"editar == false\">\r\n                                        <button type=\"button\" class=\"btn btn-default btn-info\" (click)=\"saveClient()\">Atualizar endereço</button>\r\n                                    </div>\r\n                                </form>\r\n                            </tab>\r\n                            <tab heading=\"50 ultimos\">\r\n                                <p>Pedido:</p>\r\n                                <p>Data:</p>\r\n                                <p>Produtos:</p>\r\n                            </tab>\r\n                        </tabset>\r\n                    </div><!--/.col-->\r\n                    <div class=\"col-lg-6 padding\" [ngClass]=\"{'col-md-12 col-lg-12': order.type != 0 && order.type != 2, 'col-md-6 col-lg-6': order.type != 1}\">\r\n                        <div class=\"table-responsive\" style=\"height: 160px; overflow: auto\">\r\n                            <table class=\"table scrollbox table-striped\">\r\n                                <thead>\r\n                                <tr class=\"th-table title-table\">\r\n                                    <th>#</th>\r\n                                    <th>Produto</th>\r\n                                    <th>Valor</th>\r\n                                    <th class=\"text-center\">Qtd.</th>\r\n                                    <th>SubTotal</th>\r\n                                    <th></th>\r\n                                </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr *ngFor=\"let i of products.data\">\r\n                                        <td (click)=\"showInformacao(i.id)\" *ngIf=\"i.ativo == 'S'\">{{ i.product.data.id }}</td>\r\n                                        <td (click)=\"showInformacao(i.id)\" *ngIf=\"i.ativo == 'S'\">\r\n                                            {{ i.product.data.name }}\r\n                                            <p *ngFor=\"let c of i.complement.data\" style=\"font-size: 10px; margin-bottom: 0;\"> {{ c.complement.data.name }}: {{ c.price | currency:'BRL':true }}</p>\r\n                                            <p style=\"font-size: 10px; margin-bottom: 0;\">{{ i.historico }}</p>\r\n                                        </td>\r\n                                        <td (click)=\"showInformacao(i.id)\" *ngIf=\"i.ativo == 'S'\">{{ i.product.data.price | currency:'BRL':true}}</td>\r\n                                        <td class=\"text-center\" (click)=\"showInformacao(i.id)\" *ngIf=\"i.ativo == 'S'\">{{ i.qtd }}</td>\r\n                                        <td (click)=\"showInformacao(i.id)\" *ngIf=\"i.ativo == 'S'\">\r\n                                            {{ i.subtotal | currency:'BRL':true }}\r\n                                        </td>\r\n                                        <td class=\"text-center\" *ngIf=\"i.ativo == 'S'\">\r\n                                            <button class=\"btn btn-sm btn-link\" *ngIf=\"i.product.data.id != 58\" (click)=\"removeItem(i.id)\" tooltip=\"Remover do pedido\"><i class=\"fa fa-remove text-danger\"></i></button>\r\n                                            <button class=\"btn btn-sm btn-link\" *ngIf=\"i.product.data.id != 58\" (click)=\"showComplement(i.id)\" tooltip=\"Gerenciar complementos\"><i class=\"fa fa-plus text-info\"></i></button>\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <hr>\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group row\">\r\n                                <label class=\"col-md-3 col-form-label\" for=\"observacao\">Observação</label>\r\n                                <div class=\"col-md-9\">\r\n                                    <textarea id=\"observacao\" name=\"observacao\" rows=\"3\" cols=\"9\" [(ngModel)]=\"order.observacao\" class=\"form-control\" placeholder=\"Observação...\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 text-center alert alert-success total-pagamento\"><p class=\"qtd\">TOTAL: {{ order.total | currency:'BRL':true }}</p></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button *ngIf=\"order.type != 1\" class=\"btn btn-default\" (click)=\"habilitarEdicao()\"><i class=\"fa fa-pencil\"></i> Editar endereço</button>\r\n                    <button class=\"btn btn-primary\" (click)=\"save()\"><i class=\"fa fa-print\"></i> Imprimir (F7)</button>\r\n                    <button class=\"btn btn-success\" (click)=\"update()\"><i class=\"fa fa-save\"></i> Salvar(F9)</button>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Sair (ESC)</button>\r\n                    <button class=\"btn btn-info text-left\" type=\"button\" (click)=\"pagar()\" tooltip=\"Pagamento\"><i class=\"fa fa-money\"></i> Finalizar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n    <div class=\"modal fade modal_novo\" id=\"complement\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\" style=\"\">\r\n        <div class=\"modal-dialog modal-info\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo\">\r\n                    <h5 class=\"modal-title\">Complementos</h5>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"col-md-6\" style=\"height: 400px\">\r\n                        <h5>Lista de adicionais</h5>\r\n                        <div class=\"checkbox\" *ngFor=\"let p of complements.data\">\r\n                            <label>\r\n                                <p class=\"text-left\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                            </label>\r\n                            <button class=\"btn btn-default btn-sm\" (click)=\"addComplement(p.id)\"><i class=\"fa fa-plus text-success\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\" style=\"margin-left: 250px; margin-top: -400px; height: 400px\">\r\n                        <h5>Adcionados ao item</h5>\r\n                        <div class=\"checkbox\" *ngFor=\"let p of complement\">\r\n                            <label>\r\n                                <p class=\"text-left\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                            </label>\r\n\r\n                            <button class=\"btn btn-default btn-sm\" (click)=\"addComplement(p.id)\"><i class=\"fa fa-info text-success\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-info\" (click)=\"saveComplement()\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                        <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"closeComplement()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n    <div class=\"modal fade modal_novo\" id=\"informacao\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\" style=\"\">\r\n        <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo\">\r\n                    <h5 class=\"modal-title\">Observações item</h5>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"card-body\">\r\n                        <div class=\"form-group row\">\r\n                            <div class=\"col-md-12\">\r\n                                <textarea id=\"textarea-input\" name=\"observacao\" [(ngModel)]=\"historico\" rows=\"6\" class=\"form-control\" placeholder=\"Digite aqui...\" ></textarea>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-info\" (click)=\"addHistorico()\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                        <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"closeInformacao()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n    <div class=\"modal fade modal_novo\" id=\"pesquisa\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\">\r\n        <div class=\"modal-dialog modal-sm modal-success\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo text-center\">\r\n                    <h5 class=\"modal-title\">Resultado pesquisa</h5>\r\n                    <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"closeMd()\">\r\n                        <span aria-hidden=\"true\">×</span>\r\n                    </button>\r\n                </div>\r\n                <div class=\"modal-body text-center\" style=\"height: 250px; overflow: auto\">\r\n                    <div class=\"checkbox\" *ngFor=\"let p of result.data\">\r\n                        <label>\r\n                            <p class=\"text-left\" (click)=\"saveItem(p)\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-danger btn-sm text-left\" type=\"button\" (click)=\"closeMd()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n</div>\r\n"

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
            },
            observacao: '',
            type: ''
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
        this.mesa_id = null;
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
        this.historico = '';
        this.idItem = 0;
        this.complements = {};
        this.complement = [{
                "id": 0,
                "name": "Sem complemento",
                "price": 0.0,
                "ativo": "S",
                "created_at": "",
                "updated_at": ""
            }];
        this.typeAnt = '';
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
                }
                _this.typeAnt = _this.order.type;
                _this.products = res.data.items;
                _this.mesa = res.data.mesa.data.name;
                _this.mesa_id = res.data.mesa.data.id;
                _this.hideLoading();
            });
            _this.httpService.setAccessToken();
            _this.httpService.builder()
                .list({}, 'mesas/livres')
                .then(function (res) {
                _this.mesas = res;
            });
        });
        this.httpService.eventEmitter.emit();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
        this.closeComplement();
        this.closeInformacao();
    };
    EditComponent.prototype.update = function () {
        var _this = this;
        this.showLoading();
        var order = {
            'status': this.order.status,
            'mesa_id': this.mesa_id,
            'mesa_id_ant': this.order.mesa.data.id,
            'observacao': this.order.observacao,
            'type': this.order.type,
            'type_ant': this.typeAnt
        };
        this.httpService.builder('order')
            .update(this.order.id, order)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
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
            }
            _this.products = res.data.items;
            _this.mesa = res.data.mesa.data.name;
            _this.mesa_id = res.data.mesa.data.id;
            _this.typeAnt = res.data.type;
            _this.hideLoading();
            _this.toasterService.pop('success', 'Sucesso', 'Pedido ' + _this.order.id + ' com sucesso!');
        });
    };
    EditComponent.prototype.buscar = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.value != 58) {
            this.httpService.setAccessToken();
            this.httpService.builder('search')
                .search(this.pesquisa.value)
                .then(function (res) {
                _this.pesquisa.value = null;
                _this.result = res;
                if (res.data.length > 1) {
                    _this.hideLoading();
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').show().addClass('show').css('z-index', 1050 + 50);
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').css('z-index', 1040);
                }
                else if (res.data.length == 1) {
                    //if (res.data.id === 58) {
                    _this.hideLoading();
                    _this.addItem(res.data[0]);
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
                    //}
                }
            });
        }
        else {
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'Produto não encontrado.');
        }
    };
    EditComponent.prototype.addComplement = function (id) {
        var _this = this;
        this.httpService.builder()
            .view(id, 'complement')
            .then(function (res) {
            var cart = _this.httpService.get();
            if (_this.complement[0].id == 0) {
                _this.complement[0] = res.data;
                _this.complement[0]['complement_id'] = res.data.id;
                _this.complement[0]['qtd'] = 1;
            }
            else {
                var data = res.data;
                data['complement_id'] = res.data.id;
                data['qtd'] = 1;
                _this.complement.push(res.data);
            }
            _this.toasterService.pop('success', 'Sucesso', 'Adicionado complemento ' + res.data.name);
        });
    };
    EditComponent.prototype.saveComplement = function () {
        var _this = this;
        if (this.complement[0].id != 0) {
            var data = {
                'complements': this.complement,
                'order_id': this.order.id,
                'item_id': this.idItem
            };
            this.httpService.builder()
                .insert(data, 'complements/item')
                .then(function (res) {
                _this.httpService.eventEmitter.emit();
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
                }
                _this.products = res.data.items;
                _this.mesa = res.data.mesa.data.name;
                _this.mesa_id = res.data.mesa.data.id;
                _this.complement = [{
                        "id": 0,
                        "name": "Sem complemento",
                        "price": 0.0,
                        "ativo": "S",
                        "created_at": "",
                        "updated_at": ""
                    }];
                _this.closeComplement();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Complementos salvos com sucesso!');
            });
        }
        else {
            this.closeComplement();
            this.hideLoading();
            this.toasterService.pop('error', 'Erro', 'Adicionais não inseridos');
        }
    };
    EditComponent.prototype.addHistorico = function () {
        var _this = this;
        this.showLoading();
        var data = {
            'order_id': this.order.id,
            'item_id': this.idItem,
            'historico': this.historico
        };
        this.httpService.builder('historico')
            .update(this.idItem, data)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
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
            }
            _this.products = res.data.items;
            _this.mesa = res.data.mesa.data.name;
            _this.mesa_id = res.data.mesa.data.id;
            _this.historico = '';
            _this.idItem = 0;
            _this.toasterService.pop('success', 'Sucesso', 'Salvo com sucesso!');
            _this.closeInformacao();
            _this.hideLoading();
        });
    };
    EditComponent.prototype.removeItem = function (i) {
        var _this = this;
        this.showLoading();
        this.httpService.builder('remove/item')
            .delete(i)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
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
            }
            _this.products = res.data.items;
            _this.mesa = res.data.mesa.data.name;
            _this.mesa_id = res.data.mesa.data.id;
            _this.historico = '';
            _this.idItem = 0;
            _this.toasterService.pop('success', 'success', 'Removido com sucesso');
            _this.hideLoading();
        });
    };
    EditComponent.prototype.showInformacao = function (i) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').show().addClass('show').css('z-index', 1050 + 60);
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
        this.idItem = i;
    };
    EditComponent.prototype.showComplement = function (i) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').show().addClass('show').css('z-index', 1050 + 60);
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
        this.getComplements();
        this.idItem = i;
        console.log('index', i);
    };
    EditComponent.prototype.getComplements = function () {
        var _this = this;
        this.httpService.builder()
            .list({}, 'complements')
            .then(function (res) {
            _this.complements = res;
            console.log('complements', res);
        });
    };
    EditComponent.prototype.closeMd = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
    };
    EditComponent.prototype.closeInformacao = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').hide();
    };
    EditComponent.prototype.closeComplement = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').hide();
    };
    EditComponent.prototype.saveItem = function (item) {
        var _this = this;
        this.showLoading();
        this.addItem(item);
        var pedido = {
            items: this.httpService.get().items,
            order_id: this.order.id
        };
        this.httpService.builder()
            .insert(pedido, 'addItem')
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
            _this.httpService.clear();
            _this.order = res.data;
            _this.products = res.data.items;
            _this.imprimir = true;
            _this.hideLoading();
            __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
        });
    };
    EditComponent.prototype.addItem = function (item) {
        this.httpService.addItem(item, this.qtd);
        this.toasterService.pop('success', 'Sucesso', 'Item codigo ' + item.id + ' adicionado.');
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().removeClass('show');
        this.router.navigate(['/orders']);
    };
    EditComponent.prototype.pagar = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').hide();
        this.router.navigate(['/orders/payment/' + this.order.id]);
    };
    EditComponent.prototype.save = function () {
        if (this.imprimir == true) {
            __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').on('show.bs.modal').show().removeClass('show');
            this.router.navigate(['/orders/printer/' + this.order.id + '/N']);
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Para imprimir é necessário ter adicionado novos itens.');
        }
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
            template: __webpack_require__("../../../../../src/app/orders/components/edit.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"new_order\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h5 class=\"modal-title\">Novo Pedido</h5>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"cancel()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body padding\">\r\n                <div class=\"col-md-12\">\r\n                    <form #myForm=\"ngForm\" (keyup.enter)=\"buscar()\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <div class=\"col-md-1\"></div>\r\n                            <label class=\"col-md-1\">Buscar: </label>\r\n                            <input type=\"text\" class=\"form-control col-md-3\" name=\"pesquisa\" [(ngModel)]=\"pesquisa.value\" placeholder=\"Digite produto\" required minlength=\"2\" autofocus=\"autofocus\">\r\n                            <label class=\"label qtd col-md-1\"> Qtd.</label>\r\n                            <input class=\"form-control col-md-1\" type=\"number\" min=\"1\" max=\"10\" name=\"qtd\" [(ngModel)]=\"qtd\" />\r\n                            <label for=\"tipo\" class=\"label col-md-1\">Tipo: </label>\r\n                            <select id=\"tipo\" name=\"tipo\" class=\"form-control col-md-3\" [(ngModel)]=\"tipo\">\r\n                                <option value=\"0\"> Delivery</option>\r\n                                <option value=\"1\"> Salão</option>\r\n                                <option value=\"2\"> Retirada</option>\r\n                            </select>\r\n                            <!--label class=\"label col-md-2\">Mais sabor?</label>\r\n                            <label class=\"switch switch-text switch-success\">\r\n                                <input type=\"checkbox\" class=\"switch-input\" name=\"cartao\" checked>\r\n                                <span class=\"switch-label\" data-on=\"Sim\" data-off=\"Não\"></span>\r\n                                <span class=\"switch-handle\"></span>\r\n                            </label-->\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n\r\n                <div class=\"col-md-12\" style=\"padding-bottom: 5px; padding-top: 5px;\">\r\n                    <form #myForm=\"ngForm\" class=\"form-inline\">\r\n                        <div class=\"form-group col-md-12\">\r\n                            <div class=\"col-md-1\"></div>\r\n                            <div class=\"input-group col-md-5\" *ngIf=\"tipo != 1\">\r\n                                <label>CLiente: </label>\r\n                                <input type=\"text\" class=\"form-control \" name=\"pesquisa\"  placeholder=\"Digite Cliente (Telefone, nome, codigo)\" required minlength=\"11\" [(ngModel)]=\"pesquisa.value2\">\r\n                                <span class=\"input-group-append\">\r\n                                <button type=\"button\" class=\"btn btn-primary\" (click)=\"buscarCliente()\"><i class=\"fa fa-search\"></i> (F2)</button>\r\n                              </span>\r\n                            </div>\r\n                            <label for=\"mesa\" class=\"label col-md-1\" *ngIf=\"tipo == 1\">Mesa: </label>\r\n                            <select id=\"mesa\" name=\"category_id\" class=\"form-control col-md-3\" [(ngModel)]=\"mesa_id\" *ngIf=\"tipo == 1\">\r\n                                <option value=\"null\">Selecione a mesa</option>\r\n                                <option *ngFor=\"let g of mesas\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                                <label class=\"label col-md-1\" *ngIf=\"tipo != 1\">Cartão?</label>\r\n                                <label class=\"switch switch-text switch-success\" *ngIf=\"tipo != 1\">\r\n                                    <input type=\"checkbox\" class=\"switch-input\" name=\"cartao\" [(ngModel)]=\"cartao\" checked>\r\n                                    <span class=\"switch-label\" data-on=\"Sim\" data-off=\"Não\"></span>\r\n                                    <span class=\"switch-handle\"></span>\r\n                                </label>\r\n                                <label for=\"troco\" class=\"label col-md-1\" *ngIf=\"tipo != 1 && cartao == false\">Troco:</label>\r\n                                <input *ngIf=\"tipo != 1 && cartao == false\" type=\"text\" name=\"troco\" class=\"form-control col-md-2\" id=\"troco\" currencyMask [(ngModel)]=\"troco\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\"  placeholder=\"Troco para\" style=\"margin-left: 10px\">\r\n\r\n                                <label for=\"bandeira\" class=\"label col-md-2\" *ngIf=\"cartao == true\">Bandeira:</label>\r\n                                <input *ngIf=\"cartao == true\" type=\"text\" id=\"bandeira\" name=\"bandeira\" [(ngModel)]=\"bandeira\" class=\"form-control col-md-2\" placeholder=\"Bandeira de cartão\" style=\"margin-left: 10px\">\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <div class=\"row borderdiv\">\r\n                    <div class=\"col-md-5 mb-4 padding\" style=\"height: 380px; overflow: auto\" *ngIf=\"tipo != 1\">\r\n                        <!-- Nav tabs -->\r\n                        <tabset>\r\n                            <tab heading=\"Cliente\">\r\n                                <form class=\"form-inline\">\r\n                                    <input type=\"text\" class=\"form-control col-md-12\" name=\"name\" [(ngModel)]=\"client.name\" placeholder=\"Nome Cliente\" [required]=\"true\" minlength=\"8\"/>\r\n                                    <br><br>\r\n                                    <input ngxPhoneMask type=\"text\" class=\"form-control col-md-12\" id=\"fone\" name=\"phone\" [(ngModel)]=\"client.phone\" placeholder=\"Telefone\"/>\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12 \" name=\"email\" [(ngModel)]=\"client.email\" placeholder=\"Email\">\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-12\" name=\"address.address\" [(ngModel)]=\"client.address.address\" placeholder=\"Rua\"/>\r\n                                    <br><br>\r\n                                    <input type=\"text\" class=\"form-control col-md-3\" name=\"address.numero\" [(ngModel)]=\"client.address.numero\" placeholder=\"Numero\">\r\n                                    <div class=\"separate1\"></div>\r\n                                    <input type=\"text\" class=\"form-control col-md-7\" name=\"address.bairro\" [(ngModel)]=\"client.address.bairro\" placeholder=\"Bairro\"/>\r\n                                    <br><br>\r\n                                    <select name=\"cidade\" id=\"cidade\" class=\"form-control col-md-12\" [(ngModel)]=\"client.address.city_id\">\r\n                                        <option value=\"0\">Selecione cidade</option>\r\n                                        <option value=\"3128709\">Guaxupé</option>\r\n                                        <option value=\"3128303\">Guaranésia</option>\r\n                                        <option value=\"3136900\">Juruaia</option>\r\n                                        <option value=\"3144102\">Muzambinho</option>\r\n                                        <option value=\"3163904\">São Pedro da União</option>\r\n                                    </select>\r\n                                    <br><br>\r\n                                    <div class=\"padding\" *ngIf=\"novo == true\">\r\n                                        <button type=\"button\" class=\"btn btn-default btn-info\" (click)=\"saveClient()\">Cadastrar</button>\r\n                                    </div>\r\n                                </form>\r\n                            </tab>\r\n                            <tab heading=\"50 ultimos\" *ngIf=\"novo == false\">\r\n                                <p>Pedido:</p>\r\n                                <p>Data:</p>\r\n                                <p>Produtos:</p>\r\n                            </tab>\r\n                        </tabset>\r\n                    </div><!--/.col-->\r\n                    <div class=\"col-lg-7 padding\" [ngClass]=\"{'col-md-12 col-lg-12': tipo != 0 && tipo != 2, 'col-md-7 col-lg-7': tipo  != 1}\">\r\n                        <div class=\"table-responsive\" style=\"height: 190px; overflow: auto\">\r\n                            <table class=\"table scrollbox table-striped\">\r\n                                <thead>\r\n                                    <tr class=\"th-table title-table\">\r\n                                        <th class=\"text-center\">#</th>\r\n                                        <th>Produto</th>\r\n                                        <th class=\"text-center\">Valor</th>\r\n                                        <th class=\"text-center\">Qtd.</th>\r\n                                        <th class=\"text-center\">Subtotal</th>\r\n                                        <th class=\"text-center\"></th>\r\n                                    </tr>\r\n                                </thead>\r\n                                <tbody>\r\n                                    <tr class=\"th-table\" *ngFor=\"let p of items.items; let i = index\">\r\n                                        <td class=\"text-center\" (click)=\"showObservacao(i)\">{{ p.id }}</td>\r\n                                        <td (click)=\"showObservacao(i)\">{{ p.name }}\r\n                                            <p *ngFor=\"let c of p.complements\" style=\"font-size: 12px; margin-bottom: 0;\"> {{ c.name }}: {{ c.price | currency:'BRL':true }}</p>\r\n                                            <p style=\"font-size: 12px; margin-bottom: 0;\">{{p.historico}}</p>\r\n                                        </td>\r\n                                        <td class=\"text-center\" (click)=\"showObservacao(i)\">{{ p.price | currency:'BRL':true }}</td>\r\n                                        <td class=\"text-center\" (click)=\"showObservacao(i)\">{{ p.qtd }}</td>\r\n                                        <td class=\"text-center\" (click)=\"showObservacao(i)\">{{ p.subtotal | currency:'BRL':true }}</td>\r\n                                        <td class=\"text-center\">\r\n                                            <button class=\"btn btn-sm btn-link\" (click)=\"removeItem(i)\" tooltip=\"Remover do pedido\"><i class=\"fa fa-remove text-danger\"></i></button>\r\n                                            <button class=\"btn btn-sm btn-link\" *ngIf=\"idCom == 0\" (click)=\"showComplement(i)\" tooltip=\"Gerenciar complementos\"><i class=\"fa fa-plus text-info\"></i></button>\r\n                                        </td>\r\n                                    </tr>\r\n                                </tbody>\r\n                            </table>\r\n                        </div>\r\n                        <hr>\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-group row\">\r\n                                <label class=\"col-md-3 col-form-label\" for=\"observacao\">Observação</label>\r\n                                <div class=\"col-md-9\">\r\n                                    <textarea id=\"observacao\" name=\"observacao\" rows=\"3\" cols=\"9\" [(ngModel)]=\"observacao\" class=\"form-control\" placeholder=\"Observação...\"></textarea>\r\n                                </div>\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"col-md-12 text-center alert alert-success total-pagamento\"><p class=\"qtd\">TOTAL: {{ total | currency:'BRL':true }}</p></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                 <div class=\"modal-button\">\r\n                    <button class=\"btn btn-info\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Salvar pedido (F9)</button>\r\n                    <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"cancel()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <div class=\"modal fade modal_novo\" id=\"complement\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\" style=\"\">\r\n        <div class=\"modal-dialog modal-info\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo\">\r\n                    <h5 class=\"modal-title\">Complementos</h5>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"col-md-6\" style=\"height: 400px\">\r\n                            <h5>Lista de adicionais</h5>\r\n                            <div class=\"checkbox\" *ngFor=\"let p of complements.data\">\r\n                                <label>\r\n                                    <p class=\"text-left\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                                </label>\r\n                                <button class=\"btn btn-default btn-sm\" (click)=\"addComplement(p.id)\"><i class=\"fa fa-plus text-success\"></i></button>\r\n                            </div>\r\n                    </div>\r\n                    <div class=\"col-md-6\" style=\"margin-left: 250px; margin-top: -400px; height: 400px\">\r\n                        <h5>Adcionados ao item</h5>\r\n                        <div class=\"checkbox\" *ngFor=\"let p of complement\">\r\n                            <label>\r\n                                <p class=\"text-left\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                            </label>\r\n\r\n                            <button class=\"btn btn-default btn-sm\" (click)=\"addComplement(p.id)\"><i class=\"fa fa-info text-success\"></i></button>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-info\" (click)=\"saveComplement()\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                        <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"closeComplement()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n    <div class=\"modal fade modal_novo\" id=\"informacao\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\" style=\"\">\r\n        <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo\">\r\n                    <h5 class=\"modal-title\">Observações item</h5>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                    <div class=\"card-body\">\r\n                          <div class=\"form-group row\">\r\n                                 <div class=\"col-md-12\">\r\n                                     <textarea id=\"textarea-input\" name=\"observacao\" [(ngModel)]=\"historico\" rows=\"6\" class=\"form-control\" placeholder=\"Digite aqui...\" ></textarea>\r\n                                 </div>\r\n                          </div>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-info\" (click)=\"saveObserve(historico)\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                        <button class=\"btn btn-danger text-left\" type=\"button\" (click)=\"closeInformacao()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n    <div class=\"modal fade modal_novo\" id=\"pesquisa\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\">\r\n        <div class=\"modal-dialog modal-sm modal-success\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo text-center\">\r\n                    <h5 class=\"modal-title\">Resultado pesquisa</h5>\r\n                    <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"closeMd()\">\r\n                        <span aria-hidden=\"true\">×</span>\r\n                    </button>\r\n                </div>\r\n                <div class=\"modal-body text-center\" style=\"height: 250px; overflow: auto\">\r\n                        <div class=\"checkbox\" *ngFor=\"let p of result.data\">\r\n                            <label>\r\n                                <p class=\"text-left\" (click)=\"addItem(p)\"> {{ p.name }} - {{ p.price | currency:'BRL':true}}</p>\r\n                            </label>\r\n                        </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-danger btn-sm text-left\" type=\"button\" (click)=\"closeMd()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n    <div class=\"modal fade modal_novo\" id=\"cliente\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabell\">\r\n        <div class=\"modal-dialog modal-sm modal-danger\" role=\"document\">\r\n            <div class=\"modal-content\">\r\n                <div class=\"modal-header novo text-center\">\r\n                    <h5 class=\"modal-title\">Resultado pesquisa</h5>\r\n                    <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"closeC()\">\r\n                        <span aria-hidden=\"true\">×</span>\r\n                    </button>\r\n                </div>\r\n                <div class=\"modal-body text-center\" style=\"height: 250px; overflow: auto\">\r\n                    <div class=\"checkbox\" *ngFor=\"let p of result.data\">\r\n                        <label>\r\n                            <p class=\"text-left\" (click)=\"addClient(p)\"> {{ p.name }} - {{ p.phone }}</p>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n                <div class=\"modal-footer cadastro\">\r\n                    <div class=\"modal-button\">\r\n                        <button class=\"btn btn-danger btn-sm text-left\" type=\"button\" (click)=\"closeC()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <!-- /.modal-content -->\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n"

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
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.cart = this.httpService.get();
        this.order = {};
        this.client = {
            id: 1,
            name: null,
            phone: null,
            address: {
                address: null,
                numero: null,
                bairro: null,
                city_id: 0
            },
            user: {
                id: 1
            },
            email: null
        };
        this.items = [];
        this.result = [];
        this.qtd = 1;
        this.total = 0;
        this.pesquisa = {
            value: null,
            value2: null
        };
        this.mesa_id = null;
        this.tipo = 0;
        this.novo = true;
        this.cartao = false;
        this.troco = 0;
        this.bandeira = '';
        this.complements = {};
        this.complement = [{
                "id": 0,
                "name": "Sem complemento",
                "price": 0.0,
                "ativo": "S",
                "created_at": "",
                "updated_at": ""
            }];
        this.idItem = 0;
        this.idCom = 0;
        this.historico = '';
        this.observacao = '';
        document.onkeydown = (function (e) {
            if (e.keyCode == 120) {
                _this.save();
            }
            if (e.keyCode == 27) {
                _this.cancel();
            }
            if (e.keyCode == 113) {
                _this.buscarCliente();
            }
        });
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.cart) {
            this.httpService.initCart();
        }
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'mesas/livres')
            .then(function (res) {
            _this.mesas = res.data;
        });
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').show().addClass('show');
        setTimeout(function () {
            _this.hideLoading();
        }, 300);
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#cliente').hide();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').hide();
    };
    NewComponent.prototype.buscarCliente = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.value2 == null) {
            this.httpService.builder().list({}, 'clients')
                .then(function (res) {
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#cliente').show().addClass('show').css('z-index', 1050 + 50);
                __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
                _this.result = res;
                _this.hideLoading();
            });
        }
        else {
            this.httpService.builder('search/client')
                .search(this.pesquisa.value2)
                .then(function (res) {
                if (res.data.length == 0) {
                    _this.client.id = 1;
                    _this.client.name = null;
                    _this.client.phone = null;
                    _this.client.email = null;
                    _this.client.address.address = null;
                    _this.client.address.numero = null;
                    _this.client.address.bairro = null;
                    _this.client.address.city_id = 0;
                    _this.novo = true;
                    _this.toasterService.pop('info', 'Nenhum cliente encontrado, cadastre o cliente');
                }
                else if (res.data.length == 1) {
                    if (_this.client.user) {
                        _this.client.id = res.data[0].id;
                        _this.client.name = res.data[0].name;
                        _this.client.phone = res.data[0].phone;
                        _this.client.email = '';
                        _this.client.address.address = res.data[0].addressClient.data.address;
                        _this.client.address.numero = res.data[0].addressClient.data.numero;
                        _this.client.address.bairro = res.data[0].addressClient.data.bairro;
                        _this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                    }
                    else {
                        _this.client.id = res.data[0].id;
                        _this.client.name = res.data[0].name;
                        _this.client.phone = res.data[0].phone;
                        _this.client.email = '';
                        _this.client.address.address = res.data[0].addressClient.data.address;
                        _this.client.address.numero = res.data[0].addressClient.data.numero;
                        _this.client.address.bairro = res.data[0].addressClient.data.bairro;
                        _this.client.address.city_id = res.data[0].addressClient.data.city.data.id;
                    }
                    _this.novo = false;
                }
                else if (res.data.length > 1) {
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#cliente').show().addClass('show').css('z-index', 1050 + 50);
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
                    _this.result = res;
                }
                _this.hideLoading();
            });
        }
    };
    NewComponent.prototype.addClient = function (c) {
        if (c.user) {
            this.client.id = c.id;
            this.client.name = c.name;
            this.client.phone = c.phone;
            this.client.email = c.user.data.email;
            this.client.user.id = c.user.data.id;
            this.client.address.address = c.addressClient.data.address;
            this.client.address.numero = c.addressClient.data.numero;
            this.client.address.bairro = c.addressClient.data.bairro;
            this.client.address.city_id = c.addressClient.data.city.data.id;
        }
        else {
            this.client.id = c.id;
            this.client.name = c.name;
            this.client.phone = c.phone;
            this.client.email = '';
            this.client.address.address = c.addressClient.data.address;
            this.client.address.numero = c.addressClient.data.numero;
            this.client.address.bairro = c.addressClient.data.bairro;
            this.client.address.city_id = c.addressClient.data.city.data.id;
        }
        this.novo = false;
        this.pesquisa.value2 = null;
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#cliente').hide();
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
            _this.result = res;
            _this.hideLoading();
            if (res.data.length == 0 || res.data[0].id == 58) {
                _this.toasterService.pop('error', 'Atenção', 'Item não localizado');
            }
            else {
                if (res.data.length > 1) {
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').show().addClass('show').css('z-index', 1050 + 50);
                    __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
                }
                else {
                    if (res.data.length === 1) {
                        _this.addItem(_this.result["data"][0]);
                        _this.total = _this.httpService.get().total;
                        _this.items = _this.httpService.get();
                        _this.qtd = 1;
                    }
                }
            }
        });
    };
    NewComponent.prototype.addItem = function (item) {
        this.httpService.addItem(item, this.qtd);
        this.items = this.httpService.get();
        this.total = this.httpService.get().total;
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
        this.toasterService.pop('success', 'Sucesso', 'Item ' + item.name + ' adicionado.');
    };
    NewComponent.prototype.saveObserve = function (o) {
        this.httpService.obs(o, this.idItem);
        this.items = this.httpService.get();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').hide();
        this.toasterService.pop('success', 'Sucesso', 'Observção salva');
    };
    NewComponent.prototype.removeItem = function (i) {
        this.httpService.removeItem(i);
        this.total = this.httpService.get().total;
        this.items = this.httpService.get();
        this.complement = [{
                "id": 0,
                "name": "Sem complemento",
                "price": 0.0,
                "ativo": "S",
                "created_at": "",
                "updated_at": ""
            }];
        this.toasterService.pop('info', 'Informação', 'Item removido.');
    };
    NewComponent.prototype.save = function () {
        var _this = this;
        var card = '';
        var bandeira = '';
        var pedido = {};
        if (this.tipo != 1) {
            this.mesa_id = 1;
        }
        if (this.tipo != 1 && this.novo == true) {
            this.toasterService.pop('error', 'É necessário cadastrar um cliente ou selecionar');
        }
        else {
            if (this.mesa_id != null) {
                var troco = null;
                if (this.cartao == false) {
                    card = 'Não';
                }
                else {
                    card = 'Sim ';
                    bandeira = '- Bandeira do cartão:' + this.bandeira;
                }
                if (this.troco > 0) {
                    troco = 'Troco para: ' + this.troco + ',00 reais';
                }
                else {
                    troco = '';
                    bandeira = '';
                }
                this.showLoading();
                this.httpService.setAccessToken();
                if (this.httpService.get().items.length > 0) {
                    pedido = {
                        items: this.httpService.get().items,
                        total: this.httpService.get().total,
                        mesa_id: this.mesa_id,
                        client_id: this.client.id,
                        type: this.tipo,
                        cartao: card + bandeira,
                        troco: troco,
                        observacao: this.observacao
                    };
                    this.httpService.setAccessToken();
                    this.httpService.builder()
                        .insert(pedido, 'order')
                        .then(function (res) {
                        _this.httpService.clear();
                        _this.httpService.eventEmitter.emit();
                        _this.hideLoading();
                        _this.toasterService.pop('success', 'Sucesso', 'Pedido ' + res.data.id + ' salvo com sucesso');
                        _this.close(res.data.id);
                    });
                }
                else {
                    this.hideLoading();
                    this.toasterService.pop('error', 'Erro', 'É necessário adicionar ao menos um produto');
                }
            }
            else {
                this.toasterService.pop('error', 'Erro', 'É necessário escolher uma mesa');
            }
        }
    };
    NewComponent.prototype.saveClient = function () {
        var _this = this;
        if (this.client.name == null || this.client.phone == null) {
            this.toasterService.pop('error', 'Verifique nome e telefone do cliente');
        }
        else if (this.client.address.address == null || this.client.address.bairro == null || this.client.address.numero == null) {
            this.toasterService.pop('error', 'Campos do endereço vazio, verifique');
        }
        else if (this.client.address.city_id == 0) {
            this.toasterService.pop('error', 'Selecione uma cidade');
        }
        else {
            this.client.id = null;
            this.httpService.builder()
                .insert(this.client, 'client')
                .then(function (res) {
                console.log(res);
                _this.client.id = res.data.id;
                _this.client.name = res.data.name;
                _this.client.phone = res.data.phone;
                _this.client.email = res.data.email;
                _this.client.address.address = res.data.addressClient.data.address;
                _this.client.address.numero = res.data.addressClient.data.numero;
                _this.client.address.bairro = res.data.addressClient.data.bairro;
                _this.client.address.city_id = res.data.addressClient.data.city.data.id;
                _this.novo = false;
                _this.toasterService.pop('success', 'Cliente ' + _this.client.name + ' cadastrado com sucesso, codigo:' + _this.client.id);
            });
        }
    };
    NewComponent.prototype.close = function (id) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').hide();
        this.router.navigate(['/orders/printer/' + id + '/S']);
    };
    NewComponent.prototype.cancel = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').hide();
        this.router.navigate(['/orders']);
    };
    NewComponent.prototype.showComplement = function (i) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').show().addClass('show').css('z-index', 1050 + 60);
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
        this.getComplements();
        this.idItem = i;
        console.log('index', i);
    };
    NewComponent.prototype.showObservacao = function (i) {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').show().addClass('show').css('z-index', 1050 + 60);
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#new_order').css('z-index', 1040);
        this.idItem = i;
    };
    NewComponent.prototype.getComplements = function () {
        var _this = this;
        this.httpService.builder()
            .list({}, 'complements')
            .then(function (res) {
            _this.complements = res;
            console.log('complements', res);
        });
    };
    NewComponent.prototype.addComplement = function (id) {
        var _this = this;
        this.httpService.builder()
            .view(id, 'complement')
            .then(function (res) {
            var cart = _this.httpService.get();
            if (_this.complement[0].id == 0) {
                _this.complement[0] = res.data;
            }
            else {
                _this.complement.push(res.data);
            }
            _this.toasterService.pop('success', 'Sucesso', 'Adicionado complemento ' + res.data.name);
        });
    };
    NewComponent.prototype.saveComplement = function () {
        if (this.complement[0].id != 0) {
            this.httpService.addComplement(this.complement, this.idItem);
            this.items = this.httpService.get();
            this.total = this.httpService.get().total;
            this.complement = [{
                    "id": 0,
                    "name": "Sem complemento",
                    "price": 0.0,
                    "ativo": "S",
                    "created_at": "",
                    "updated_at": ""
                }];
            this.closeComplement();
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Adicionais não inseridos');
        }
    };
    NewComponent.prototype.closeComplement = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#complement').hide();
    };
    NewComponent.prototype.closeInformacao = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#informacao').hide();
    };
    NewComponent.prototype.closeMd = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#pesquisa').hide();
    };
    NewComponent.prototype.closeC = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#cliente').hide();
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

/***/ "../../../../../src/app/orders/components/orders-close.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar </button>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">Status</th>\n                    <th class=\"title text-center\">Tipo</th>\n                    <th class=\"title text-center\">Codigo</th>\n                    <th class=\"title-table text-center\"> Total</th>\n                    <th class=\"title\"> Cliente</th>\n                    <th class=\"title text-center\">Data</th>\n                    <th class=\"title text-center\">Hora</th>\n                    <th class=\"title text-center\">Previsão</th>\n                    <th class=\"title text-center\">Mesa</th>\n                    <th class=\"title text-center\">Ações</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"10\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of orders.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <span class=\"badge badge-success\" *ngIf=\"o.status === 3\" tooltip=\"Pagamento realizado\"> Pago</span>\n                      <span class=\"badge badge-info\" *ngIf=\"o.status === 2\" tooltip=\"Em transito\">Em transito</span>\n                      <span class=\"badge badge-primary\" *ngIf=\"o.status === 1\" tooltip=\"Preparado\">Preparado</span>\n                      <span class=\"badge badge-danger\" *ngIf=\"o.status === 0\" tooltip=\"Na cozinha\">Cozinha</span>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <i class=\"fa fa-motorcycle\" *ngIf=\"o.type == 0\" tooltip=\"Delivery\"></i>\n                      <i class=\"fa fa-upload\" *ngIf=\"o.type == 2\" tooltip=\"Retirada\"></i>\n                      <i class=\"fa fa fa-cutlery\" *ngIf=\"o.type == 1\" tooltip=\"Mesa\"></i>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.id }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.total | currency:'BRL':true }}</td>\n                    <td *ngIf=\"tamanho > 0\">{{ o.client.data.name }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:0:10 }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:11:19}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.previsao }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.mesa.data.name }} </td>\n                    <td class=\"text-center\">\n                      <a class=\"btn btn-link text-alert pagamento\" *ngIf=\"o.status == 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Ver pagamentos\"><i class=\"fa fa-money\"></i></a>\n                      <a class=\"btn btn-link text-success pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Pagar pedido\"><i class=\"fa fa-dollar\"></i></a>\n                      <a class=\"btn btn-link pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['printer/'+ o.id]+'/S'\" tooltip=\"Imprimir pedido\"><i class=\"fa fa-print\"></i></a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n </div>\n\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">De</label>\n        <input type=\"date\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n\n        <label for=\"fim\">Até</label>\n        <input type=\"date\" id=\"fim\" class=\"form-control\" name=\"fim\" [(ngModel)]=\"pesquisa.fim\" required>\n        <label class=\"col-form-label\" for=\"select\">Status</label>\n        <select name=\"status\" class=\"form-control\" id=\"select\" [(ngModel)]=\"pesquisa.status\" required>\n          <option value=\"null\">Selecione o status</option>\n          <option value=\"0\">Pendentes</option>\n          <option value=\"1\">Em preparo</option>\n          <option value=\"2\">Entrega</option>\n          <option value=\"3\">Fechado</option>\n        </select>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar()\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/orders/components/orders-close.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrdersCloseComponent; });
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
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(function () {
            _this.httpService.builder().list({}, 'orders')
                .then(function (res) {
                _this.orders = res;
                _this.tamanho = res.data.length;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    OrdersCloseComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/orders/edit/' + id]);
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
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null && this.pesquisa.status !== null) {
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
        else {
            this.toasterService.pop('error', 'Erro', 'Preencha inicio, fim e status para pesquisar.');
            this.hideLoading();
        }
    };
    OrdersCloseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/orders-close.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */]) === "function" && _c || Object])
    ], OrdersCloseComponent);
    return OrdersCloseComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=orders-close.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/orders.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar </button>\n              <a class=\"btn btn-success\" [routerLink]=\"['new']\"><i class=\"fa fa-plus\"></i> Novo</a>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">Status</th>\n                    <th class=\"title text-center\">Tipo</th>\n                    <th class=\"title text-center\">Codigo</th>\n                    <th class=\"title-table text-center\"> Total</th>\n                    <th class=\"title\"> Cliente</th>\n                    <th class=\"title text-center\">Data</th>\n                    <th class=\"title text-center\">Hora</th>\n                    <th class=\"title text-center\">Previsão</th>\n                    <th class=\"title text-center\">Mesa</th>\n                    <th class=\"title text-center\">Ações</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"10\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of orders.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <span class=\"badge badge-success\" *ngIf=\"o.status === 4\" tooltip=\"Pagamento parcial\"> Pago parcial</span>\n                      <span class=\"badge badge-success\" *ngIf=\"o.status === 3\" tooltip=\"Pagamento realizado\"> Pago</span>\n                      <span class=\"badge badge-info\" *ngIf=\"o.status === 2\" tooltip=\"Em transito\"> Em transito</span>\n                      <span class=\"badge badge-primary\" *ngIf=\"o.status === 1\" tooltip=\"Preparado\"> Preparado</span>\n                      <span class=\"badge badge-danger\" *ngIf=\"o.status === 0\" tooltip=\"Na cozinha\"> Cozinha</span>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <i class=\"fa fa-motorcycle\" *ngIf=\"o.type == 0\" tooltip=\"Delivery\"></i>\n                      <i class=\"fa fa-upload\" *ngIf=\"o.type == 2\" tooltip=\"Retirada\"></i>\n                      <i class=\"fa fa fa-cutlery\" *ngIf=\"o.type == 1\" tooltip=\"Mesa\"></i>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.id }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.total | currency:'BRL':true }}</td>\n                    <td class=\"text-capitalize\" *ngIf=\"tamanho > 0\">{{ o.client.data.name }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:0:10 }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at | slice:11:19}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.previsao }} </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.mesa.data.name }} </td>\n\n                    <td class=\"text-center\">\n                      <a class=\"btn btn-link text-alert pagamento\" *ngIf=\"o.status == 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Ver pagamentos\"><i class=\"fa fa-money\"></i></a>\n                      <a class=\"btn btn-link text-success pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['payment/'+ o.id]\" tooltip=\"Pagar pedido\"><i class=\"fa fa-dollar\"></i></a>\n                      <a class=\"btn btn-link pagamento\" *ngIf=\"o.status != 3\" [routerLink]=\"['printer/'+ o.id]+'/S'\" tooltip=\"Imprimir pedido\"><i class=\"fa fa-print\"></i></a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n              <p class=\"text-right\">Quantidade de pedidos: {{ orders.data.length }}</p>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n </div>\n\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">De</label>\n        <input type=\"date\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n\n        <label for=\"fim\">Até</label>\n        <input type=\"date\" id=\"fim\" class=\"form-control\" name=\"fim\" [(ngModel)]=\"pesquisa.fim\" required>\n        <label class=\"col-form-label\" for=\"select\">Status</label>\n        <select name=\"status\" class=\"form-control\" id=\"select\" [(ngModel)]=\"pesquisa.status\" required>\n          <option value=\"null\">Selecione o status</option>\n          <option value=\"0\">Pendentes</option>\n          <option value=\"1\">Em preparo</option>\n          <option value=\"2\">Entrega</option>\n          <option value=\"3\">Fechado</option>\n        </select>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar()\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<router-outlet></router-outlet>\n\n"

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
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.toasterService = toasterService;
        this.cor = false;
        this.total = 0;
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
    OrdersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(function () {
            _this.httpService.builder().list({}, 'orders')
                .then(function (res) {
                _this.orders = res;
                for (var i = 0; i < _this.orders.data.length; i++) {
                    _this.total = _this.total + _this.orders.data[i].total;
                }
                _this.tamanho = res.data.length;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    OrdersComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/orders/edit/' + id]);
    };
    OrdersComponent.prototype.new = function () {
        return this.router.navigate(['/orders/new']);
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
    OrdersComponent.prototype.pesquisar = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null && this.pesquisa.status !== null) {
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
        else {
            this.toasterService.pop('error', 'Erro', 'Preencha inicio, fim e status para pesquisar.');
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

/***/ "../../../../../src/app/orders/components/payment.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"payment\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: block; overflow-y: auto;\">\r\n    <div class=\"modal-dialog modal-lg modal-primary\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header novo\">\r\n                <h3 class=\"text-center\">Pedido: {{ order.id }} </h3>\r\n                <h3 class=\"text-center\"> {{ mesa }} </h3>\r\n                <h3 class=\"text-center\"> Total: {{ order.total | currency:'BRL':true}}</h3>\r\n            </div>\r\n            <div class=\"modal-body\" style=\"height: 520px; overflow: auto\">\r\n                <div class=\"col-md-12\">\r\n                    <form class=\"form-inline\" #myForm=\"ngForm\">\r\n                        <div class=\"col-md-12\">\r\n                            <div class=\"form-row\">\r\n                                <label class=\"col-md-2\" for=\"valor_pag\">Valor: </label>\r\n                                <input type=\"text\" class=\"form-control-lg col-md-4\" id=\"valor_pag\" name=\"valor_pag\"\r\n                                       currencyMask [(ngModel)]=\"valor_pag\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\"\r\n                                       placeholder=\"Digite o valor\" required minlength=\"2\" autofocus=\"autofocus\">\r\n                                <div class=\"invalid-feedback\" *ngIf=\"!valor_pag.valid\">\r\n                                    Prencha o valor do pagamento\r\n                                </div>\r\n                                <label for=\"desconto\" class=\"col-md-2\">Desconto:</label>\r\n                                <input class=\"form-control-lg col-md-4\" id=\"desconto\" name=\"desconto\" currencyMask [(ngModel)]=\"payment.desconto\"  [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" placeholder=\"Desconto\" type=\"text\">\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"form-row\">\r\n                                <label for=\"desconto\" class=\"col-md-2\">Acrescimo:</label>\r\n                                <input class=\"form-control-lg col-md-4\" id=\"acrescimo\" name=\"acrescimo\" currencyMask [(ngModel)]=\"payment.acrescimo\"  [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" placeholder=\"Acrescimos\" type=\"text\">\r\n                                <label for=\"troco\" class=\"col-md-2\">Troco:</label>\r\n                                <input class=\"form-control-lg col-md-4 troco\" id=\"troco\" name=\"troco\" [(ngModel)]=\"troco\"  value=\"{{ valor_pag - ((total + payment.acrescimo) - payment.desconto) | currency:'BRL':true }}\" placeholder=\"Troco\" type=\"text\" disabled=\"true\">\r\n                            </div>\r\n                            <br>\r\n                            <div class=\"form-row\">\r\n                                    <label for=\"select\" class=\"label col-md-2\">Tipo pagamento</label>\r\n                                    <select id=\"select\" name=\"type_id\" [(ngModel)]=\"type_id\" class=\"form-control-lg col-md-4\" style=\"height: 50px ;font-size: 16px;\">\r\n                                        <option value=\"null\">Selecione tipo pagamento</option>\r\n                                        <option *ngFor=\"let g of tipo.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                                    </select>\r\n                                    <label for=\"troco\" class=\"col-md-1\">Divisão:</label>\r\n                                    <input class=\"form-control-lg col-md-1 troco\" id=\"divisao\" name=\"divisao\" [(ngModel)]=\"divisao\"  placeholder=\"Dividir\" type=\"number\">\r\n                                    <label for=\"troco\" class=\"col-md-2\">Resultado:</label>\r\n                                    <input class=\"form-control-lg col-md-2 troco\" id=\"result_div\" name=\"result_div\" [(ngModel)]=\"result_div\"  value=\"{{ ((total + payment.acrescimo) - payment.desconto) / divisao | currency:'BRL':true }}\" placeholder=\"resulado\" type=\"text\">\r\n                            </div>\r\n                        </div>\r\n                    </form>\r\n                </div>\r\n                <br>\r\n                <div class=\"col-md-12\" *ngIf=\"order.payment\">\r\n                    <div class=\"table-responsive\" style=\"height: 110px; overflow: auto\">\r\n                        <table class=\"table scrollbox table-striped\">\r\n                            <thead>\r\n                            <tr class=\"th-table title-table\">\r\n                                <th class=\"text-center\">Vr.Pago</th>\r\n                                <th>Desconto</th>\r\n                                <th class=\"text-center\">Acrescimo</th>\r\n                                <th class=\"text-center\">Total</th>\r\n                                <th class=\"text-center\">Tipo</th>\r\n                                <th class=\"text-center\">Data</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr class=\"th-table\" *ngFor=\"let p of order.payment.data; let i = index\">\r\n                                <td class=\"text-center\">{{ p.total_pago | currency:'BRL':true }}</td>\r\n                                <td>{{ p.desconto | currency:'BRL':true }}</td>\r\n                                <td class=\"text-center\">{{ p.acrescimo | currency:'BRL':true }}</td>\r\n                                <td class=\"text-center\">{{ order.total | currency:'BRL':true }}</td>\r\n                                <td class=\"text-center\">{{ p.type.data.name }}</td>\r\n                                <td class=\"text-center\">{{ p.created_at }}</td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n                <div class=\"col-md-12 text-center alert alert-success total-pagamento\"><h4 class=\"qtd\">TOTAL À PAGAR: {{ total | currency:'BRL':true }}</h4></div>\r\n                <div class=\"col-md-12\">\r\n                    <div class=\"table-responsive\" style=\"height: 100px; overflow: auto\">\r\n                        <table class=\"table scrollbox table-striped\">\r\n                            <thead>\r\n                            <tr class=\"th-table title-table\">\r\n                                <th class=\"text-center\">#</th>\r\n                                <th>Produto</th>\r\n                                <th class=\"text-center\">Valor</th>\r\n                                <th class=\"text-center\">Qtd.</th>\r\n                                <th class=\"text-center\">Subtotal</th>\r\n                            </tr>\r\n                            </thead>\r\n                            <tbody>\r\n                            <tr class=\"th-table\" *ngFor=\"let p of products.data; let i = index\">\r\n                                <td class=\"text-center\">{{ p.product.data.id }}</td>\r\n                                <td>{{ p.product.data.name }}\r\n                                    <p *ngFor=\"let c of p.complement.data\" style=\"font-size: 10px; margin-bottom: 0;\"> {{ c.complement.data.name }}: {{ c.price | currency:'BRL':true }}</p>\r\n                                    <p style=\"font-size: 10px; margin-bottom: 0;\">{{ p.historico }}</p>\r\n                                </td>\r\n                                <td class=\"text-center\">{{ p.price | currency:'BRL':true }}</td>\r\n                                <td class=\"text-center\">{{ p.qtd }}</td>\r\n                                <td class=\"text-center\">{{ p.subtotal | currency:'BRL':true }}</td>\r\n                            </tr>\r\n                            </tbody>\r\n                        </table>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"modal-footer novo\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-sm btn-danger text-left\" type=\"button\" (click)=\"close()\" [disabled]=\"total < order.total\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-sm btn-primary text-left\" type=\"button\" (click)=\"edit()\"><i class=\"fa fa-pencil\"></i> Editar</button>\r\n                    <button class=\"btn btn-sm btn-success\" (click)=\"save()\"><i class=\"fa fa-save\"></i> Salvar (F9)</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/orders/components/payment.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentComponent; });
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
            'total_realizado': 0,
            'payment_types_id': 1
        };
        this.troco = 0;
        this.tipo = {};
        this.valor_pag = 0;
        this.divisao = 1;
        this.result_div = 0;
        document.onkeydown = (function (e) {
            if (e.keyCode == 120) {
                _this.save();
            }
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
                _this.total = res.data.total;
                console.log(res.data.payment.data);
                for (var i = 0; i < res.data.payment.data.length; i++) {
                    _this.total -= res.data.payment.data[i].total_pago;
                }
                _this.payment.order_id = _this.order.id;
                _this.products = res.data.items;
                _this.mesa = res.data.mesa.data.name;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    PaymentComponent.prototype.save = function () {
        var _this = this;
        this.showLoading();
        console.log('troco', this.troco);
        if (this.valor_pag >= this.total) {
            this.payment.total_pago = (this.valor_pag - (this.valor_pag - ((this.total + this.payment.acrescimo) - this.payment.desconto)));
            this.payment.total_original = this.order.total;
            this.payment.payment_types_id = this.type_id;
            this.httpService.setAccessToken();
            if (this.type_id !== null) {
                this.httpService.builder()
                    .insert(this.payment, 'payment')
                    .then(function (res) {
                    _this.httpService.eventEmitter.emit();
                    _this.payment.total_realizado = _this.payment.total_pago;
                    _this.valor_pag = 0;
                    _this.hideLoading();
                    _this.toasterService.pop('success', 'Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso');
                    _this.close();
                });
            }
            else {
                this.hideLoading();
                this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');
            }
        }
        else if (this.valor_pag + this.payment.desconto >= this.total) {
            this.payment.total_pago = (this.valor_pag - this.troco);
            this.payment.total_original = this.order.total;
            this.payment.payment_types_id = this.type_id;
            this.httpService.setAccessToken();
            if (this.type_id !== null) {
                this.httpService.builder()
                    .insert(this.payment, 'payment')
                    .then(function (res) {
                    _this.httpService.eventEmitter.emit();
                    _this.valor_pag = 0;
                    _this.hideLoading();
                    _this.toasterService.pop('success', 'Sucesso', 'Pagamento do pedido ' + res.data.id + ' realizado com sucesso');
                    _this.close();
                });
            }
            else {
                this.hideLoading();
                this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');
            }
        }
        else if ((this.valor_pag + this.payment.desconto) < this.total) {
            this.payment.total_pago = (this.valor_pag - this.troco);
            this.payment.total_original = this.order.total;
            this.payment.payment_types_id = this.type_id;
            this.httpService.setAccessToken();
            if (this.type_id !== null) {
                this.httpService.builder()
                    .insert(this.payment, 'payment')
                    .then(function (res) {
                    _this.httpService.eventEmitter.emit();
                    _this.order = res.data;
                    _this.valor_pag = 0;
                    for (var i = 0; i < res.data.payment.data.length; i++) {
                        _this.total -= res.data.payment.data[i].total_pago;
                    }
                    _this.hideLoading();
                    _this.toasterService.pop('success', 'Sucesso', 'Pagamento parcial ' + res.data.id + ' realizado com sucesso');
                });
            }
            else {
                this.hideLoading();
                this.toasterService.pop('error', 'Erro', 'Tipo pagamento não selecionado');
            }
        }
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
        this.router.navigate(['/orders']);
    };
    PaymentComponent.prototype.edit = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#payment').hide();
        this.router.navigate(['/orders/edit/' + this.order.id]);
    };
    PaymentComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    PaymentComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    PaymentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/payment.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], PaymentComponent);
    return PaymentComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=payment.component.js.map

/***/ }),

/***/ "../../../../../src/app/orders/components/printer.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade modal_novo\" id=\"printer\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\">\r\n    <div class=\"modal-dialog modal-lg modal-default\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-body\" style=\"height: 530px\">\r\n                <div *ngIf=\"innerHtml\"\r\n                     [innerHTML]=\"innerHtml\">\r\n                </div>\r\n            </div>\r\n\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/orders/components/printer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
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
                url = 'printer/new';
            }
            _this.httpService.builder().view(params['id'], url)
                .then(function (res) {
                _this.innerHtml = _this.sanitizer.bypassSecurityTrustHtml("<object data='" + res.data.link_printer + "' name='my_iframe' onload='window.option();window.print();window.close()' type='application/pdf' height='500' width='780' class='embed-responsive-item'>" +
                    "Object " + res.data.link_printer + " failed" +
                    "</object>");
                _this.link_printer = 'http://108.61.155.169' + res.data.link_printer;
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
        this.router.navigate(['/orders']);
    };
    PrinterComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").hide();
    };
    PrinterComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").show();
    };
    PrinterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/orders/components/printer.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_orders_service__["a" /* OrdersService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_orders_service__["a" /* OrdersService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object])
    ], PrinterComponent);
    return PrinterComponent;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=printer.component.js.map

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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_payment_component__ = __webpack_require__("../../../../../src/app/orders/components/payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_printer_component__ = __webpack_require__("../../../../../src/app/orders/components/printer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_complement_component__ = __webpack_require__("../../../../../src/app/orders/components/complement.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_orders_close_component__ = __webpack_require__("../../../../../src/app/orders/components/orders-close.component.ts");
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
                path: 'printer/:id/:i',
                component: __WEBPACK_IMPORTED_MODULE_6__components_printer_component__["a" /* PrinterComponent */],
                data: {
                    title: 'Printer'
                }
            },
            {
                path: 'new',
                component: __WEBPACK_IMPORTED_MODULE_4__components_new_component__["a" /* NewComponent */],
                data: {
                    title: 'Novo'
                },
                children: [
                    {
                        path: 'component/:id',
                        component: __WEBPACK_IMPORTED_MODULE_7__components_complement_component__["a" /* ComplementComponent */],
                        data: {
                            title: 'Component'
                        }
                    }
                ]
            },
            {
                path: 'payment/:id',
                component: __WEBPACK_IMPORTED_MODULE_5__components_payment_component__["a" /* PaymentComponent */],
                data: {
                    title: 'Editar'
                }
            }
        ]
    },
    {
        path: "orders/close",
        component: __WEBPACK_IMPORTED_MODULE_8__components_orders_close_component__["a" /* OrdersCloseComponent */],
        data: {
            title: 'Pedidos fechados'
        }
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_payment_component__ = __webpack_require__("../../../../../src/app/orders/components/payment.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__orders_routing_module__ = __webpack_require__("../../../../../src/app/orders/orders-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_orders_service__ = __webpack_require__("../../../../../src/app/orders/services/orders.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_cuppa_ng2_grid_cuppa_ng2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_ngx_phone_mask__ = __webpack_require__("../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_printer_component__ = __webpack_require__("../../../../../src/app/orders/components/printer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_complement_component__ = __webpack_require__("../../../../../src/app/orders/components/complement.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_orders_close_component__ = __webpack_require__("../../../../../src/app/orders/components/orders-close.component.ts");
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
                __WEBPACK_IMPORTED_MODULE_10__orders_routing_module__["a" /* OrdersRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap__["b" /* TooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_13_cuppa_ng2_grid_cuppa_ng2_dataGrid__["a" /* CuppaDataGridModule */],
                __WEBPACK_IMPORTED_MODULE_14_ngx_bootstrap_tabs__["a" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_15_ng2_currency_mask__["CurrencyMaskModule"],
                __WEBPACK_IMPORTED_MODULE_16_ngx_phone_mask__["a" /* NgxPhoneMaskModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__components_orders_component__["a" /* OrdersComponent */], __WEBPACK_IMPORTED_MODULE_7__components_edit_component__["a" /* EditComponent */], __WEBPACK_IMPORTED_MODULE_8__components_new_component__["a" /* NewComponent */], __WEBPACK_IMPORTED_MODULE_9__components_payment_component__["a" /* PaymentComponent */], __WEBPACK_IMPORTED_MODULE_17__components_printer_component__["a" /* PrinterComponent */], __WEBPACK_IMPORTED_MODULE_18__components_complement_component__["a" /* ComplementComponent */], __WEBPACK_IMPORTED_MODULE_19__components_orders_close_component__["a" /* OrdersCloseComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_12__services_orders_service__["a" /* OrdersService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */]]
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
        for (var j in complement) {
            complement[j].complement_id = complement[j].id;
            complement[j].qtd = 1;
            valor = valor + complement[j].price;
        }
        itemAux.subtotal += valor;
        itemAux.complements = complement;
        cart.total = this.getTotal(cart.items);
        localStorage.setItem(this.key, JSON.stringify(cart));
    };
    OrdersService.prototype.obs = function (o, i) {
        var cart = this.get(), itemAux = cart.items[i];
        itemAux.historico = o;
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