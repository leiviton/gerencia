webpackJsonp(["common"],{

/***/ "../../../../../src/app/user/components/logar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app flex-row align-items-center login\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-md-5\">\r\n                <div class=\"card-group mb-0\">\r\n                    <div class=\"card p-4\">\r\n                        <div class=\"card-body\">\r\n                            <div class=\"text-center\"><img src=\"assets/img/leiviton.png\" alt=\"\"></div>\r\n                            <form #myForm=\"ngForm\" (submit)=\"login($event)\">\r\n                                <div class=\"form-group mb-3\">\r\n                                    <label class=\"form-col-form-label\">Usuário</label>\r\n                                    <input type=\"email\" class=\"form-control\"\r\n                                           [ngClass]=\"{'is-invalid': !username.valid && (username.dirty || username.touched)}\"\r\n                                           placeholder=\"Seu email...\" name=\"username\" [(ngModel)]=\"user.username\" id=\"username\"\r\n                                           #username=\"ngModel\" minlength=\"5\" required>\r\n                                    <div class=\"invalid-feedback\" *ngIf=\"!username.valid\">\r\n                                        Verifique o seu usuário.\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group mb-4\">\r\n                                    <label class=\"form-col-form-label\">Senha</label>\r\n                                    <input type=\"password\" class=\"form-control\" [ngClass]=\"{'is-invalid': !password.valid && (password.dirty || password.touched)}\" placeholder=\"Sua senha...\" name=\"password\" [(ngModel)]=\"user.password\" id=\"password\" #password=\"ngModel\" required minlength=\"6\">\r\n                                    <div class=\"invalid-feedback\" *ngIf=\"!password.valid\">\r\n                                        Senha deve ser maior que 5 caracteres.\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-6 text-right\" style=\"right: -50%\">\r\n                                        <button type=\"submit\"  class=\"btn btn-lg btn-success\" [disabled]=\"!myForm.valid\">Acessar</button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ }),

/***/ "../../../../../src/app/user/components/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("../../../../../src/app/user/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
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





var LoginComponent = (function () {
    function LoginComponent(AuthService, router) {
        this.AuthService = AuthService;
        this.router = router;
        this.user = {
            username: null,
            password: null,
        };
        var u = JSON.parse(localStorage.getItem('user') || null);
        if (u && u != null) {
            this.router.navigate(['/dashboard']);
        }
    }
    LoginComponent.prototype.login = function (e) {
        var _this = this;
        e.preventDefault();
        this.showLoading();
        if (!this.user.username || !this.user.password) {
            return;
        }
        var data = {
            grant_type: 'password',
            client_id: __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].client_id,
            client_secret: __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].client_secret,
            username: this.user.username,
            password: this.user.password,
            scope: ''
        };
        this.AuthService.login(data).then(function (res) {
            document.cookie = "token=" + res.access_token + "; expires=" + res.expires_in;
            localStorage.setItem('token', res.access_token);
            _this.AuthService.setAccessToken();
            _this.AuthService.getUser()
                .then(function (res) {
                localStorage.setItem('user', JSON.stringify(res));
                _this.hideLoading();
                _this.router.navigate(['/dashboard']);
            });
        }).catch(function () {
            _this.hideLoading();
        });
    };
    LoginComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").hide();
    };
    LoginComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__(".container-loading").show();
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/user/components/logar.component.html"),
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _b || Object])
    ], LoginComponent);
    return LoginComponent;
    var _a, _b;
}());

//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/user/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_http_service__ = __webpack_require__("../../../../../src/app/app-http.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__ = __webpack_require__("../../../../rxjs/add/operator/toPromise.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_toPromise__);
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




var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.eventEmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        return _this;
    }
    AuthService.prototype.builder = function (resource) {
        if (resource === void 0) { resource = ''; }
        return _super.prototype.builder.call(this, 'auth/' + resource);
    };
    AuthService.prototype.getUser = function () {
        return this.builder()
            .list({}, 'user');
    };
    AuthService.prototype.changePassword = function (data) {
        var observable = this.http.post(this.url + '/change-password', data, { headers: this.header });
        return observable.toPromise()
            .then(function (res) {
            return res.json() || {};
        });
    };
    AuthService.prototype.editProfile = function (data) {
        var observable = this.http.post(this.url + '/edit-profile', data, { headers: this.header });
        return observable.toPromise()
            .then(function (res) {
            return res.json() || {};
        });
    };
    AuthService.prototype.login = function (data) {
        var _this = this;
        var observable = this.http.post(__WEBPACK_IMPORTED_MODULE_2__environments_environment__["a" /* environment */].server_url + '/oauth/token', data);
        return this.toPromise(observable).then(function (res) {
            _this.eventEmitter.emit();
            return res;
        });
    };
    AuthService.prototype.logout = function () {
        var _this = this;
        var observable = this.http.get(this.url + 'logout', { headers: this.header });
        return this.toPromise(observable).then(function (res) {
            _this.eventEmitter.emit();
            return res;
        });
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
    ], AuthService);
    return AuthService;
}(__WEBPACK_IMPORTED_MODULE_1__app_http_service__["a" /* AppHttpService */]));

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../ngx-phone-mask/ngx-phone-mask/ngx-phone-mask.es5.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NgxPhoneMaskModule; });
/* unused harmony export ɵa */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");



