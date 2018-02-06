webpackJsonp(["clients.module"],{

/***/ "../../../../../src/app/cadastro/clients/clients-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_clients_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/clients.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_new_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_edit_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_clients_component__["a" /* ClientsComponent */],
        data: {
            title: 'Clientes'
        },
        children: [
            {
                path: 'new',
                component: __WEBPACK_IMPORTED_MODULE_3__components_new_component__["a" /* NewComponent */],
                data: {
                    title: 'Novo'
                }
            },
            {
                path: 'edit/:id',
                component: __WEBPACK_IMPORTED_MODULE_4__components_edit_component__["a" /* EditComponent */],
                data: {
                    title: 'Editar'
                }
            }
        ]
    }
];
var ClientsRoutingModule = (function () {
    function ClientsRoutingModule() {
    }
    ClientsRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], ClientsRoutingModule);
    return ClientsRoutingModule;
}());

//# sourceMappingURL=clients-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/clients.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientsModule", function() { return ClientsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_clients_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/clients.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_new_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_edit_component__ = __webpack_require__("../../../../../src/app/cadastro/clients/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__clients_routing_module__ = __webpack_require__("../../../../../src/app/cadastro/clients/clients-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_clients_service__ = __webpack_require__("../../../../../src/app/cadastro/clients/services/clients.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_phone_mask__ = __webpack_require__("../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var ClientsModule = (function () {
    function ClientsModule() {
    }
    ClientsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_8__clients_routing_module__["a" /* ClientsRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__["CurrencyMaskModule"],
                __WEBPACK_IMPORTED_MODULE_11_ngx_phone_mask__["a" /* NgxPhoneMaskModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__components_clients_component__["a" /* ClientsComponent */], __WEBPACK_IMPORTED_MODULE_6__components_new_component__["a" /* NewComponent */], __WEBPACK_IMPORTED_MODULE_7__components_edit_component__["a" /* EditComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_9__services_clients_service__["a" /* ClientsService */]]
        })
    ], ClientsModule);
    return ClientsModule;
}());

