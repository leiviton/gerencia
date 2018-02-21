webpackJsonp(["relatorios.module"],{

/***/ "../../../../../src/app/relatorios/components/relatorio-mov-caixa.component.html":
/***/ (function(module, exports) {

module.exports = "<html>\r\n<head>\r\n    <meta http-equiv=\\\"Content-Type\\\" content=\\\"text/html; charset=utf-8\\\"/>\r\n    <style>\r\n        .fonte{\r\n            font-weight: 300;\r\n        }\r\n        .padding{\r\n            padding-left: 10px;\r\n            padding-right: 10px;\r\n            padding-bottom: 0;\r\n            padding-top: 0;\r\n            margin-left: 7px;\r\n        }\r\n        .produto{\r\n            font-weight: 200;\r\n            font-size: 15px;\r\n\r\n        }\r\n        .price{\r\n            margin-left: -20px;\r\n        }\r\n        .produto2{\r\n            word-wrap: break-word;\r\n            width: 6em;\r\n            text-transform: capitalize;\r\n        }\r\n        .total{\r\n            font-weight: bold;\r\n            font-size: 18px;\r\n        }\r\n        .divd{\r\n            font-weight: 100;\r\n            color: #3e515b;\r\n            font-size: 10px;\r\n        }\r\n\r\n        .border{\r\n            border-bottom: 1px solid #c2cfd6;;\r\n        }\r\n        .obs{\r\n            font-weight: bold;\r\n            font-size: 16px;\r\n            word-wrap: break-word;\r\n            width: 16em;\r\n            text-transform: capitalize;\r\n        }\r\n        .data{\r\n            font-weight: bold;\r\n            font-size: 10px;\r\n        }\r\n        .item{\r\n            margin:0;\r\n            padding:0;\r\n        }\r\n        .header{\r\n            padding:10px;\r\n            border: 1px solid #222;\r\n            border-bottom: 0 solid transparent;\r\n        }\r\n        .center{\r\n            position: relative;\r\n            margin-left:40%;\r\n        }\r\n        .body{\r\n            background-color: #FFFFFF !important;\r\n        }\r\n        .td{\r\n            bolder: 1px solid #222;\r\n        }\r\n        .table th, .table td, .th-table {\r\n            padding: 0.2rem !important;\r\n        }\r\n        .table-bordered th, .table-bordered td{\r\n            border: 1px solid #222 !important;\r\n            border-left: 0 solid transparent !important;\r\n            border-right: 0 solid transparent !important;\r\n        }\r\n        .table-bordered th{\r\n            background:#c2cfd6 !important;\r\n        }\r\n\r\n        .table {\r\n            width: 100% !important;\r\n            max-width: 100% !important;\r\n            margin-bottom: 1rem !important;\r\n            background-color: transparent !important;\r\n        }\r\n        table {\r\n            border-collapse: collapse !important;\r\n            border: 1px solid #222 !important;\r\n        }\r\n        table {\r\n            display: table !important;\r\n        }\r\n        .text-center {\r\n            text-align: center !important;\r\n        }\r\n        .sumario{\r\n            width: 250px;\r\n            padding: 22px;\r\n            margin-left: 76%;\r\n            font-weight: bold;\r\n            border: 1px solid #222;\r\n        }\r\n        .saldos{\r\n            font-size: 18px;\r\n            font-weight: bold;\r\n        }\r\n    </style>\r\n</head>\r\n<body class=\"body\">\r\n<div class='header text-center'>\r\n    <h3 class='item'>Relatório Movimentação de caixa</h3>\r\n    <p class='item'>Data Relatório: {{ data }} | Usuário Caixa: {{ filtros.filters[0].user }} | Caixa: {{ caixa }} | Data do caixa: {{ data_caixa }} | Empresa: Eguis</p>\r\n</div>\r\n<table class='table table-bordered'>\r\n    <thead>\r\n    <tr class='text-center'>\r\n        <th class='fonte text-center saldos'>Tipo</th>\r\n        <th class='fonte text-center saldos'>Caixa</th>\r\n        <th class='fonte text-center saldos'>Usuário</th>\r\n        <th class='fonte text-center saldos'>Documento</th>\r\n        <th class='fonte text-center saldos'>Histórico</th>\r\n        <th class='fonte text-center saldos'>Data/Hora</th>\r\n        <th class='fonte text-center saldos'>Valor</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr>\r\n        <td colspan='6' class='fonte saldos'>saldo inicial</td>\r\n        <td colspan='1' class='fonte text-center saldos'>{{ saldo_inicial | currency:'BRL':true}}</td>\r\n    </tr>\r\n    <tr *ngIf=\"tamanho == 0\">\r\n        <td colspan=\"7\"> Sem movimento</td>\r\n    </tr>\r\n    <tr class='text-center' *ngFor=\"let m of movimentos.data\">\r\n        <td class='fonte'>{{ m.tipo_movimento }}</td>\r\n        <td class='fonte'>{{ m.caixa.data.name }}</td>\r\n        <td class='fonte'>{{ m.usuario }}</td>\r\n        <td class='fonte' *ngIf=\"m.payment\"> {{ m.payment.data.order_id }}</td>\r\n        <td class='fonte' *ngIf=\"!m.payment\"></td>\r\n        <td class='fonte'> {{ m.historico }}</td>\r\n        <td class='fonte'> {{ m.created_at}}</td>\r\n        <td class='fonte'> {{ m.valor | currency:'BRL':true }}</td>\r\n    </tr>\r\n    <tr>\r\n        <td colspan='6' class='fonte saldos'>saldo final</td>\r\n        <td colspan='1' class='fonte text-center saldos' *ngIf=\"tamanho == 0\">{{ saldo_inicial | currency:'BRL':true}}</td>\r\n        <td colspan='1' class='fonte text-center saldos' *ngIf=\"tamanho > 0\">{{ total | currency:'BRL':true}}</td>\r\n    </tr>\r\n    </tbody>\r\n</table>\r\n<div class='sumario'>\r\n    <h5 class='item saldos'>Total Crédito: {{ total_credito | currency:'BRL':true}}</h5>\r\n    <h5 class='item saldos'>Total Débito: {{ total_debito | currency:'BRL':true}}</h5>\r\n</div>\r\n</body>\r\n</html>"

/***/ }),

/***/ "../../../../../src/app/relatorios/components/relatorio-mov-caixa.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelatorioMovCaixaComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_relatorios_service__ = __webpack_require__("../../../../../src/app/relatorios/services/relatorios.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__ = __webpack_require__("../../../../angular2-toaster/angular2-toaster.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RelatorioMovCaixaComponent = (function () {
    function RelatorioMovCaixaComponent(httpService, router, route, toasterService) {
        this.httpService = httpService;
        this.router = router;
        this.route = route;
        this.toasterService = toasterService;
        this.movimentos = {
            data: []
        };
        this.saldo_inicial = 0;
        this.tamanho = 0;
        this.total = 0;
        this.total_credito = 0;
        this.total_debito = 0;
        this.filtros = {
            filters: []
        };
        this.data = new Date().toLocaleDateString();
        this.data_caixa = '';
        this.caixa = '';
    }
    RelatorioMovCaixaComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filtros = JSON.parse(localStorage.getItem('filtros_rel') || null);
        var data = this.filtros.filters[2].inicio;
        this.data_caixa = new Date(data).toISOString().substr(0, 10).split('-').reverse().join('/');
        this.httpService.builder()
            .view(this.filtros.filters[1].caixa_id, 'caixa')
            .then(function (res) {
            _this.caixa = res.data.name;
        });
        this.httpService.builder()
            .list({}, 'open/?data=' + data)
            .then(function (res) {
            for (var i in res.data) {
                if (res.data[i].tipo == 'A') {
                    _this.saldo_inicial = res.data[i].saldo;
                }
            }
        });
        this.movimentos = JSON.parse(localStorage.getItem('mov_caixa_rel') || null);
        this.tamanho = this.movimentos.data.length;
        this.total = this.saldo_inicial;
        for (var i in this.movimentos.data) {
            if (this.movimentos.data[i].tipo_movimento === 'credito') {
                this.total += this.movimentos.data[i].valor;
                this.total_credito += this.movimentos.data[i].valor;
            }
            else if (this.movimentos.data[i].tipo_movimento === 'debito') {
                this.total -= this.movimentos.data[i].valor;
                this.total_debito += this.movimentos.data[i].valor;
            }
        }
        console.log(this.movimentos);
        setTimeout(function () {
            window.print();
        }, 4000);
    };
    RelatorioMovCaixaComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/relatorios/components/relatorio-mov-caixa.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_relatorios_service__["a" /* RelatoriosService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_relatorios_service__["a" /* RelatoriosService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__["b" /* ToasterService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_angular2_toaster__["b" /* ToasterService */]) === "function" && _d || Object])
    ], RelatorioMovCaixaComponent);
    return RelatorioMovCaixaComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=relatorio-mov-caixa.component.js.map