var noop = function () { };
var masks = [
    '(1',
    '(11',
    '(11) 1',
    '(11) 11',
    '(11) 111',
    '(11) 1111',
    '(11) 1111-1',
    '(11) 1111-11',
    '(11) 1111-111',
    '(11) 1111-1111',
    '(11) 1111-11111'
];
var clean = function (number) {
    return number
        .toString()
        .replace(/[^\d\^]/gm, '');
};
var format = function (number) {
    var /** @type {?} */ lastCharIndex = 0;
    var /** @type {?} */ cleanValue = clean(number);
    var /** @type {?} */ charCount = cleanValue.replace(/\^/gm, '').length;
    if (charCount === 0) {
        return {
            formatted: '',
            cursorPosition: 0
        };
    }
    var /** @type {?} */ mask = masks[charCount - 1];
    if (charCount > 1 && !mask) {
        return null;
    }
    var /** @type {?} */ cursorPosition;
    var /** @type {?} */ formatted = mask.split('').map(function (c, i) {
        if (c === '1') {
            if (cleanValue[lastCharIndex] == '^') {
                cursorPosition = i + 1;
                lastCharIndex++;
            }
            lastCharIndex++;
            return cleanValue[lastCharIndex - 1];
        }
        else {
            return c;
        }
    }).join('');
    if (!cursorPosition) {
        cursorPosition = formatted.length;
    }
    cursorPosition++; // because of '+'
    return {
        formatted: formatted,
        cursorPosition: cursorPosition
    };
};
var NgxPhoneMaskDirective = (function () {
    /**
     * @param {?} input
     */
    function NgxPhoneMaskDirective(input) {
        this.input = input;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.valueType = 'clean';
        this.showMask = true;
        this.oldValue = '';
    }
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.updateInputView = function () {
        var /** @type {?} */ input = this.input.nativeElement;
        var /** @type {?} */ cursorPosition = input.selectionStart;
        var /** @type {?} */ value = this._value;
        var /** @type {?} */ valueWithCursor = value.substring(0, cursorPosition) + '^' + value.substring(cursorPosition);
        var /** @type {?} */ formatted = format(valueWithCursor);
        if (!formatted) {
            input.value = this.oldValue;
            return;
        }
        var /** @type {?} */ newValue = formatted.formatted;
        if (newValue != input.value) {
            input.value = newValue;
            input.setSelectionRange(formatted.cursorPosition, formatted.cursorPosition);
        }
        this.oldValue = newValue;
        this.emitValue(newValue);
    };
    /**
     * @param {?} v
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.emitValue = function (v) {
        var /** @type {?} */ value;
        switch (this.valueType) {
            case 'clean':
                value = v.replace(/[^\d\+]/gm, '');
                break;
            case 'full':
                value = v;
                break;
        }
        this.onChangeCallback(value);
    };
    /**
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.onInput = function () {
        this._value = this.input.nativeElement.value;
        this.updateInputView();
    };
    Object.defineProperty(NgxPhoneMaskDirective.prototype, "value", {
        /**
         * @param {?} v
         * @return {?}
         */
        set: function (v) {
            var /** @type {?} */ value = v ? v : '';
            this._value = value;
            this.updateInputView();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.writeValue = function (value) {
        this.value = value;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    NgxPhoneMaskDirective.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    return NgxPhoneMaskDirective;
}());
NgxPhoneMaskDirective.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"], args: [{
                selector: '[ngxPhoneMask]',
                providers: [
                    {
                        provide: __WEBPACK_IMPORTED_MODULE_2__angular_forms__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["forwardRef"])(function () { return NgxPhoneMaskDirective; }),
                        multi: true
                    }
                ]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskDirective.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"], },
]; };
NgxPhoneMaskDirective.propDecorators = {
    'valueType': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'showMask': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"] },],
    'onInput': [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"], args: ['input',] },],
};
var NgxPhoneMaskModule = (function () {
    function NgxPhoneMaskModule() {
    }
    return NgxPhoneMaskModule;
}());
NgxPhoneMaskModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"], args: [{
                imports: [
                    __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
                ],
                declarations: [NgxPhoneMaskDirective],
                exports: [NgxPhoneMaskDirective]
            },] },
];
/**
 * @nocollapse
 */
NgxPhoneMaskModule.ctorParameters = function () { return []; };
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-phone-mask.es5.js.map


/***/ })

});
//# sourceMappingURL=common.chunk.js.map