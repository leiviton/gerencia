webpackJsonp(["movimento-caixas.module"],{

/***/ "../../../../../src/app/movimento-caixas/components/edit.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"successModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Editar Caixa</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-4 col-form-label\" for=\"name\">Caixa: <span class=\"text-danger\">*</span></label>\r\n                        <div class=\"col-md-8\">\r\n                            <input type=\"text\" id=\"name\" name=\"name\" [(ngModel)]=\"caixa.name\" class=\"form-control\" placeholder=\"Nome Caixa\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-4 col-form-label\" for=\"saldo\">Saldo:</label>\r\n                        <div class=\"col-md-8\">\r\n                            <input type=\"text\" id=\"saldo\" name=\"phone\" currencyMask [(ngModel)]=\"caixa.saldo\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" class=\"form-control\" placeholder=\"Saldo\" disabled>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(caixa)\"><i class=\"fa fa-save\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/components/edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__ = __webpack_require__("../../../../../src/app/movimento-caixas/services/movimento-caixas.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_message_service__ = __webpack_require__("../../../../../src/app/app-message.service.ts");
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
        this.caixa = {
            id: 0,
            name: ''
        };
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
            if (e.keyCode == 27) {
                _this.close();
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
            _this.httpService.builder().view(params['id'], 'caixa')
                .then(function (res) {
                _this.caixa = res.data;
                _this.hideLoading();
            });
            _this.httpService.setAccessToken();
        });
    };
    EditComponent.prototype.save = function (e) {
        var _this = this;
        if (this.caixa.name != null && this.caixa.name.length > 4) {
            this.showLoading();
            this.httpService.setAccessToken();
            this.httpService.builder('caixa')
                .update(this.caixa.id, e)
                .then(function () {
                _this.httpService.eventEmitter.emit();
                _this.toasterService.message('Sucesso', 'Caixa salvo com sucesso', 'success');
                _this.hideLoading();
                _this.close();
            });
        }
        else {
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.', 'error');
        }
    };
    EditComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#successModal').hide();
        this.router.navigate(['/financeiro/caixas']);
    };
    EditComponent.prototype.habilitarEdicao = function () {
        this.editar = !this.editar;
    };
    EditComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__("#bifrostBarSpinner").hide();
    };
    EditComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__("#bifrostBarSpinner").show();
    };
    EditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/movimento-caixas/components/edit.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__["a" /* MovimentoCaixasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__["a" /* MovimentoCaixasService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */]) === "function" && _d || Object])
    ], EditComponent);
    return EditComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=edit.component.js.map

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/components/movimento-caixas.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-lg-12\">\n          <div class=\"card\">\n            <div class=\"card-header\">\n                   <button type=\"button\" class=\"btn btn-default\" (click)=\"showModal('#mov')\"><i class=\"fa fa-search\"></i> Pesquisar </button>\n                   <button type=\"button\" class=\"btn btn-success\" (click)=\"new()\"><i class=\"fa fa-plus\"></i> Novo </button>\n                   <button type=\"button\" class=\"btn btn-info\" (click)=\"showModal('#rel')\"><i class=\"fa fa-bar-chart\"></i> Relatorio </button>\n            </div>\n            <div class=\"card-body\">\n              <table class=\"table table-responsive table-bordered table-striped table-sm\">\n                <thead>\n                  <tr>\n                    <th class=\"title text-center\">#</th>\n                    <th class=\"title text-center\">Tipo</th>\n                    <th class=\"title text-center\">Caixa</th>\n                    <th class=\"title text-center\">Valor</th>\n                    <th class=\"title text-center\">Documento</th>\n                    <th class=\"title text-center\">Histórico</th>\n                    <th class=\"title text-center\">Data/Hora</th>\n                    <th class=\"title text-center\">Usuário</th>\n                  </tr>\n                </thead>\n                <tbody>\n                  <tr *ngIf=\"tamanho == 0\">\n                    <td colspan=\"8\"> Sem dados</td>\n                  </tr>\n                  <tr *ngFor=\"let o of movimentos.data\">\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.id }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">\n                      <span class=\"badge badge-pill badge-success\" *ngIf=\"o.tipo_movimento === 'credito'\" tooltip=\"Crédito\"><i class=\"fa fa-arrow-down\"></i> Crédito</span>\n                      <span class=\"badge badge-pill badge-danger\" *ngIf=\"o.tipo_movimento === 'debito'\" tooltip=\"Débito\"><i class=\"fa fa-arrow-up\"></i> Débito</span>\n                    </td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.caixa.data.name}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.valor | currency:'BRL':true }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0 && o.payment\">{{ o.payment.data.order_id}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0 && !o.payment\"></td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.historico}}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.created_at }}</td>\n                    <td class=\"text-center\" *ngIf=\"tamanho > 0\">{{ o.usuario }}</td>\n                  </tr>\n                </tbody>\n              </table>\n              <!--nav>\n                <ul class=\"pagination\">\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Prev</a></li>\n                  <li class=\"page-item active\">\n                    <a class=\"page-link\" href=\"#\">1</a>\n                  </li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">2</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">3</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">4</a></li>\n                  <li class=\"page-item\"><a class=\"page-link\" href=\"#\">Next</a></li>\n                </ul>\n              </nav-->\n            </div>\n            <h4 class=\"text-title text-center\">Total: {{ total | currency:'BRL':true }}</h4>\n          </div>\n        </div>\n      </div>\n </div>\n\n<div class=\"modal fade\" id=\"mov\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header novo\">\n        <h6 class=\"modal-title\">Pesquisar</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">Dia</label>\n        <input type=\"date\" id=\"inicio\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n\n        <label for=\"fim\">Até</label>\n        <input type=\"date\" id=\"fim\" class=\"form-control\" name=\"fim\" [(ngModel)]=\"pesquisa.fim\" required>\n\n        <label class=\"col-form-label\" for=\"select\">Caixa</label>\n        <select name=\"status\" class=\"form-control\" id=\"select\" [(ngModel)]=\"pesquisa.caixa_id\" required>\n          <option *ngFor=\"let g of caixas.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\n        </select>\n        <label class=\"col-form-label\" for=\"user\">Usuário</label>\n        <select name=\"status\" class=\"form-control\" id=\"user\" [(ngModel)]=\"pesquisa.user\" required>\n          <option value=\"todos\">Todos</option>\n          <option *ngFor=\"let g of usuarios.data\" value=\"{{ g.email }}\"> {{ g.name }}</option>\n        </select>\n      </div>\n      <div class=\"modal-footer novo\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal('#mov')\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"pesquisar()\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n\n<div class=\"modal fade\" id=\"rel\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n  <div class=\"modal-dialog modal-sm modal-success\" role=\"document\">\n    <div class=\"modal-content\">\n      <div class=\"modal-header novo\">\n        <h6 class=\"modal-title\">Gerar Relátorio</h6>\n      </div>\n      <div class=\"modal-body\">\n        <label for=\"inicio\">Dia</label>\n        <input type=\"date\" id=\"iniciorel\" class=\"form-control\" name=\"inicio\" [(ngModel)]=\"pesquisa.inicio\" required>\n        <label class=\"col-form-label\" for=\"caixa\">Caixa</label>\n        <select name=\"status\" class=\"form-control\" id=\"caixa\" [(ngModel)]=\"pesquisa.caixa_id\" required>\n          <option *ngFor=\"let g of caixas.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\n        </select>\n        <label class=\"col-form-label\" for=\"userrel\">Usuário</label>\n        <select name=\"status\" class=\"form-control\" id=\"userrel\" [(ngModel)]=\"pesquisa.user\" required>\n          <option value=\"todos\">Todos</option>\n          <option *ngFor=\"let g of usuarios.data\" value=\"{{ g.email }}\"> {{ g.name }}</option>\n        </select>\n      </div>\n      <div class=\"modal-footer novo\">\n        <button type=\"button\" class=\"btn btn-secondary\" (click)=\"hideModal('#rel')\">Fechar</button>\n        <button type=\"button\" class=\"btn btn-primary\" (click)=\"gerarRel()\"><i class=\"fa fa-search\"></i> Buscar</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->\n\n<router-outlet></router-outlet>\n\n"

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/components/movimento-caixas.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimentoCaixasComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_movimento_caixas_service__ = __webpack_require__("../../../../../src/app/movimento-caixas/services/movimento-caixas.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_message_service__ = __webpack_require__("../../../../../src/app/app-message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MovimentoCaixasComponent = (function () {
    function MovimentoCaixasComponent(httpService, router, toasterService) {
        var _this = this;
        this.httpService = httpService;
        this.router = router;
        this.toasterService = toasterService;
        this.cor = false;
        this.caixas = {
            data: []
        };
        this.tamanho = 0;
        this.pesquisa = {
            inicio: null,
            fim: null,
            caixa_id: 1,
            user: 'todos'
        };
        this.movimentos = {
            data: []
        };
        this.total = 0;
        this.usuarios = {
            data: []
        };
        document.onkeydown = (function (e) {
            if (e.keyCode == 113) {
                return _this.showModal('#mov');
            }
        });
    }
    MovimentoCaixasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        var u = { role: null };
        u = JSON.parse(localStorage.getItem('user') || null);
        if (u == null) {
            this.toasterService.message('Sem permissão', 'Usuário sem acesso, contate o administrador', 'error');
            this.router.navigate(['/user/login']);
        }
        if (u.role !== 'gerente' && u.role !== 'admin') {
            this.toasterService.message('Sem permissão', 'Usuário sem acesso, contate o administrador', 'error');
            this.router.navigate(['/dashboard']);
        }
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'movimento/caixas')
            .then(function (res) {
            _this.movimentos = res;
            console.log(_this.movimentos);
            _this.tamanho = res.data.length;
            var i;
            for (i = 0; i < res.data.length; i++) {
                if (res.data[i].tipo_movimento === 'credito') {
                    _this.total += res.data[i].valor;
                }
                else if (res.data[i].tipo_movimento === 'debito') {
                    _this.total -= res.data[i].valor;
                }
            }
            _this.hideLoading();
            _this.toasterService.message('Sucesso', 'Dados carregados com sucesso', 'success');
        });
        this.getCaixas();
        this.getUser();
    };
    MovimentoCaixasComponent.prototype.edit = function (id) {
        this.cor = true;
        this.router.navigate(['/financeiro/movimento/caixas/edit/' + id]);
    };
    MovimentoCaixasComponent.prototype.getCaixas = function () {
        var _this = this;
        this.httpService.builder()
            .list({}, 'caixas')
            .then(function (res) {
            _this.caixas = res;
        });
    };
    MovimentoCaixasComponent.prototype.getUser = function () {
        var _this = this;
        this.httpService.builder()
            .list({}, 'users')
            .then(function (res) {
            _this.usuarios = res;
        });
    };
    MovimentoCaixasComponent.prototype.new = function () {
        this.router.navigate(['/financeiro/movimento/caixas/new']);
    };
    MovimentoCaixasComponent.prototype.pesquisar = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.inicio !== null && this.pesquisa.fim !== null) {
            this.total = 0;
            var options = {
                filters: [
                    { user: this.pesquisa.user },
                    { caixa_id: this.pesquisa.caixa_id },
                    { inicio: this.pesquisa.inicio },
                    { fim: this.pesquisa.fim }
                ]
            };
            this.httpService.builder().list(options, 'movimento/caixas/filters')
                .then(function (res) {
                _this.movimentos = res;
                console.log(_this.movimentos);
                _this.tamanho = res.data.length;
                var i;
                for (i = 0; i < res.data.length; i++) {
                    if (res.data[i].tipo_movimento === 'credito') {
                        _this.total += res.data[i].valor;
                    }
                    else if (res.data[i].tipo_movimento === 'debito') {
                        _this.total -= res.data[i].valor;
                    }
                }
                _this.hideModal('#mov');
                _this.hideLoading();
                _this.toasterService.message('Sucesso', 'Dados carregados com sucesso', 'success');
            });
        }
        else {
            this.toasterService.message('Erro', 'Preencha inicio, fim e status para pesquisar.', 'error');
            this.hideLoading();
        }
    };
    MovimentoCaixasComponent.prototype.openReal = function () {
        this.hideModal('#rel');
        window.open('/#/relatorios/relatorio-movimento-caixa', '_blank');
    };
    MovimentoCaixasComponent.prototype.gerarRel = function () {
        var _this = this;
        this.showLoading();
        if (this.pesquisa.inicio != null && this.pesquisa.inicio != '') {
            var options_1 = {
                filters: [
                    { user: this.pesquisa.user },
                    { caixa_id: this.pesquisa.caixa_id },
                    { inicio: this.pesquisa.inicio },
                    { fim: this.pesquisa.inicio }
                ]
            };
            this.httpService.builder()
                .list(options_1, 'relatorio/fechamento/caixa')
                .then(function (res) {
                _this.hideLoading();
                localStorage.setItem('mov_caixa_rel', JSON.stringify(res));
                localStorage.setItem('filtros_rel', JSON.stringify(options_1));
                _this.openReal();
                _this.toasterService.message('Sucesso', 'Relátorio gerado com sucesso', 'success');
            });
        }
        else {
            this.showLoading();
        }
    };
    MovimentoCaixasComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__("#bifrostBarSpinner").hide();
    };
    MovimentoCaixasComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__("#bifrostBarSpinner").show();
    };
    MovimentoCaixasComponent.prototype.showModal = function (id) {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(id).show().addClass('show');
    };
    MovimentoCaixasComponent.prototype.hideModal = function (id) {
        __WEBPACK_IMPORTED_MODULE_3_jquery__(id).hide();
    };
    MovimentoCaixasComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/movimento-caixas/components/movimento-caixas.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_movimento_caixas_service__["a" /* MovimentoCaixasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_movimento_caixas_service__["a" /* MovimentoCaixasService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */]) === "function" && _c || Object])
    ], MovimentoCaixasComponent);
    return MovimentoCaixasComponent;
    var _a, _b, _c;
}());

