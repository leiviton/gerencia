webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/dashboard/components/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n    <div class=\"row\">\n        <div class=\"col-sm-6 col-lg-3\">\n                <div class=\"card text-white bg-primary\">\n                    <div class=\"card-body pb-0\">\n                        <h4 class=\"mb-0\">{{ pendentes }}</h4>\n                        <p>Pedidos pendentes</p>\n                    </div>\n                </div>\n        </div><!--/.col-->\n        <div class=\"col-sm-6 col-lg-3\">\n                <div class=\"card text-white bg-success\">\n                    <div class=\"card-body pb-0\">\n                        <h4 class=\"mb-0\">{{ fechado }}</h4>\n                        <p>Pedidos fechados</p>\n                    </div>\n                </div>\n        </div><!--/.col-->\n        <div class=\"col-sm-6 col-lg-3\">\n            <div class=\"card text-white bg-warning\">\n                <div class=\"card-body pb-0\">\n                    <h4 class=\"mb-0\">{{ cancelados}}</h4>\n                    <p>Pedidos local</p>\n                </div>\n            </div>\n        </div><!--/.col-->\n        <div class=\"col-sm-6 col-lg-3\">\n            <div class=\"card text-white bg-danger\">\n                <div class=\"card-body pb-0\">\n                    <h4 class=\"mb-0\">{{ deliverys }}</h4>\n                    <p>Pedidos delivery</p>\n                </div>\n            </div>\n        </div><!--/.col-->\n    </div><!--/.row-->\n\n    <div class=\"row col-md-12\" *ngIf=\"mesas.data.length != 0\">\n      <div class=\"col-6 col-lg-3\" *ngFor=\"let o of mesas.data\">\n        <div class=\"card\">\n          <a [routerLink]=\"['/orders/edit/'+ o.id]\">\n            <div class=\"card-body p-3 clearfix\">\n              <i class=\"bg-danger p-3 font-2xl mr-3 float-left mesao\" [ngClass]=\"{'bg-success': o.mesa.data.status == 0, 'bg-danger': o.mesa.data.status === 1, 'bg-': o.mesa.data.status === 2}\"></i>\n              <div class=\"h5 text-primary mb-0 mt-2\"></div>\n              <div class=\"text-muted text-uppercase font-weight-bold font-xs\">{{ o.mesa.data.name }}</div>\n            </div>\n          </a>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"row col-md-12\" *ngIf=\"mesas.data.length == 0\">\n      <div class=\"col-6 col-lg-3\" *ngFor=\"let o of mesaslivres.data\">\n        <div class=\"card\">\n            <div class=\"card-body p-3 clearfix\">\n              <i class=\"bg-danger p-3 font-2xl mr-3 float-left mesao\" [ngClass]=\"{'bg-success': o.status == 0, 'bg-danger': o.status === 1, 'bg-': o.status === 2}\"></i>\n              <div class=\"h5 text-primary mb-0 mt-2\"></div>\n              <div class=\"text-muted text-uppercase font-weight-bold font-xs\">{{ o.name }}</div>\n            </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n        <div class=\"card-header\">\n            Bar Chart\n            <div class=\"card-actions\">\n                <a href=\"http://www.chartjs.org\">\n                    <small class=\"text-muted\">docs</small>\n                </a>\n            </div>\n        </div>\n        <div class=\"card-body\">\n            <div class=\"chart-wrapper\">\n                <canvas baseChart class=\"chart\"\n                        [datasets]=\"barChartData\"\n                        [labels]=\"barChartLabels\"\n                        [options]=\"barChartOptions\"\n                        [legend]=\"barChartLegend\"\n                        [chartType]=\"barChartType\"\n                        (chartHover)=\"chartHovered($event)\"\n                        (chartClick)=\"chartClicked($event)\"></canvas>\n            </div>\n        </div>\n    </div>\n</div>\n<router-outlet></router-outlet>"

/***/ }),

