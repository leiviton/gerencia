webpackJsonp(["produtos.module"],{

/***/ "../../../../../src/app/cadastro/produtos/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Cadastrar novo produto</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"text-input\">Produto:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <input type=\"text\" id=\"text-input\" name=\"name\" [(ngModel)]=\"product.name\" class=\"form-control\" placeholder=\"Produto\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"text-input\">Descrição:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <textarea id=\"text-input\" name=\"description\" [(ngModel)]=\"product.description\" class=\"form-control\" placeholder=\"Descrição\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-3 col-form-label\" for=\"text-input\">Preço venda <i class=\"fa fa-dollar\"></i></label>\r\n                        <div class=\"col-md-4\">\r\n                            <input type=\"text\" id=\"text-input\" name=\"price\" currencyMask [(ngModel)]=\"product.price\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" class=\"form-control\" placeholder=\"Price\">\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div class=\"form-group row\">\r\n                        <div class=\"col-md-6\">\r\n                            <label for=\"select\" class=\"label\">Grupo</label>\r\n                            <select id=\"select\" name=\"category_id\" [(ngModel)]=\"product.category_id\" class=\"form-control col-md9\">\r\n                                <option value=\"null\">Selecione o grupo</option>\r\n                                <option *ngFor=\"let g of groups.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                        </div>\r\n                        <!--div class=\"col-md-6\">\r\n                            <label for=\"select\" class=\"label\">Subgrupo</label>\r\n                            <select id=\"select\" name=\"subgroup_id\" [(ngModel)]=\"product.subgroup_id\" class=\"form-control col-md9\">\r\n                                <option value=\"null\">Selecione o Subgrupo</option>\r\n                                <option *ngFor=\"let sg of subgroups.data\" value=\"{{ sg.id }}\"> {{ sg.name }}</option>\r\n                            </select>\r\n                        </div-->\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"excluir(1)\" *ngIf=\"product.status === 0\"><i class=\"fa fa-power-off\"></i> Inativar</button>\r\n                    <button class=\"btn btn-primary\" type=\"button\" (click)=\"excluir(0)\" *ngIf=\"product.status === 1\"><i class=\"fa fa-power-off\"></i> Ativar</button>\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(product)\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/components/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_produtos_service__ = __webpack_require__("../../../../../src/app/cadastro/produtos/services/produtos.service.ts");
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
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.client = '';
        this.product = {
            id: null,
            name: null,
            description: null,
            price: null,
            category_id: null,
            status: null
        };
        this.groups = {};
    }
    EditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').show().addClass('show');
        this.route.params
            .subscribe(function (params) {
            _this.httpService.builder().view(params['id'], 'product')
                .then(function (res) {
                _this.product.id = res.data.id;
                _this.product.name = res.data.name;
                _this.product.description = res.data.description;
                _this.product.price = res.data.price;
                _this.product.category_id = res.data.category.data.id;
                _this.product.status = res.data.status;
                _this.grupos();
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    EditComponent.prototype.grupos = function () {
        var _this = this;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'groups')
            .then(function (res) {
            _this.groups = res;
        });
    };
    EditComponent.prototype.save = function (e) {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.builder('product')
            .update(this.product.id, e)
            .then(function () {
            _this.httpService.eventEmitter.emit();
            _this.hideLoading();
            _this.toasterService.pop('success', 'Sucesso', 'Produto salvo com sucesso');
            _this.close();
        });
    };
    EditComponent.prototype.excluir = function (status) {
        var _this = this;
        this.showLoading();
        this.product.status = status;
        this.httpService.setAccessToken();
        this.httpService.builder('product')
            .update(this.product.id, this.product)
            .then(function (res) {
            _this.httpService.eventEmitter.emit();
            _this.hideLoading();
            _this.toasterService.pop('warning', 'informação', 'Produto inativado');
            _this.close();
        });
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').hide();
        this.router.navigate(['/cadastro/produtos']);
    };
    EditComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").hide();
    };
    EditComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(".container-loading").show();
    };
    EditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/produtos/components/edit.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_produtos_service__["a" /* ProdutosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_produtos_service__["a" /* ProdutosService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/components/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Cadastrar novo produto</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"text-input\">Produto:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <input type=\"text\" id=\"text-input\" name=\"name\" [(ngModel)]=\"product.name\" class=\"form-control\" placeholder=\"Produto\" autofocus>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-2 col-form-label\" for=\"text-input\">Descrição:</label>\r\n                        <div class=\"col-md-10\">\r\n                            <textarea id=\"text-input\" name=\"description\" [(ngModel)]=\"product.description\" class=\"form-control\" placeholder=\"Descrição\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-3 col-form-label\" for=\"text-input\">Preço venda <i class=\"fa fa-dollar\"></i></label>\r\n                        <div class=\"col-md-4\">\r\n                            <input type=\"text\" id=\"text-input\" name=\"price\" currencyMask [(ngModel)]=\"product.price\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" class=\"form-control\" placeholder=\"Price\">\r\n                        </div>\r\n                    </div>\r\n                    <hr>\r\n                    <div class=\"form-group row\">\r\n                        <div class=\"col-md-6\">\r\n                            <label for=\"select\" class=\"label\">Grupo</label>\r\n                            <select id=\"select\" name=\"category_id\" [(ngModel)]=\"product.category_id\" class=\"form-control col-md9\">\r\n                                <option value=\"null\">Selecione o grupo</option>\r\n                                <option *ngFor=\"let g of groups.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                        </div>\r\n                        <!--div class=\"col-md-6\">\r\n                            <label for=\"select\" class=\"label\">Subgrupo</label>\r\n                            <select id=\"select\" name=\"subgroup_id\" [(ngModel)]=\"product.subgroup_id\" class=\"form-control col-md9\">\r\n                                <option value=\"null\">Selecione o Subgrupo</option>\r\n                                <option *ngFor=\"let sg of subgroups.data\" value=\"{{ sg.id }}\"> {{ sg.name }}</option>\r\n                            </select>\r\n                        </div-->\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(product)\"><i class=\"fa fa-arrow-circle-right\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/components/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_produtos_service__ = __webpack_require__("../../../../../src/app/cadastro/produtos/services/produtos.service.ts");
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
        this.client = '';
        this.product = {
            name: null,
            description: null,
            price: null,
            category_id: null
        };
        this.groups = {};
        this.subgroups = {};
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#infoModal').show().addClass('show');
        setTimeout(function () {
            _this.grupos();
            _this.hideLoading();
        }, 300);
    };
    NewComponent.prototype.grupos = function () {
        var _this = this;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'groups')
            .then(function (res) {
            _this.groups = res;
        });
    };
    NewComponent.prototype.subgrupos = function () {
        var _this = this;
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'subgroups')
            .then(function (res) {
            _this.subgroups = res;
        });
    };
    NewComponent.prototype.save = function (e) {
        var _this = this;
        if (this.product.name != null && this.product.name.length > 4
            && this.product.description != null && this.product.description.length > 4
            && this.product.price != null && this.product.category_id != null) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder()
                .insert(e, 'product/store')
                .then(function () {
                _this.httpService.eventEmitter.emit();
                _this.hideLoading();
                _this.toasterService.pop('success', 'Sucesso', 'Produto salvo com sucesso');
                _this.close();
            });
        }
        else {
            this.toasterService.pop('error', 'Erro', 'Verifique se todos os campos foram preenchidos.');
        }
    };
    NewComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__('#infoModal').hide();
        this.router.navigate(['/cadastro/produtos']);
    };
    NewComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").hide();
    };
    NewComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__(".container-loading").show();
    };
    NewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/produtos/components/new.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__services_produtos_service__["a" /* ProdutosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__services_produtos_service__["a" /* ProdutosService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], NewComponent);
    return NewComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/components/produtos.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n              <button class=\"btn btn-default\" (click)=\"showModal()\"><i class=\"fa fa-search\"></i> Pesquisar</button>\n              <a class=\"btn btn-success\" [routerLink]=\"['new']\"><i class=\"fa fa-plus\"></i> Novo</a>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">#</th>\n                    <th class=\"title\">Produto</th>\n                    <th class=\"title text-center\">Descrição</th>\n                    <th>Grupo</th>\n                    <th class=\"title text-center\">Preço Venda</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"5\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of produtos.data\" (dblclick)=\"edit(o.id)\">\n                    <td class=\"text-center\">{{ o.id }}</td>\n                    <td>{{ o.name | slice:0:35 }}</td>\n                    <td>{{ o.description | slice:0:85 }}... </td>\n                    <td>{{ o.category.data.name}}</td>\n                    <td class=\"text-center\">{{ o.price | currency:'BRL':true }}</td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n          </div>\n        </div>\n      </div>\n</div>\n<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">Descrição:</label>\n        <input type=\"text\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal()\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar(pesquisa)\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/components/produtos.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProdutosComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_produtos_service__ = __webpack_require__("../../../../../src/app/cadastro/produtos/services/produtos.service.ts");
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




var ProdutosComponent = (function () {
    function ProdutosComponent(httpService, router) {
        this.httpService = httpService;
        this.router = router;
        this.cor = false;
        this.pesquisa = {
            inicio: null,
            fim: null,
            status: null
        };
        this.produtos = {};
        this.tamanho = 0;
    }
    ProdutosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        this.httpService.setAccessToken();
        this.httpService.eventEmitter
            .subscribe(function () {
            _this.httpService.builder().list({}, 'products')
                .then(function (res) {
                _this.produtos = res;
                _this.tamanho = res.data.length;
                _this.hideLoading();
            });
        });
        this.httpService.eventEmitter.emit();
    };
    ProdutosComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/cadastro/produtos/edit/' + id]);
    };
    ProdutosComponent.prototype.showModal = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".modal").show().addClass('show');
    };
    ProdutosComponent.prototype.hideModal = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".modal").hide();
    };
    ProdutosComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".container-loading").hide();
    };
    ProdutosComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(".container-loading").show();
    };
    ProdutosComponent.prototype.pesquisar = function (fields) {
        console.log(fields);
    };
    ProdutosComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/cadastro/produtos/components/produtos.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_produtos_service__["a" /* ProdutosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_produtos_service__["a" /* ProdutosService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object])
    ], ProdutosComponent);
    return ProdutosComponent;
    var _a, _b;
}());

//# sourceMappingURL=produtos.component.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/produtos-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProdutosRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_produtos_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/produtos.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_new_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_edit_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_produtos_component__["a" /* ProdutosComponent */],
        data: {
            title: 'Produtos'
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
var ProdutosRoutingModule = (function () {
    function ProdutosRoutingModule() {
    }
    ProdutosRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], ProdutosRoutingModule);
    return ProdutosRoutingModule;
}());

//# sourceMappingURL=produtos-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/produtos.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProdutosModule", function() { return ProdutosModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_produtos_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/produtos.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_new_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/new.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_edit_component__ = __webpack_require__("../../../../../src/app/cadastro/produtos/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__produtos_routing_module__ = __webpack_require__("../../../../../src/app/cadastro/produtos/produtos-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_produtos_service__ = __webpack_require__("../../../../../src/app/cadastro/produtos/services/produtos.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











var ProdutosModule = (function () {
    function ProdutosModule() {
    }
    ProdutosModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_8__produtos_routing_module__["a" /* ProdutosRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_10_ng2_currency_mask__["CurrencyMaskModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__components_produtos_component__["a" /* ProdutosComponent */], __WEBPACK_IMPORTED_MODULE_6__components_new_component__["a" /* NewComponent */], __WEBPACK_IMPORTED_MODULE_7__components_edit_component__["a" /* EditComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_9__services_produtos_service__["a" /* ProdutosService */]]
        })
    ], ProdutosModule);
    return ProdutosModule;
}());

//# sourceMappingURL=produtos.module.js.map

/***/ }),

/***/ "../../../../../src/app/cadastro/produtos/services/produtos.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProdutosService; });
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


var ProdutosService = (function (_super) {
    __extends(ProdutosService, _super);
    function ProdutosService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    ProdutosService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    ProdutosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], ProdutosService);
    return ProdutosService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=produtos.service.js.map

/***/ })

});
//# sourceMappingURL=produtos.module.chunk.js.map