//# sourceMappingURL=movimento-caixas.component.js.map

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/components/new.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro\">\r\n                <h6 class=\"modal-title\">Novo Movimento Caixa</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form>\r\n                    <div class=\"form-group row\">\r\n                            <label class=\"col-md-4 col-form-label\" for=\"tipo\">Tipo:</label>\r\n                            <div class=\"col-md-8\">\r\n                                <select name=\"tipo_movimento\" class=\"form-control\" id=\"tipo\" [(ngModel)]=\"movimento.tipo_movimento\" required>\r\n                                    <option *ngFor=\"let g of tipos_mov\" value=\"{{ g.value }}\"> {{ g.label }}</option>\r\n                                </select>\r\n                            </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-4 col-form-label\" for=\"select\">Caixa:</label>\r\n                        <div class=\"col-md-8\">\r\n                            <select name=\"caixa\" class=\"form-control\" id=\"select\" [(ngModel)]=\"movimento.caixa_id\" required>\r\n                                <option *ngFor=\"let g of caixas.data\" value=\"{{ g.id }}\"> {{ g.name }}</option>\r\n                            </select>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-4 col-form-label\" for=\"valor\">Valor:</label>\r\n                        <div class=\"col-md-8\">\r\n                            <input type=\"text\" id=\"valor\" name=\"valor\" currencyMask [(ngModel)]=\"movimento.valor\" [options]=\"{ prefix: 'R$ ', thousands: '.', decimal: ',' }\" class=\"form-control\" placeholder=\"Valor\">\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label for=\"historico\" class=\"col-md-4 col-form-label\">Histórico:</label>\r\n                        <div class=\"col-md-8\">\r\n                            <textarea id=\"historico\" name=\"historico\" rows=\"3\" cols=\"9\" [(ngModel)]=\"movimento.historico\" class=\"form-control\" placeholder=\"Historico\"></textarea>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save()\"><i class=\"fa fa-arrow-circle-right\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/components/new.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NewComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__ = __webpack_require__("../../../../../src/app/movimento-caixas/services/movimento-caixas.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_message_service__ = __webpack_require__("../../../../../src/app/app-message.service.ts");
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
        this.movimento = {
            tipo_movimento: 'credito',
            valor: 0,
            historico: null,
            caixa_id: 1
        };
        this.caixas = { data: [] };
        this.tipos_mov = [
            {
                value: 'credito',
                label: 'Crédito'
            },
            {
                value: 'debito',
                label: 'Débito'
            }
        ];
    }
    NewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').show().addClass('show');
        this.getCaixas();
        setTimeout(function () {
            _this.hideLoading();
        }, 300);
    };
    NewComponent.prototype.save = function () {
        var _this = this;
        this.showLoading();
        if (this.movimento.tipo_movimento != null && this.movimento.valor > 0 &&
            this.movimento.historico != null && this.movimento.historico.length > 6) {
            this.httpService.builder()
                .insert(this.movimento, 'movimento/caixa')
                .then(function (res) {
                _this.hideLoading();
                if (res == 'fechado') {
                    _this.toasterService.message('Erro', 'Caixa está fechado.', 'error');
                }
                else {
                    _this.toasterService.message('Salvo', 'Movimento salvo com sucesso.', 'success');
                    _this.close();
                }
            });
        }
        else {
            this.hideLoading();
            this.toasterService.message('Erro', 'Verifique se todos os campos foram preenchidos.', 'error');
        }
    };
    NewComponent.prototype.getCaixas = function () {
        var _this = this;
        this.httpService.builder()
            .list({}, 'caixas')
            .then(function (res) {
            _this.caixas = res;
        });
    };
    NewComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__('#infoModal').hide();
        this.router.navigate(['/financeiro/movimento/caixas']);
    };
    NewComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__("#bifrostBarSpinner").hide();
    };
    NewComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_1_jquery__("#bifrostBarSpinner").show();
    };
    NewComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/movimento-caixas/components/new.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__["a" /* MovimentoCaixasService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_movimento_caixas_service__["a" /* MovimentoCaixasService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__app_message_service__["a" /* AppMessageService */]) === "function" && _d || Object])
    ], NewComponent);
    return NewComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=new.component.js.map

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/movimento-caixas-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimentoCaixasRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_movimento_caixas_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/movimento-caixas.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_edit_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_new_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/new.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_movimento_caixas_component__["a" /* MovimentoCaixasComponent */],
        data: {
            title: 'Movimento de Caixa'
        },
        children: [
            {
                path: 'new',
                component: __WEBPACK_IMPORTED_MODULE_4__components_new_component__["a" /* NewComponent */],
                data: {
                    title: 'Novo'
                }
            },
            {
                path: 'edit/:id',
                component: __WEBPACK_IMPORTED_MODULE_3__components_edit_component__["a" /* EditComponent */],
                data: {
                    title: 'Editar'
                }
            }
        ]
    }
];
var MovimentoCaixasRoutingModule = (function () {
    function MovimentoCaixasRoutingModule() {
    }
    MovimentoCaixasRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], MovimentoCaixasRoutingModule);
    return MovimentoCaixasRoutingModule;
}());