/***/ "../../../../../src/app/dashboard/components/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_dashboard_service__ = __webpack_require__("../../../../../src/app/dashboard/services/dashboard.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(route, httpService) {
        this.route = route;
        this.httpService = httpService;
        this.data = '';
        this.mesas = {
            data: []
        };
        this.mesaslivres = {
            data: []
        };
        this.pendentes = 0;
        this.fechado = 0;
        this.deliverys = 0;
        this.cancelados = 0;
        // barChart
        this.barChartOptions = {
            scaleShowVerticalLines: false,
            responsive: true
        };
        this.barChartLabels = ['Janeiro', 'Fevereiro', 'Março'];
        this.barChartType = 'bar';
        this.barChartLegend = true;
        this.barChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos' },
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos' }
        ];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.showLoading();
        // generate random values for mainChart
        this.httpService.setAccessToken();
        this.httpService.builder()
            .list({}, 'mesas')
            .then(function (res) {
            _this.mesas = res;
        });
        this.httpService.builder()
            .list({}, 'mesas/all')
            .then(function (res) {
            _this.mesaslivres = res;
        });
        this.httpService.builder()
            .list({}, 'contador/?type=1')
            .then(function (res) {
            _this.deliverys = res;
        });
        this.httpService.builder()
            .list({}, 'orders')
            .then(function (res) {
            _this.pendentes = res.data.length;
        });
        this.httpService.builder()
            .list({}, 'contador/?close=3')
            .then(function (res) {
            _this.fechado = res;
        });
        this.httpService.builder()
            .list({}, 'contador/?local=1')
            .then(function (res) {
            _this.cancelados = res;
        });
        setTimeout(function () {
            _this.hideLoading();
        }, 3000);
    };
    DashboardComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__("#bifrostBarSpinner").hide();
    };
    DashboardComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_2_jquery__("#bifrostBarSpinner").show();
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/dashboard/components/dashboard.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_dashboard_service__["a" /* DashboardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_dashboard_service__["a" /* DashboardService */]) === "function" && _b || Object])
    ], DashboardComponent);
    return DashboardComponent;
    var _a, _b;
}());