/***/ }),

/***/ "../../../../../src/app/relatorios/relatorios-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovimentoCaixasRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_relatorio_mov_caixa_component__ = __webpack_require__("../../../../../src/app/relatorios/components/relatorio-mov-caixa.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_relatorio_mov_caixa_component__["a" /* RelatorioMovCaixaComponent */],
        data: {
            title: 'Movimento de Caixa'
        },
        children: [
            {
                path: 'relatorio-movimento-caixa',
                component: __WEBPACK_IMPORTED_MODULE_2__components_relatorio_mov_caixa_component__["a" /* RelatorioMovCaixaComponent */],
                data: {
                    title: 'Relatorio Movimento de caixa'
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

//# sourceMappingURL=relatorios-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/relatorios/relatorios.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelatoriosModule", function() { return RelatoriosModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__ = __webpack_require__("../../../../ngx-bootstrap/modal/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__relatorios_routing_module__ = __webpack_require__("../../../../../src/app/relatorios/relatorios-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__ = __webpack_require__("../../../../ngx-bootstrap/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_relatorios_service__ = __webpack_require__("../../../../../src/app/relatorios/services/relatorios.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_cuppa_ng2_grid_cuppa_ng2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_tabs__ = __webpack_require__("../../../../ngx-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_currency_mask__ = __webpack_require__("../../../../ng2-currency-mask/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_currency_mask___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_currency_mask__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ngx_phone_mask__ = __webpack_require__("../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_relatorio_mov_caixa_component__ = __webpack_require__("../../../../../src/app/relatorios/components/relatorio-mov-caixa.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var RelatoriosModule = (function () {
    function RelatoriosModule() {
    }
    RelatoriosModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_6__relatorios_routing_module__["a" /* MovimentoCaixasRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_2_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_3_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
                __WEBPACK_IMPORTED_MODULE_7_ngx_bootstrap__["b" /* TooltipModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_9_cuppa_ng2_grid_cuppa_ng2_dataGrid__["a" /* CuppaDataGridModule */],
                __WEBPACK_IMPORTED_MODULE_10_ngx_bootstrap_tabs__["a" /* TabsModule */],
                __WEBPACK_IMPORTED_MODULE_11_ng2_currency_mask__["CurrencyMaskModule"],
                __WEBPACK_IMPORTED_MODULE_12_ngx_phone_mask__["a" /* NgxPhoneMaskModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_13__components_relatorio_mov_caixa_component__["a" /* RelatorioMovCaixaComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_8__services_relatorios_service__["a" /* RelatoriosService */], __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_modal__["a" /* BsModalService */]]
        })
    ], RelatoriosModule);
    return RelatoriosModule;
}());

//# sourceMappingURL=relatorios.module.js.map

/***/ }),

/***/ "../../../../../src/app/relatorios/services/relatorios.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelatoriosService; });
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


var RelatoriosService = (function (_super) {
    __extends(RelatoriosService, _super);
    function RelatoriosService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    RelatoriosService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    RelatoriosService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], RelatoriosService);
    return RelatoriosService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=relatorios.service.js.map

/***/ })

});
//# sourceMappingURL=relatorios.module.chunk.js.map