//# sourceMappingURL=clients.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/clients.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n              <button class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar</button>\n              <a class=\"btn btn-success\" [routerLink]=\"['new']\"><i class=\"fa fa-plus\"></i> Novo</a>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">#</th>\n                    <th class=\"title\">Cliente</th>\n                    <th class=\"title text-center\">Telefone</th>\n                    <th>Endereço</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"5\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of clients.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\">{{ o.id }}</td>\n                    <td>{{ o.name | slice:0:35 }}</td>\n                    <td>{{ o.phone | slice:0:85 }}</td>\n                    <td>{{ o.endereco}}</td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n</div>\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">Descrição:</label>\n        <input type=\"text\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar(pesquisa)\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/clients.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_clients_service__ = __webpack_require__("../../../../../src/app/cadastro/clients/services/clients.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ClientsComponent = (function () {
    function ClientsComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.cor = false;
        this.pesquisa = {
            inicio: null,
            fim: null,
            status: null
        };
        this.clients = {};
        this.tamanho = 0;
    }
    ClientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(function () {
            _this.httpService.builder().list({}, 'clients')
                .then(function (res) {
                _this.clients = res;
                _this.tamanho = res.data.length;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    ClientsComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/cadastro/clients/edit/' + id]);
    };
    ClientsComponent.prototype.showModal = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".modal").show().addClass('show');
    };
    ClientsComponent.prototype.hideModal = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".modal").hide();
    };
    ClientsComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".container-loading").hide();
    };
    ClientsComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".container-loading").show();
    };
    ClientsComponent.prototype.pesquisar = function (fields) {
        console.log(fields);
    };
    ClientsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/clients/components/clients.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_clients_service__["a" /* ClientsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_clients_service__["a" /* ClientsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object])
    ], ClientsComponent);
    return ClientsComponent;
    var _a, _b;
}());

//# sourceMappingURL=clients.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Editar Cliente</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"name\">Nome: <span class=\"text-danger\">*</span></label>\r\n                        <div class=\"col-md-10\">\r\n                            <input type=\"text\" id=\"name\" name=\"name\" [(ngModel)]=\"client.name\" class=\"form-control\" placeholder=\"Nome Cliente\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"phone\">Telefone:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <input ngxPhoneMask id=\"phone\" name=\"phone\" [(ngModel)]=\"client.phone\" class=\"form-control\" placeholder=\"Telefone\">\r\n                        </div>\r\n                        <label class=\"col-md-1 col-form-label\" for=\"email\">Email:</label>\r\n                        <div class=\"col-md-5\">\r\n                            <input id=\"email\" name=\"email\" [(ngModel)]=\"client.email\" class=\"form-control\" placeholder=\"Email\" disabled>\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"address\">Endereço:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <input id=\"address\" name=\"address\" [(ngModel)]=\"client.address.address\" class=\"form-control\" placeholder=\"Ex(Rua,Av)\" disabled>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"numero\">Número:</label>\r\n                        <div class=\"col-md-3\">\r\n                            <input type=\"text\" id=\"numero\" name=\"numero\" [(ngModel)]=\"client.address.numero\" class=\"form-control\" placeholder=\"Número\" disabled>\r\n                        </div>\r\n                        <label class=\"col-md-2 col-form-label\" for=\"complemento\">Compl.:</label>\r\n                        <div class=\"col-md-5\">\r\n                            <input type=\"text\" id=\"complemento\" name=\"complemento\" [(ngModel)]=\"client.address.complemento\" class=\"form-control\" placeholder=\"Complemento\" disabled>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"bairro\">Bairro:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <input type=\"text\" id=\"bairro\" name=\"bairro\" [(ngModel)]=\"client.address.bairro\" class=\"form-control\" placeholder=\"Bairro\" disabled>\r\n                        </div>\r\n                        <label class=\"col-md-2 col-form-label\" for=\"cidade\">Cidade:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <select name=\"cidade\" id=\"cidade\" class=\"form-control\" [(ngModel)]=\"client.address.city_id\" disabled>\r\n                                <option value=\"0\">Selecione cidade</option>\r\n                                <option value=\"3128709\">Guaxupé</option>\r\n                                <option value=\"3128303\">Guaranésia</option>\r\n                                <option value=\"3136900\">Juruaia</option>\r\n                                <option value=\"3144102\">Muzambinho</option>\r\n                                <option value=\"3163904\">São Pedro da União</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(client)\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_clients_service__ = __webpack_require__("../../../../../src/app/cadastro/clients/services/clients.service.ts");
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
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.client = {
            id: null,
            name: null,
            phone: null,
            address: {
                address: null,
                numero: null,
                bairro: null,
                city_id: 0,
                complemento: null
            },
            email: null
        };
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').show().addClass('show');
        this.httpService.setAccessToken();
        this.route.params
            .subscribe(function (params) {
            _this.httpService.builder().view(params['id'], 'client')
                .then(function (res) {
                if (res.data.user) {
                    _this.client.id = res.data.id;
                    _this.client.name = res.data.name;
                    _this.client.phone = res.data.phone;
                    _this.client.email = res.data.user.data.email;
                    _this.client.address.address = res.data.addressClient.data.address;
                    _this.client.address.numero = res.data.addressClient.data.numero;
                    _this.client.address.bairro = res.data.addressClient.data.bairro;
                    _this.client.address.complemento = res.data.addressClient.data.complemento;
                    _this.client.address.city_id = res.data.addressClient.data.city.data.id;
                    _this.hideLoading();
                }
                else {
                    _this.client.id = res.data.id;
                    _this.client.name = res.data.name;
                    _this.client.phone = res.data.phone;
                    _this.client.email = '';
                    _this.client.address.address = res.data.addressClient.data.address;
                    _this.client.address.numero = res.data.addressClient.data.numero;
                    _this.client.address.bairro = res.data.addressClient.data.bairro;
                    _this.client.address.complemento = res.data.addressClient.data.complemento;
                    _this.client.address.city_id = res.data.addressClient.data.city.data.id;
                    _this.hideLoading();
                }
            });
        });
    };
    EditComponent.prototype.save = function (e) {
        var _this = this;
        if (this.client.name != null && this.client.name.length > 4
            && this.client.email != null && this.client.email.length > 4
            && this.client.phone != null && this.client.phone > 10
            && this.client.address.bairro != null && this.client.address.bairro.length > 4
            && this.client.address.address != null && this.client.address.address.length > 4
            && this.client.address.numero != null && this.client.address.city_id != null) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('client')
                .update(this.client.id, e)
                .then(function () {
                _this.httpService.eventEmitter.emit();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Cliente salvo com sucesso');
                _this.close();
            });
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').hide();
        this.router.navigate(['/cadastro/clients']);
    };
    EditComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    EditComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    EditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/clients/components/edit.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_clients_service__["a" /* ClientsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_clients_service__["a" /* ClientsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Cadastrar novo cliente</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"name\">Nome: <span class=\"text-danger\">*</span></label>\r\n                        <div class=\"col-md-10\">\r\n                            <input type=\"text\" id=\"name\" name=\"name\" [(ngModel)]=\"client.name\" class=\"form-control\" placeholder=\"Nome Cliente\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"fone\">Telefone:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <input ngxPhoneMask id=\"fone\" name=\"phone\" [(ngModel)]=\"client.phone\" class=\"form-control\" placeholder=\"Telefone\">\r\n                        </div>\r\n                        <label class=\"col-md-1 col-form-label\" for=\"email\">Email:</label>\r\n                        <div class=\"col-md-5\">\r\n                            <input id=\"email\" name=\"email\" [(ngModel)]=\"client.email\" class=\"form-control\" placeholder=\"Email\">\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"address\">Endereço:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <input id=\"address\" name=\"address\" [(ngModel)]=\"client.address.address\" class=\"form-control\" placeholder=\"Ex(Rua,Av)\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"numero\">Número:</label>\r\n                        <div class=\"col-md-3\">\r\n                            <input type=\"text\" id=\"numero\" name=\"numero\" [(ngModel)]=\"client.address.numero\" class=\"form-control\" placeholder=\"Número\">\r\n                        </div>\r\n                        <label class=\"col-md-2 col-form-label\" for=\"complemento\">Compl.:</label>\r\n                        <div class=\"col-md-5\">\r\n                            <input type=\"text\" id=\"complemento\" name=\"complemento\" [(ngModel)]=\"client.address.complemento\" class=\"form-control\" placeholder=\"Complemento\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"bairro\">Bairro:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <input type=\"text\" id=\"bairro\" name=\"bairro\" [(ngModel)]=\"client.address.bairro\" class=\"form-control\" placeholder=\"Bairro\">\r\n                        </div>\r\n                        <label class=\"col-md-2 col-form-label\" for=\"cidade\">Cidade:</label>\r\n                        <div class=\"col-md-4\">\r\n                            <select name=\"cidade\" id=\"cidade\" class=\"form-control\" [(ngModel)]=\"client.address.city_id\">\r\n                                <option value=\"0\">Selecione cidade</option>\r\n                                <option value=\"3128709\">Guaxupé</option>\r\n                                <option value=\"3128303\">Guaranésia</option>\r\n                                <option value=\"3136900\">Juruaia</option>\r\n                                <option value=\"3144102\">Muzambinho</option>\r\n                                <option value=\"3163904\">São Pedro da União</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(client)\"><i class=\"fa fa-arrow-circle-right\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/components/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_clients_service__ = __webpack_require__("../../../../../src/app/cadastro/clients/services/clients.service.ts");
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
        this.client = {
            name: null,
            phone: null,
            address: {
                address: null,
                numero: null,
                bairro: null,
                city_id: 0,
                complemento: null
            },
            email: null
        };
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#infoModal').show().addClass('show');
        setTimeout(function () {
            _this.hideLoading();
        }, 300);
    };
    NewComponent.prototype.save = function (e) {
        var _this = this;
        if (this.client.name != null && this.client.name.length > 4
            && this.client.email != null && this.client.email.length > 4
            && this.client.phone != null && this.client.phone > 10
            && this.client.address.bairro != null && this.client.address.bairro.length > 4
            && this.client.address.address != null && this.client.address.address.length > 4
            && this.client.address.numero != null && this.client.address.city_id != null) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'client')
                .then(function () {
                _this.httpService.eventEmitter.emit();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Cliente salvo com sucesso');
                _this.close();
            });
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }
    };
    NewComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#infoModal').hide();
        this.router.navigate(['/cadastro/clients']);
    };
    NewComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").hide();
    };
    NewComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").show();
    };
    NewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/clients/components/new.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_clients_service__["a" /* ClientsService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_clients_service__["a" /* ClientsService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], NewComponent);
    return NewComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/clients/services/clients.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClientsService; });
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


var ClientsService = (function (_super) {
    __extends(ClientsService, _super);
    function ClientsService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    ClientsService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    ClientsService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ClientsService);
    return ClientsService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=clients.service.js.map

/***/ })

});
//# sourceMappingURL=clients.module.chunk.js.map