//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/components/password.component.html":
/***/ (function(module, exports) {

module.exports = "<div tabindex=\"-1\" class=\"modal fade\" id=\"infoModal\" role=\"dialog\" aria-hidden=\"true\" aria-labelledby=\"myModalLabel\" style=\"display: none;\">\r\n    <div class=\"modal-dialog modal-sm modal-info\" role=\"document\">\r\n        <div class=\"modal-content\">\r\n            <div class=\"modal-header cadastro text-center\">\r\n                <h6 class=\"modal-title\">Mudar senha</h6>\r\n                <button class=\"close\" aria-label=\"Close\" type=\"button\" data-dismiss=\"modal\" (click)=\"close()\">\r\n                    <span aria-hidden=\"true\">×</span>\r\n                </button>\r\n            </div>\r\n            <div class=\"modal-body\">\r\n                <form #myForm=\"ngForm\">\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-5 col-form-label\" for=\"password\">Nova senha: <span class=\"text-danger\">*</span></label>\r\n                        <div class=\"col-md-7\">\r\n                            <input type=\"password\" id=\"password\" name=\"password\"\r\n                                   [ngClass]=\"{'is-invalid': user.password_confirmation !== user.password, 'is-valid': user.password == user.password_confirmation}\"\r\n                                   [(ngModel)]=\"user.password\" class=\"form-control\" placeholder=\"Nova senha\" required>\r\n                            <div class=\"invalid-feedback text-validation\" *ngIf=\"user.password !== user.password_confirmation\">\r\n                                <p>Campo repita senha diferente do campo nova senha.</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                    <div class=\"form-group row\">\r\n                        <label class=\"col-md-5 col-form-label\" for=\"repeat_p\">Repita a senha:</label>\r\n                        <div class=\"col-md-7\">\r\n                            <input type=\"password\" id=\"repeat_p\" name=\"repeat_p\"\r\n                                   [ngClass]=\"{'is-invalid': user.password_confirmation !== user.password, 'is-valid': user.password == user.password_confirmation}\"\r\n                                   [(ngModel)]=\"user.password_confirmation\" class=\"form-control\" placeholder=\"Repita a senha\" required>\r\n                            <div class=\"invalid-feedback text-validation\" *ngIf=\"user.password !== user.password_confirmation\">\r\n                                <p>Campo repita senha diferente do campo nova senha.</p>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                </form>\r\n            </div>\r\n            <div class=\"modal-footer cadastro\">\r\n                <div class=\"modal-button\">\r\n                    <button class=\"btn btn-danger\" type=\"button\" (click)=\"close()\"><i class=\"fa fa-arrow-circle-left\"></i> Cancelar</button>\r\n                    <button class=\"btn btn-success\" type=\"button\" (click)=\"save(user)\" [disabled]=\"user.password !== user.password_confirmation\"><i class=\"fa fa-arrow-circle-right\"></i> Salvar</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n        <!-- /.modal-content -->\r\n    </div>\r\n    <!-- /.modal-dialog -->\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/dashboard/components/password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_dashboard_service__ = __webpack_require__("../../../../../src/app/dashboard/services/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_message_service__ = __webpack_require__("../../../../../src/app/app-message.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PasswordComponent = (function () {
    function PasswordComponent(authService, service, toast, router) {
        this.authService = authService;
        this.service = service;
        this.toast = toast;
        this.router = router;
        this.user = {
            password: null,
            password_confirmation: null
        };
        this.validar = false;
    }
    PasswordComponent.prototype.ngOnInit = function () {
        var _this = this;
        var u = { id: null };
        u = JSON.parse(localStorage.getItem('user') || null);
        this.id = u.id;
        this.showLoading();
        __WEBPACK_IMPORTED_MODULE_3_jquery__('#infoModal').on('show.bs.modal').show().addClass('show');
        setTimeout(function () {
            _this.hideLoading();
        }, 300);
    };
    PasswordComponent.prototype.save = function (e) {
        var _this = this;
        this.showLoading();
        if (this.user.password && this.user.password === this.user.password_confirmation) {
            this.authService.builder('password').update(this.id, this.user)
                .then(function () {
                _this.hideLoading();
                _this.toast.message('Sucesso', 'Nova senha definida com sucesso', 'success');
                _this.router.navigate(['dashboard']);
            });
        }
        else {
            this.toast.message('Erro', 'Não foi possivel salvar', 'error');
        }
    };
    PasswordComponent.prototype.valid = function () {
        var _this = this;
        var u = JSON.parse(localStorage.getItem('user') || null);
        var data = {
            grant_type: 'password',
            client_id: __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].client_id,
            client_secret: __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].client_secret,
            username: u.email,
            password: this.password_at,
            scope: ''
        };
        this.service.login(data).then(function (res) {
            _this.validar = true;
        }).catch(function () {
            _this.validar = false;
            _this.toast.message('Erro', 'Senha incorreta', 'error');
        });
    };
    PasswordComponent.prototype.close = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__('#successModal').hide();
        this.router.navigate(['/dashboard']);
    };
    PasswordComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__("#bifrostBarSpinner").hide();
    };
    PasswordComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_3_jquery__("#bifrostBarSpinner").show();
    };
    PasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/dashboard/components/password.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_dashboard_service__["a" /* DashboardService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_dashboard_service__["a" /* DashboardService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__user_services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__user_services_auth_service__["a" /* AuthService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__app_message_service__["a" /* AppMessageService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__app_message_service__["a" /* AppMessageService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
    ], PasswordComponent);
    return PasswordComponent;
    var _a, _b, _c, _d;
}());

//# sourceMappingURL=password.component.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/components/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_password_component__ = __webpack_require__("../../../../../src/app/dashboard/components/password.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_dashboard_component__["a" /* DashboardComponent */],
        data: {
            title: 'Dashboard'
        },
        children: [
            {
                path: 'password',
                component: __WEBPACK_IMPORTED_MODULE_3__components_password_component__["a" /* PasswordComponent */],
                data: {
                    title: 'Nova senha'
                }
            }
        ]
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    DashboardRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], DashboardRoutingModule);
    return DashboardRoutingModule;
}());

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__ = __webpack_require__("../../../../ngx-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_dashboard_component__ = __webpack_require__("../../../../../src/app/dashboard/components/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dashboard_routing_module__ = __webpack_require__("../../../../../src/app/dashboard/dashboard-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_password_component__ = __webpack_require__("../../../../../src/app/dashboard/components/password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_dashboard_service__ = __webpack_require__("../../../../../src/app/dashboard/services/dashboard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__user_services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__dashboard_routing_module__["a" /* DashboardRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_charts_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_4_ngx_bootstrap_dropdown__["a" /* BsDropdownModule */],
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5__components_dashboard_component__["a" /* DashboardComponent */], __WEBPACK_IMPORTED_MODULE_7__components_password_component__["a" /* PasswordComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_8__services_dashboard_service__["a" /* DashboardService */], __WEBPACK_IMPORTED_MODULE_9__user_services_auth_service__["a" /* AuthService */]]
        })
    ], DashboardModule);
    return DashboardModule;
}());

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ "../../../../../src/app/dashboard/services/dashboard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardService; });
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


var DashboardService = (function (_super) {
    __extends(DashboardService, _super);
    function DashboardService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"];
        return _this;
    }
    DashboardService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, resource);
    };
    DashboardService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], DashboardService);
    return DashboardService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=dashboard.service.js.map

/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map