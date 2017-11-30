webpackJsonp(["user.module"],{

/***/ "../../../../../src/app/user/components/password.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col s12\">\r\n        <h4><i class=\"material-icons\">keyboard_arrow_right</i>Senha <small class=\"grey-text\">troque sua senha</small></h4>\r\n    </div>\r\n\r\n    <div class=\"col s12\">\r\n        <div class=\"card-panel\">\r\n            <form class=\"row\" (submit)=\"save($event)\">\r\n                <div class=\"input-field col s12\">\r\n                    <input id=\"password\" type=\"password\" name=\"password\" [(ngModel)]=\"user.password\">\r\n                    <label for=\"password\">Senha</label>\r\n                </div>\r\n\r\n                <div class=\"input-field col s12\">\r\n                    <input id=\"password_confirmation\" type=\"password\" name=\"password_confirmation\" [(ngModel)]=\"user.password_confirmation\">\r\n                    <label for=\"password_confirmation\">Confirmação de senha</label>\r\n                </div>\r\n\r\n                <div class=\"input-field col s12\">\r\n                    <input type=\"submit\" value=\"Salvar\" class=\"btn\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/components/password.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
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
    function PasswordComponent(authService) {
        this.authService = authService;
        this.user = {
            password: null,
            password_confirmation: null
        };
    }
    PasswordComponent.prototype.save = function (e) {
        e.preventDefault();
        if (this.user.password && this.user.password !== '' && this.user.password === this.user.password_confirmation) {
            this.authService.builder().changePassword(this.user)
                .then(function () {
            });
        }
        else {
        }
    };
    PasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-password',
            template: __webpack_require__("../../../../../src/app/user/components/password.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
    ], PasswordComponent);
    return PasswordComponent;
    var _a;
}());

//# sourceMappingURL=password.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/components/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\r\n    <div class=\"col s12\">\r\n        <h4><i class=\"material-icons\">keyboard_arrow_right</i>Meus dados <small class=\"grey-text\">atualize suas informações</small></h4>\r\n    </div>\r\n\r\n    <div class=\"col s12\">\r\n        <div class=\"card-panel\">\r\n            <form class=\"row\" (submit)=\"save($event)\">\r\n                <div class=\"input-field col s12\">\r\n                    <input id=\"name\" type=\"text\" name=\"name\" [(ngModel)]=\"user.name\">\r\n                    <label for=\"name\">Nome</label>\r\n                </div>\r\n        \r\n                <div class=\"input-field col s12\">\r\n                    <input id=\"email\" type=\"email\" name=\"email\" [(ngModel)]=\"user.email\">\r\n                    <label for=\"email\">E-mail</label>\r\n                </div>\r\n        \r\n                <div class=\"input-field col s12\">\r\n                    <input type=\"submit\" value=\"Salvar\" class=\"btn\">\r\n                </div>\r\n            </form>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ "../../../../../src/app/user/components/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ProfileComponent = (function () {
    function ProfileComponent(authService) {
        this.authService = authService;
        this.user = {
            name: null,
            email: null
        };
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.getUser()
            .then(function (user) {
            _this.user = user;
        });
    };
    ProfileComponent.prototype.save = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.user.name && this.user.email !== '') {
            this.authService.builder()
                .editProfile(this.user)
                .then(function (user) {
                _this.user = user;
            });
        }
        else {
            this.authService.getUser()
                .then(function (user) {
                _this.user = user;
            });
        }
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("../../../../../src/app/user/components/profile.component.html")
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
    ], ProfileComponent);
    return ProfileComponent;
    var _a;
}());

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/user.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserModule", function() { return UserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_password_component__ = __webpack_require__("../../../../../src/app/user/components/password.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_profile_component__ = __webpack_require__("../../../../../src/app/user/components/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var UserModule = (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__components_password_component__["a" /* PasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_4__components_profile_component__["a" /* ProfileComponent */],
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */]]
        })
    ], UserModule);
    return UserModule;
}());

//# sourceMappingURL=user.module.js.map

/***/ })

});
//# sourceMappingURL=user.module.chunk.js.map