//# sourceMappingURL=movimento-caixas-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/movimento-caixas.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovimentoCaixasModule", function() { return MovimentoCaixasModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_movimento_caixas_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/movimento-caixas.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__movimento_caixas_routing_module__ = __webpack_require__("../../../../../src/app/movimento-caixas/movimento-caixas-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__services_movimento_caixas_service__ = __webpack_require__("../../../../../src/app/movimento-caixas/services/movimento-caixas.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_cuppa_ng2_grid_cuppa_ng2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_phone_mask__ = __webpack_require__("../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_edit_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_new_component__ = __webpack_require__("../../../../../src/app/movimento-caixas/components/new.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var MovimentoCaixasModule = (function () {
    function MovimentoCaixasModule() {
    }
    MovimentoCaixasModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_7__movimento_caixas_routing_module__["a" /* MovimentoCaixasRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_8_ngx_bootstrap__["b" /* TooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_10_cuppa_ng2_grid_cuppa_ng2_dataGrid__["a" /* CuppaDataGridModule */],
                __WEBPACK_IMPORTED_MODULE_11_ngx_bootstrap_tabs__["a" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_12_ng2_currency_mask__["CurrencyMaskModule"],
                __WEBPACK_IMPORTED_MODULE_13_ngx_phone_mask__["a" /* NgxPhoneMaskModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_6__components_movimento_caixas_component__["a" /* MovimentoCaixasComponent */], __WEBPACK_IMPORTED_MODULE_14__components_edit_component__["a" /* EditComponent */], __WEBPACK_IMPORTED_MODULE_15__components_new_component__["a" /* NewComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_9__services_movimento_caixas_service__["a" /* MovimentoCaixasService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */]]
        })
    ], MovimentoCaixasModule);
    return MovimentoCaixasModule;
}());

//# sourceMappingURL=movimento-caixas.module.js.map

/***/ }),

/***/ "../../../../../src/app/movimento-caixas/services/movimento-caixas.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimentoCaixasService; });
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


var MovimentoCaixasService = (function (_super) {
    __extends(MovimentoCaixasService, _super);
    function MovimentoCaixasService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    MovimentoCaixasService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    MovimentoCaixasService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], MovimentoCaixasService);
    return MovimentoCaixasService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=movimento-caixas.service.js.map

/***/ })

});
//# sourceMappingURL=movimento-caixas.module.chunk.js.map