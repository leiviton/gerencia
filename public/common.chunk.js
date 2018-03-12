webpackJsonp(["common"],{

/***/ "../../../../../src/app/user/components/logar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app flex-row align-items-center login\">\r\n    <div class=\"container\">\r\n        <div class=\"row justify-content-center\">\r\n            <div class=\"col-md-5\">\r\n                <div class=\"card-group mb-0\">\r\n                    <div class=\"card p-4\">\r\n                        <div class=\"card-body\">\r\n                            <div class=\"text-center\"><img src=\"assets/img/leiviton.png\" alt=\"\"></div>\r\n                            <form #myForm=\"ngForm\" (submit)=\"login($event)\">\r\n                                <div class=\"form-group mb-3\">\r\n                                    <label class=\"form-col-form-label\">Usuário</label>\r\n                                    <input type=\"text\" class=\"form-control\"\r\n                                           [ngClass]=\"{'is-invalid': !username.valid && (username.dirty || username.touched),'is-valid': username.valid}\"\r\n                                           placeholder=\"Seu username...\" name=\"username\" [(ngModel)]=\"user.username\" id=\"username\"\r\n                                           #username=\"ngModel\" minlength=\"4\" required>\r\n                                    <div class=\"invalid-feedback\" *ngIf=\"!username.valid\">\r\n                                        Verifique o seu usuário.\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"form-group mb-4\">\r\n                                    <label class=\"form-col-form-label\">Senha</label>\r\n                                    <input type=\"password\" class=\"form-control\" [ngClass]=\"{'is-invalid': !password.valid && (password.dirty || password.touched),'is-valid':password.valid}\" placeholder=\"Sua senha...\" name=\"password\" [(ngModel)]=\"user.password\" id=\"password\" #password=\"ngModel\" required minlength=\"6\">\r\n                                    <div class=\"invalid-feedback\" *ngIf=\"!password.valid\">\r\n                                        Senha deve ser maior que 5 caracteres.\r\n                                    </div>\r\n                                </div>\r\n                                <div class=\"row\">\r\n                                    <div class=\"col-6 text-right\" style=\"right: -50%\">\r\n                                        <button type=\"submit\"  class=\"btn btn-lg btn-success\" [disabled]=\"!myForm.valid\">Acessar</button>\r\n                                    </div>\r\n                                </div>\r\n                            </form>\r\n                        </div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n"

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
        localStorage.setItem('user', '');
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
                localStorage.setItem('user', JSON.stringify(res.data));
                _this.hideLoading();
                _this.router.navigate(['/dashboard']);
            });
        }).catch(function () {
            _this.hideLoading();
        });
    };
    LoginComponent.prototype.hideLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__("#bifrostBarSpinner").hide();
    };
    LoginComponent.prototype.showLoading = function () {
        __WEBPACK_IMPORTED_MODULE_4_jquery__("#bifrostBarSpinner").show();
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

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../cuppa-ng2-grid/cuppa-ng2-dataGrid.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_app_angular2_dataGrid_angular2_dataGrid__ = __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__src_app_angular2_dataGrid_angular2_dataGrid__["a"]; });

//# sourceMappingURL=cuppa-ng2-dataGrid.js.map

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.styles.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\n*{\r\n    box-sizing: border-box;\r\n}\r\n.cuppa-grid{\r\n    background: rgb(247, 247, 247);\r\n    border: 2px solid #1976D2;\r\n    font-family: 'Arial',sans-serif;\r\n    font-size: 14px;\r\n    width: 100%;\r\n    margin: 0px auto;\r\n}\r\n.container{\r\n    width: calc(100% - 1px);\r\n    height: 310px;\r\n    overflow: auto;\r\n    position: relative;\r\n    padding: 0px;\r\n    background:#fff;\r\n    border-top: 1px solid #888;\r\n}\r\n.scroller{\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 1px;\r\n    height: 300px;\r\n}\r\n.vrow{\r\n    width: 100%;\r\n    border-bottom: 1px solid #e4e4e4;\r\n    height: 31px;\r\n    cursor: pointer;\r\n    transition: all .1s linear;\r\n}\r\n.cuppa-grid > .container > .vrow:hover{\r\n    background: rgba(25, 118, 210, 0.31);\r\n}\r\n.vcolumn{\r\n    display: inline-block;\r\n    padding: 8px;\r\n    border-right: 1px solid #e4e4e4;\r\n    \r\n}\r\n.vrow > .vcolumn:last-child{\r\n    border-right: 0px;\r\n}\r\n.header-row > .vcolumn{\r\n    cursor: pointer;\r\n}\r\n.header-row > .vcolumn:hover{\r\n    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.21);\r\n\r\n}\r\n.cuppa-grid{\r\n    position:relative;\r\n}\r\n.header-row{\r\n    width: calc(100% - 10px);\r\n    background: rgb(247, 247, 247);\r\n    border-bottom: 0px;\r\n    color: #000;\r\n    text-transform: capitalize;\r\n    font-weight: bold;\r\n   \r\n}\r\n::-webkit-scrollbar {\r\n    width: 10px;\r\n}\r\n \r\n::-webkit-scrollbar-track {\r\n    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.3); \r\n    border-radius: 0px;\r\n    background: #f5f5f5;\r\n}\r\n \r\n::-webkit-scrollbar-thumb {\r\n    border-radius: 0px;\r\n    background: #ccc;\r\n}\r\n.description{\r\n    text-align: center;\r\n}\r\n.header-title{\r\n    float: left;\r\n}\r\n.header-sort{\r\n    position: relative;\r\nfloat: right;\r\n    width: 30px;\r\n    height: 15px;\r\n}\r\n.icon{\r\n    cursor: pointer;\r\n    position: absolute;\r\n    font-size: 23px;\r\n    top: -2px;\r\n}\r\n.grid-main-header{\r\n    background: #1976D2;\r\n    height: 40px;\r\n    padding: 6px;\r\n}\r\n.grid-search{\r\n    display: inline-block;\r\n    float: right;\r\n}\r\n.grid-search > input{\r\n    border-color: transparent;\r\n    height: 25px;\r\n    border-radius: 3px;\r\n    border-top-right-radius: 0px;\r\n    border-bottom-right-radius: 0px;\r\n    float: left;\r\n}\r\n.grid-search > button{\r\n    display: inline-block;\r\n    padding: 0px 6px;\r\n    background: #144c98;\r\n    border: none;\r\n    height: 25px;\r\n    float: left;\r\n    color: #fff;\r\n    border-top-right-radius:3px;\r\n    border-bottom-right-radius: 3px;\r\n}\r\n.grid-title{\r\n    float: left;\r\n    line-height: 27px;\r\n    color: #fff;\r\n    font-weight: bold;\r\n    font-size: 16px;\r\n}\r\n.grid-footer{\r\n    padding: 5px 5px 0px 5px;\r\n    background: #f1f1f1;\r\n    border-top: 1px solid #ccc;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.template.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"cuppa-grid\">\r\n     <div class=\"vrow grid-main-header\">\r\n         <div class=\"grid-title\">\r\n             <c-templateRenderer *ngIf=\"heading\" [data]=\"heading\"></c-templateRenderer>\r\n             <span *ngIf=\"!heading\">{{config.title}}</span>\r\n         </div>\r\n         <div class=\"grid-search\">\r\n             <input (blur)=\"search($event)\" (keyup)=\"filter($event)\">\r\n            <button>Search</button>\r\n         </div>\r\n     </div>\r\n    <div class=\"header-row vrow\" >\r\n        <span *ngIf=\"columns.toArray().length == 0\">\r\n            <div *ngFor=\"let column of headSection;let k = index\" class=\"vcolumn\" [columnWidth]=\"headSection\" (click)=\"sortColumn(column)\" >\r\n                <span class=\"header-title\">{{column.title}} </span>\r\n                <div class=\"header-sort\" *ngIf=\"config.sort\">\r\n                    <i *ngIf=\"column.sorting=='desc'\" class=\"icon pe-7s-angle-up pe-lg\"></i>\r\n                    <i *ngIf=\"column.sorting=='asc'\" class=\"icon pe-7s-angle-down pe-lg\"></i>\r\n                </div>\r\n            </div>\r\n        </span>\r\n        <span *ngIf=\"columns\">\r\n            <div *ngFor=\"let column of headSection;let k = index\" class=\"vcolumn\" [columnWidth]=\"columns\" (click)=\"sortColumn(column)\" >\r\n                <span class=\"header-title\">{{column.title}} </span>\r\n                <div class=\"header-sort\" *ngIf=\"config.sort\">\r\n                    <i *ngIf=\"column.sorting=='desc'\" class=\"icon pe-7s-angle-up pe-lg\"></i>\r\n                    <i *ngIf=\"column.sorting=='asc'\" class=\"icon pe-7s-angle-down pe-lg\"></i>\r\n                </div>\r\n            </div>\r\n        </span>\r\n        </div>\r\n    <div class=\"container\">\r\n        <div style=\"position:absolute;top:0;left:0;opacity:0;width:1px;\" [setContainerHeight]=\"totalHeight\"></div>\r\n        <div *ngFor=\"let row of chunkArray;let i = index\" class=\"vrow\" style=\"position: absolute;\" [ngStyle]=\"{'height': config.itemHeight+'px'}\" [styleProp]=\"chunkIndex[i]\" (click)=\"onRowClick(row)\">\r\n            <span *ngIf=\"columns.toArray().length == 0\">\r\n            <div *ngFor=\"let obj of row | keys\" class=\"vcolumn\" [columnWidth]=\"headSection\">\r\n                {{obj.value}}\r\n\r\n            </div>\r\n            </span>\r\n            <span *ngIf=\"columns\">\r\n            <div *ngFor=\"let col of columns\" class=\"vcolumn\" [ngStyle]=\"{'height': config.itemHeight+'px'}\" [columnWidth]=\"columns\" [ngStyle]=\"{'width': (columns.length/3)+'px'}\">\r\n                <c-columnTemplateRenderer *ngIf=\"col.template\" [data]=\"col\" [rowData]=\"row\"></c-columnTemplateRenderer>\r\n                <span *ngIf=\"!col.template\">{{getColumnData(row, col.field)}}</span>\r\n            </div>\r\n            </span>\r\n        </div>\r\n    </div>\r\n    <div class=\"grid-footer\">\r\n        <label>Total Rows:</label> <span>{{totalRows}}</span>\r\n    </div>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export CuppaDataGrid */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CuppaDataGridModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keypipe__ = __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/keypipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__ = __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/dataGrid-directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__column__ = __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/column.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CuppaDataGrid = (function () {
    function CuppaDataGrid(_elementRef, sanitizer) {
        this._elementRef = _elementRef;
        this.sanitizer = sanitizer;
        this.rowClick = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.dataArray = ["111", "222", "333", "444"];
        this.chunkIndex = [];
        this.cachedItems = [];
    }
    CuppaDataGrid.prototype.ngOnInit = function () {
        this.width = (this.config && this.config.w + 'px') || '100%';
        this.height = (this.config && this.config.h + 'px') || '100%';
        this.itemHeight = this.config.itemHeight;
        this.items = this.config.items;
        this.totalRows = this.config.totalRows || (this.config.items && this.config.items.length);
        this.screenItemsLen = Math.ceil(this.config.h / this.itemHeight);
        this.cachedItemsLen = this.screenItemsLen * 3;
        this.totalHeight = this.itemHeight * this.totalRows;
        this.scroller = this.createScroller(this.totalHeight);
        this.maxBuffer = this.screenItemsLen * this.itemHeight;
        this.lastScrolled = 0;
        this.generateHeadArray(this.items[0]);
        this._renderChunk(0, this.cachedItemsLen / 2);
    };
    CuppaDataGrid.prototype.ngAfterViewInit = function () {
        this._elementRef.nativeElement.getElementsByClassName("container")[0].addEventListener('scroll', this.onScroll.bind(this));
    };
    CuppaDataGrid.prototype.ngAfterContentInit = function () {
    };
    CuppaDataGrid.prototype.generateHeadArray = function (row) {
        this.headSection = [];
        var ind = 0;
        for (var prop in row) {
            var tempObj = { "title": prop, "sorting": "", 'prop': prop, 'index': ind };
            if (this.config.sort) {
                for (var sortprop in this.config.sort) {
                    if (this.config.sort.hasOwnProperty(prop)) {
                        tempObj.sorting = this.config.sort[prop];
                        this.sortColumn(tempObj);
                    }
                }
            }
            this.headSection.push(tempObj);
            ind++;
        }
    };
    CuppaDataGrid.prototype.changeData = function () {
        var temArr = ["1", "2", "3", "4"];
        this.dataArray = temArr;
    };
    CuppaDataGrid.prototype.getHeightVal = function (i) {
        var c = i * 31;
        c = c + "px";
        return c;
    };
    CuppaDataGrid.prototype.onScroll = function (e) {
        this.scrollTop = e.target.scrollTop;
        this.updateView(this.scrollTop);
    };
    CuppaDataGrid.prototype.updateView = function (scrollTop) {
        var scrollPos = scrollTop ? scrollTop : 0;
        var first = (scrollPos / this.itemHeight) - this.screenItemsLen;
        var firstTemp = "" + first;
        first = parseInt(firstTemp) < 0 ? 0 : parseInt(firstTemp);
        this._renderChunk(first, this.cachedItemsLen);
        this.lastRepaintY = scrollPos;
    };
    /*
        Create Row DOM, iterating through the data array
    */
    CuppaDataGrid.prototype._renderChunk = function (fromPos, howMany) {
        this.chunkArray = [];
        this.chunkIndex = [];
        var finalItem = fromPos + howMany;
        if (finalItem > this.totalRows)
            finalItem = this.totalRows;
        for (var i = fromPos; i < finalItem; i++) {
            this.chunkIndex.push((i * this.itemHeight) + 'px');
            this.chunkArray.push(this.items[i]);
        }
    };
    CuppaDataGrid.prototype.createScroller = function (h) {
        var scroller = document.createElement('div');
        scroller.style.opacity = "0";
        scroller.style.position = 'absolute';
        scroller.style.top = "0";
        scroller.style.left = "0";
        scroller.style.width = '1px';
        scroller.style.height = h + 'px';
        return scroller;
    };
    CuppaDataGrid.prototype.sortColumn = function (column) {
        if (this.config.sort) {
            for (var t = 0; t < this.headSection.length; t++) {
                if (t != column.index) {
                    this.headSection[t].sorting = "";
                }
            }
            if (column.sorting == "") {
                column.sorting = "asc";
            }
            this.items = this.mergeSort(this.items, column.prop, column.sorting);
            this.updateView(this.scrollTop);
            if (column.sorting == "asc") {
                column.sorting = "desc";
            }
            else if (column.sorting == "desc") {
                column.sorting = "asc";
            }
        }
    };
    CuppaDataGrid.prototype.mergeSort = function (arr, column, sortType) {
        var len = arr.length;
        if (len < 2)
            return arr;
        var mid = Math.floor(len / 2), left = arr.slice(0, mid), right = arr.slice(mid);
        var temp = this.merge(this.mergeSort(left, column, sortType), this.mergeSort(right, column, sortType), column, sortType);
        return temp;
    };
    CuppaDataGrid.prototype.merge = function (left, right, column, sortType) {
        var result = [], lLen = left.length, rLen = right.length, l = 0, r = 0;
        while (l < lLen && r < rLen) {
            if (this.compare(left[l], right[r], column, sortType) <= 0) {
                result.push(left[l++]);
            }
            else {
                result.push(right[r++]);
            }
        }
        //remaining part needs to be addred to the result
        return result.concat(left.slice(l)).concat(right.slice(r));
    };
    CuppaDataGrid.prototype.compare = function (item1, item2, column, sortType) {
        if (typeof item1[column] == 'string') {
            if (item1[column].toLowerCase() < item2[column].toLowerCase() && sortType == 'asc')
                return -1;
            if (item1[column].toLowerCase() > item2[column].toLowerCase() && sortType == 'asc')
                return 1;
            if (item1[column].toLowerCase() > item2[column].toLowerCase() && sortType == 'desc')
                return -1;
            if (item1[column].toLowerCase() < item2[column].toLowerCase() && sortType == 'desc')
                return 1;
            else
                return 0;
        }
        else if (typeof item1[column] == 'number') {
            if (item1[column] < item2[column] && sortType == 'asc')
                return -1;
            if (item1[column] > item2[column] && sortType == 'asc')
                return 1;
            if (item1[column] > item2[column] && sortType == 'desc')
                return -1;
            if (item1[column] < item2[column] && sortType == 'desc')
                return 1;
            else
                return 0;
        }
    };
    CuppaDataGrid.prototype.search = function (evt) {
        var filteredElems = [];
        if (evt.target.value.toString() != '') {
            this.items.filter(function (el) {
                for (var prop in el) {
                    if (el[prop].toString().toLowerCase().indexOf(evt.target.value.toString().toLowerCase()) >= 0) {
                        filteredElems.push(el);
                    }
                }
            });
            this.cachedItems = this.items;
            this.totalHeight = this.itemHeight * filteredElems.length;
            this.totalRows = filteredElems.length;
            this.items = [];
            this.items = filteredElems;
            this.updateView(this.scrollTop);
        }
        else if (evt.target.value.toString() == '' && this.cachedItems.length > 0) {
            this.items = [];
            this.items = this.cachedItems;
            this.totalHeight = this.itemHeight * this.items.length;
            this.totalRows = this.items.length;
            this.updateView(this.scrollTop);
        }
    };
    CuppaDataGrid.prototype.filter = function (evt) {
        if (evt.target.value.toString() == '' && this.cachedItems.length > 0) {
            this.items = [];
            this.items = this.cachedItems;
            this.cachedItems = [];
            this.totalHeight = this.itemHeight * this.items.length;
            this.totalRows = this.items.length;
            this.updateView(this.scrollTop);
        }
    };
    CuppaDataGrid.prototype.onRowClick = function (row) {
        this.rowClick.emit(row);
    };
    CuppaDataGrid.prototype.getColumnData = function (row, field) {
        return row[field];
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], CuppaDataGrid.prototype, "datalist", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CuppaDataGrid.prototype, "config", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('onRowSelect'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
    ], CuppaDataGrid.prototype, "rowClick", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_5__column__["c" /* Heading */]),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__column__["c" /* Heading */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__column__["c" /* Heading */]) === "function" && _b || Object)
    ], CuppaDataGrid.prototype, "heading", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_5__column__["a" /* Column */]),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _c || Object)
    ], CuppaDataGrid.prototype, "columns", void 0);
    CuppaDataGrid = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'cuppa-datagrid',
            template: __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.template.html"),
            styles: [__webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/angular2-dataGrid.styles.css"), __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/icons.css")]
        }),
        __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["c" /* DomSanitizer */]) === "function" && _e || Object])
    ], CuppaDataGrid);
    return CuppaDataGrid;
    var _a, _b, _c, _d, _e;
}());

var CuppaDataGridModule = (function () {
    function CuppaDataGridModule() {
    }
    CuppaDataGridModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_2__angular_common__["CommonModule"]],
            declarations: [CuppaDataGrid, __WEBPACK_IMPORTED_MODULE_3__keypipe__["a" /* KeysPipe */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["c" /* styleDirective */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["b" /* columnWidth */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["a" /* SetContainerHeight */], __WEBPACK_IMPORTED_MODULE_5__column__["a" /* Column */], __WEBPACK_IMPORTED_MODULE_5__column__["c" /* Heading */], __WEBPACK_IMPORTED_MODULE_5__column__["d" /* TemplateRenderer */], __WEBPACK_IMPORTED_MODULE_5__column__["b" /* ColumnTemplateRenderer */]],
            exports: [CuppaDataGrid, __WEBPACK_IMPORTED_MODULE_3__keypipe__["a" /* KeysPipe */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["c" /* styleDirective */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["b" /* columnWidth */], __WEBPACK_IMPORTED_MODULE_4__dataGrid_directive__["a" /* SetContainerHeight */], __WEBPACK_IMPORTED_MODULE_5__column__["a" /* Column */], __WEBPACK_IMPORTED_MODULE_5__column__["c" /* Heading */], __WEBPACK_IMPORTED_MODULE_5__column__["d" /* TemplateRenderer */], __WEBPACK_IMPORTED_MODULE_5__column__["b" /* ColumnTemplateRenderer */]]
        })
    ], CuppaDataGridModule);
    return CuppaDataGridModule;
}());

//# sourceMappingURL=angular2-dataGrid.js.map

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/column.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Column; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Heading; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return TemplateRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ColumnTemplateRenderer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Column = (function () {
    function Column() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String)
    ], Column.prototype, "field", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) === "function" && _a || Object)
    ], Column.prototype, "template", void 0);
    Column = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'c-column',
            template: ""
        }),
        __metadata("design:paramtypes", [])
    ], Column);
    return Column;
    var _a;
}());

var Heading = (function () {
    function Heading() {
    }
    Heading.prototype.ngAfterContentInit = function () {
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChild"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["TemplateRef"]) === "function" && _a || Object)
    ], Heading.prototype, "template", void 0);
    Heading = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'c-heading',
            template: ""
        }),
        __metadata("design:paramtypes", [])
    ], Heading);
    return Heading;
    var _a;
}());

var TemplateRenderer = (function () {
    function TemplateRenderer(viewContainer) {
        this.viewContainer = viewContainer;
    }
    TemplateRenderer.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.data.template, {
            '\$implicit': this.data
        });
    };
    TemplateRenderer.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TemplateRenderer.prototype, "data", void 0);
    TemplateRenderer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'c-templateRenderer',
            template: ""
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _a || Object])
    ], TemplateRenderer);
    return TemplateRenderer;
    var _a;
}());

var ColumnTemplateRenderer = (function () {
    function ColumnTemplateRenderer(viewContainer) {
        this.viewContainer = viewContainer;
    }
    ColumnTemplateRenderer.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.data.template, {
            '\$implicit': this.data,
            'rowData': this.rowData
        });
    };
    ColumnTemplateRenderer.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ColumnTemplateRenderer.prototype, "data", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ColumnTemplateRenderer.prototype, "rowData", void 0);
    ColumnTemplateRenderer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'c-columnTemplateRenderer',
            template: ""
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"]) === "function" && _a || Object])
    ], ColumnTemplateRenderer);
    return ColumnTemplateRenderer;
    var _a;
}());

//# sourceMappingURL=column.js.map

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/dataGrid-directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return styleDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return columnWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SetContainerHeight; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var styleDirective = (function () {
    function styleDirective(el) {
        this.el = el;
    }
    styleDirective.prototype.ngOnInit = function () {
        this.el.nativeElement.style.top = this.styleVal;
    };
    styleDirective.prototype.ngOnChanges = function () {
        this.el.nativeElement.style.top = this.styleVal;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('styleProp'),
        __metadata("design:type", Number)
    ], styleDirective.prototype, "styleVal", void 0);
    styleDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[styleProp]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], styleDirective);
    return styleDirective;
    var _a;
}());

var columnWidth = (function () {
    function columnWidth(el) {
        this.el = el;
    }
    columnWidth.prototype.ngOnInit = function () {
        this.el.nativeElement.style.width = (100 / this.columns.length) + "%";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('columnWidth'),
        __metadata("design:type", Array)
    ], columnWidth.prototype, "columns", void 0);
    columnWidth = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[columnWidth]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], columnWidth);
    return columnWidth;
    var _a;
}());

var SetContainerHeight = (function () {
    function SetContainerHeight(el) {
        this.el = el;
    }
    SetContainerHeight.prototype.ngOnInit = function () {
        this.el.nativeElement.style.height = this.containerHeight + "px";
    };
    SetContainerHeight.prototype.ngOnChanges = function () {
        this.el.nativeElement.style.height = this.containerHeight + "px";
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('setContainerHeight'),
        __metadata("design:type", Array)
    ], SetContainerHeight.prototype, "containerHeight", void 0);
    SetContainerHeight = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[setContainerHeight]'
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
    ], SetContainerHeight);
    return SetContainerHeight;
    var _a;
}());

//# sourceMappingURL=dataGrid-directive.js.map

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.eot":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Pe-icon-7-stroke.71394c0c7ad6c1e7d5c7.eot";

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.eot?d7yf1v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Pe-icon-7-stroke.71394c0c7ad6c1e7d5c7.eot";

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.svg?d7yf1v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Pe-icon-7-stroke.dedf26989fdd78c33cb9.svg";

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.woff?d7yf1v":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "Pe-icon-7-stroke.b38ef310874bdd008ac1.woff";

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/icons.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\r\n\tfont-family: 'Pe-icon-7-stroke';\r\n\tsrc:url(" + __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.eot?d7yf1v") + ");\r\n\tsrc:url(" + __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.eot") + "?#iefixd7yf1v) format('embedded-opentype'),\r\n\t\turl(" + __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.woff?d7yf1v") + ") format('woff'),\r\n\t\turl(" + __webpack_require__("../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/fonts/Pe-icon-7-stroke.svg?d7yf1v") + "#Pe-icon-7-stroke) format('svg');\r\n\tfont-weight: normal;\r\n\tfont-style: normal;\r\n}\r\n\r\n[class^=\"pe-7s-\"], [class*=\" pe-7s-\"] {\r\n\tdisplay: inline-block;\r\n\tfont-family: 'Pe-icon-7-stroke';\r\n\tspeak: none;\r\n\tfont-style: normal;\r\n\tfont-weight: normal;\r\n\tfont-variant: normal;\r\n\ttext-transform: none;\r\n\tline-height: 1;\r\n\r\n\t/* Better Font Rendering =========== */\r\n\t-webkit-font-smoothing: antialiased;\r\n\t-moz-osx-font-smoothing: grayscale;\r\n}\r\n\r\n.pe-7s-album:before {\r\n\tcontent: \"\\E6AA\";\r\n}\r\n.pe-7s-arc:before {\r\n\tcontent: \"\\E6AB\";\r\n}\r\n.pe-7s-back-2:before {\r\n\tcontent: \"\\E6AC\";\r\n}\r\n.pe-7s-bandaid:before {\r\n\tcontent: \"\\E6AD\";\r\n}\r\n.pe-7s-car:before {\r\n\tcontent: \"\\E6AE\";\r\n}\r\n.pe-7s-diamond:before {\r\n\tcontent: \"\\E6AF\";\r\n}\r\n.pe-7s-door-lock:before {\r\n\tcontent: \"\\E6B0\";\r\n}\r\n.pe-7s-eyedropper:before {\r\n\tcontent: \"\\E6B1\";\r\n}\r\n.pe-7s-female:before {\r\n\tcontent: \"\\E6B2\";\r\n}\r\n.pe-7s-gym:before {\r\n\tcontent: \"\\E6B3\";\r\n}\r\n.pe-7s-hammer:before {\r\n\tcontent: \"\\E6B4\";\r\n}\r\n.pe-7s-headphones:before {\r\n\tcontent: \"\\E6B5\";\r\n}\r\n.pe-7s-helm:before {\r\n\tcontent: \"\\E6B6\";\r\n}\r\n.pe-7s-hourglass:before {\r\n\tcontent: \"\\E6B7\";\r\n}\r\n.pe-7s-leaf:before {\r\n\tcontent: \"\\E6B8\";\r\n}\r\n.pe-7s-magic-wand:before {\r\n\tcontent: \"\\E6B9\";\r\n}\r\n.pe-7s-male:before {\r\n\tcontent: \"\\E6BA\";\r\n}\r\n.pe-7s-map-2:before {\r\n\tcontent: \"\\E6BB\";\r\n}\r\n.pe-7s-next-2:before {\r\n\tcontent: \"\\E6BC\";\r\n}\r\n.pe-7s-paint-bucket:before {\r\n\tcontent: \"\\E6BD\";\r\n}\r\n.pe-7s-pendrive:before {\r\n\tcontent: \"\\E6BE\";\r\n}\r\n.pe-7s-photo:before {\r\n\tcontent: \"\\E6BF\";\r\n}\r\n.pe-7s-piggy:before {\r\n\tcontent: \"\\E6C0\";\r\n}\r\n.pe-7s-plugin:before {\r\n\tcontent: \"\\E6C1\";\r\n}\r\n.pe-7s-refresh-2:before {\r\n\tcontent: \"\\E6C2\";\r\n}\r\n.pe-7s-rocket:before {\r\n\tcontent: \"\\E6C3\";\r\n}\r\n.pe-7s-settings:before {\r\n\tcontent: \"\\E6C4\";\r\n}\r\n.pe-7s-shield:before {\r\n\tcontent: \"\\E6C5\";\r\n}\r\n.pe-7s-smile:before {\r\n\tcontent: \"\\E6C6\";\r\n}\r\n.pe-7s-usb:before {\r\n\tcontent: \"\\E6C7\";\r\n}\r\n.pe-7s-vector:before {\r\n\tcontent: \"\\E6C8\";\r\n}\r\n.pe-7s-wine:before {\r\n\tcontent: \"\\E6C9\";\r\n}\r\n.pe-7s-cloud-upload:before {\r\n\tcontent: \"\\E68A\";\r\n}\r\n.pe-7s-cash:before {\r\n\tcontent: \"\\E68C\";\r\n}\r\n.pe-7s-close:before {\r\n\tcontent: \"\\E680\";\r\n}\r\n.pe-7s-bluetooth:before {\r\n\tcontent: \"\\E68D\";\r\n}\r\n.pe-7s-cloud-download:before {\r\n\tcontent: \"\\E68B\";\r\n}\r\n.pe-7s-way:before {\r\n\tcontent: \"\\E68E\";\r\n}\r\n.pe-7s-close-circle:before {\r\n\tcontent: \"\\E681\";\r\n}\r\n.pe-7s-id:before {\r\n\tcontent: \"\\E68F\";\r\n}\r\n.pe-7s-angle-up:before {\r\n\tcontent: \"\\E682\";\r\n}\r\n.pe-7s-wristwatch:before {\r\n\tcontent: \"\\E690\";\r\n}\r\n.pe-7s-angle-up-circle:before {\r\n\tcontent: \"\\E683\";\r\n}\r\n.pe-7s-world:before {\r\n\tcontent: \"\\E691\";\r\n}\r\n.pe-7s-angle-right:before {\r\n\tcontent: \"\\E684\";\r\n}\r\n.pe-7s-volume:before {\r\n\tcontent: \"\\E692\";\r\n}\r\n.pe-7s-angle-right-circle:before {\r\n\tcontent: \"\\E685\";\r\n}\r\n.pe-7s-users:before {\r\n\tcontent: \"\\E693\";\r\n}\r\n.pe-7s-angle-left:before {\r\n\tcontent: \"\\E686\";\r\n}\r\n.pe-7s-user-female:before {\r\n\tcontent: \"\\E694\";\r\n}\r\n.pe-7s-angle-left-circle:before {\r\n\tcontent: \"\\E687\";\r\n}\r\n.pe-7s-up-arrow:before {\r\n\tcontent: \"\\E695\";\r\n}\r\n.pe-7s-angle-down:before {\r\n\tcontent: \"\\E688\";\r\n}\r\n.pe-7s-switch:before {\r\n\tcontent: \"\\E696\";\r\n}\r\n.pe-7s-angle-down-circle:before {\r\n\tcontent: \"\\E689\";\r\n}\r\n.pe-7s-scissors:before {\r\n\tcontent: \"\\E697\";\r\n}\r\n.pe-7s-wallet:before {\r\n\tcontent: \"\\E600\";\r\n}\r\n.pe-7s-safe:before {\r\n\tcontent: \"\\E698\";\r\n}\r\n.pe-7s-volume2:before {\r\n\tcontent: \"\\E601\";\r\n}\r\n.pe-7s-volume1:before {\r\n\tcontent: \"\\E602\";\r\n}\r\n.pe-7s-voicemail:before {\r\n\tcontent: \"\\E603\";\r\n}\r\n.pe-7s-video:before {\r\n\tcontent: \"\\E604\";\r\n}\r\n.pe-7s-user:before {\r\n\tcontent: \"\\E605\";\r\n}\r\n.pe-7s-upload:before {\r\n\tcontent: \"\\E606\";\r\n}\r\n.pe-7s-unlock:before {\r\n\tcontent: \"\\E607\";\r\n}\r\n.pe-7s-umbrella:before {\r\n\tcontent: \"\\E608\";\r\n}\r\n.pe-7s-trash:before {\r\n\tcontent: \"\\E609\";\r\n}\r\n.pe-7s-tools:before {\r\n\tcontent: \"\\E60A\";\r\n}\r\n.pe-7s-timer:before {\r\n\tcontent: \"\\E60B\";\r\n}\r\n.pe-7s-ticket:before {\r\n\tcontent: \"\\E60C\";\r\n}\r\n.pe-7s-target:before {\r\n\tcontent: \"\\E60D\";\r\n}\r\n.pe-7s-sun:before {\r\n\tcontent: \"\\E60E\";\r\n}\r\n.pe-7s-study:before {\r\n\tcontent: \"\\E60F\";\r\n}\r\n.pe-7s-stopwatch:before {\r\n\tcontent: \"\\E610\";\r\n}\r\n.pe-7s-star:before {\r\n\tcontent: \"\\E611\";\r\n}\r\n.pe-7s-speaker:before {\r\n\tcontent: \"\\E612\";\r\n}\r\n.pe-7s-signal:before {\r\n\tcontent: \"\\E613\";\r\n}\r\n.pe-7s-shuffle:before {\r\n\tcontent: \"\\E614\";\r\n}\r\n.pe-7s-shopbag:before {\r\n\tcontent: \"\\E615\";\r\n}\r\n.pe-7s-share:before {\r\n\tcontent: \"\\E616\";\r\n}\r\n.pe-7s-server:before {\r\n\tcontent: \"\\E617\";\r\n}\r\n.pe-7s-search:before {\r\n\tcontent: \"\\E618\";\r\n}\r\n.pe-7s-film:before {\r\n\tcontent: \"\\E6A5\";\r\n}\r\n.pe-7s-science:before {\r\n\tcontent: \"\\E619\";\r\n}\r\n.pe-7s-disk:before {\r\n\tcontent: \"\\E6A6\";\r\n}\r\n.pe-7s-ribbon:before {\r\n\tcontent: \"\\E61A\";\r\n}\r\n.pe-7s-repeat:before {\r\n\tcontent: \"\\E61B\";\r\n}\r\n.pe-7s-refresh:before {\r\n\tcontent: \"\\E61C\";\r\n}\r\n.pe-7s-add-user:before {\r\n\tcontent: \"\\E6A9\";\r\n}\r\n.pe-7s-refresh-cloud:before {\r\n\tcontent: \"\\E61D\";\r\n}\r\n.pe-7s-paperclip:before {\r\n\tcontent: \"\\E69C\";\r\n}\r\n.pe-7s-radio:before {\r\n\tcontent: \"\\E61E\";\r\n}\r\n.pe-7s-note2:before {\r\n\tcontent: \"\\E69D\";\r\n}\r\n.pe-7s-print:before {\r\n\tcontent: \"\\E61F\";\r\n}\r\n.pe-7s-network:before {\r\n\tcontent: \"\\E69E\";\r\n}\r\n.pe-7s-prev:before {\r\n\tcontent: \"\\E620\";\r\n}\r\n.pe-7s-mute:before {\r\n\tcontent: \"\\E69F\";\r\n}\r\n.pe-7s-power:before {\r\n\tcontent: \"\\E621\";\r\n}\r\n.pe-7s-medal:before {\r\n\tcontent: \"\\E6A0\";\r\n}\r\n.pe-7s-portfolio:before {\r\n\tcontent: \"\\E622\";\r\n}\r\n.pe-7s-like2:before {\r\n\tcontent: \"\\E6A1\";\r\n}\r\n.pe-7s-plus:before {\r\n\tcontent: \"\\E623\";\r\n}\r\n.pe-7s-left-arrow:before {\r\n\tcontent: \"\\E6A2\";\r\n}\r\n.pe-7s-play:before {\r\n\tcontent: \"\\E624\";\r\n}\r\n.pe-7s-key:before {\r\n\tcontent: \"\\E6A3\";\r\n}\r\n.pe-7s-plane:before {\r\n\tcontent: \"\\E625\";\r\n}\r\n.pe-7s-joy:before {\r\n\tcontent: \"\\E6A4\";\r\n}\r\n.pe-7s-photo-gallery:before {\r\n\tcontent: \"\\E626\";\r\n}\r\n.pe-7s-pin:before {\r\n\tcontent: \"\\E69B\";\r\n}\r\n.pe-7s-phone:before {\r\n\tcontent: \"\\E627\";\r\n}\r\n.pe-7s-plug:before {\r\n\tcontent: \"\\E69A\";\r\n}\r\n.pe-7s-pen:before {\r\n\tcontent: \"\\E628\";\r\n}\r\n.pe-7s-right-arrow:before {\r\n\tcontent: \"\\E699\";\r\n}\r\n.pe-7s-paper-plane:before {\r\n\tcontent: \"\\E629\";\r\n}\r\n.pe-7s-delete-user:before {\r\n\tcontent: \"\\E6A7\";\r\n}\r\n.pe-7s-paint:before {\r\n\tcontent: \"\\E62A\";\r\n}\r\n.pe-7s-bottom-arrow:before {\r\n\tcontent: \"\\E6A8\";\r\n}\r\n.pe-7s-notebook:before {\r\n\tcontent: \"\\E62B\";\r\n}\r\n.pe-7s-note:before {\r\n\tcontent: \"\\E62C\";\r\n}\r\n.pe-7s-next:before {\r\n\tcontent: \"\\E62D\";\r\n}\r\n.pe-7s-news-paper:before {\r\n\tcontent: \"\\E62E\";\r\n}\r\n.pe-7s-musiclist:before {\r\n\tcontent: \"\\E62F\";\r\n}\r\n.pe-7s-music:before {\r\n\tcontent: \"\\E630\";\r\n}\r\n.pe-7s-mouse:before {\r\n\tcontent: \"\\E631\";\r\n}\r\n.pe-7s-more:before {\r\n\tcontent: \"\\E632\";\r\n}\r\n.pe-7s-moon:before {\r\n\tcontent: \"\\E633\";\r\n}\r\n.pe-7s-monitor:before {\r\n\tcontent: \"\\E634\";\r\n}\r\n.pe-7s-micro:before {\r\n\tcontent: \"\\E635\";\r\n}\r\n.pe-7s-menu:before {\r\n\tcontent: \"\\E636\";\r\n}\r\n.pe-7s-map:before {\r\n\tcontent: \"\\E637\";\r\n}\r\n.pe-7s-map-marker:before {\r\n\tcontent: \"\\E638\";\r\n}\r\n.pe-7s-mail:before {\r\n\tcontent: \"\\E639\";\r\n}\r\n.pe-7s-mail-open:before {\r\n\tcontent: \"\\E63A\";\r\n}\r\n.pe-7s-mail-open-file:before {\r\n\tcontent: \"\\E63B\";\r\n}\r\n.pe-7s-magnet:before {\r\n\tcontent: \"\\E63C\";\r\n}\r\n.pe-7s-loop:before {\r\n\tcontent: \"\\E63D\";\r\n}\r\n.pe-7s-look:before {\r\n\tcontent: \"\\E63E\";\r\n}\r\n.pe-7s-lock:before {\r\n\tcontent: \"\\E63F\";\r\n}\r\n.pe-7s-lintern:before {\r\n\tcontent: \"\\E640\";\r\n}\r\n.pe-7s-link:before {\r\n\tcontent: \"\\E641\";\r\n}\r\n.pe-7s-like:before {\r\n\tcontent: \"\\E642\";\r\n}\r\n.pe-7s-light:before {\r\n\tcontent: \"\\E643\";\r\n}\r\n.pe-7s-less:before {\r\n\tcontent: \"\\E644\";\r\n}\r\n.pe-7s-keypad:before {\r\n\tcontent: \"\\E645\";\r\n}\r\n.pe-7s-junk:before {\r\n\tcontent: \"\\E646\";\r\n}\r\n.pe-7s-info:before {\r\n\tcontent: \"\\E647\";\r\n}\r\n.pe-7s-home:before {\r\n\tcontent: \"\\E648\";\r\n}\r\n.pe-7s-help2:before {\r\n\tcontent: \"\\E649\";\r\n}\r\n.pe-7s-help1:before {\r\n\tcontent: \"\\E64A\";\r\n}\r\n.pe-7s-graph3:before {\r\n\tcontent: \"\\E64B\";\r\n}\r\n.pe-7s-graph2:before {\r\n\tcontent: \"\\E64C\";\r\n}\r\n.pe-7s-graph1:before {\r\n\tcontent: \"\\E64D\";\r\n}\r\n.pe-7s-graph:before {\r\n\tcontent: \"\\E64E\";\r\n}\r\n.pe-7s-global:before {\r\n\tcontent: \"\\E64F\";\r\n}\r\n.pe-7s-gleam:before {\r\n\tcontent: \"\\E650\";\r\n}\r\n.pe-7s-glasses:before {\r\n\tcontent: \"\\E651\";\r\n}\r\n.pe-7s-gift:before {\r\n\tcontent: \"\\E652\";\r\n}\r\n.pe-7s-folder:before {\r\n\tcontent: \"\\E653\";\r\n}\r\n.pe-7s-flag:before {\r\n\tcontent: \"\\E654\";\r\n}\r\n.pe-7s-filter:before {\r\n\tcontent: \"\\E655\";\r\n}\r\n.pe-7s-file:before {\r\n\tcontent: \"\\E656\";\r\n}\r\n.pe-7s-expand1:before {\r\n\tcontent: \"\\E657\";\r\n}\r\n.pe-7s-exapnd2:before {\r\n\tcontent: \"\\E658\";\r\n}\r\n.pe-7s-edit:before {\r\n\tcontent: \"\\E659\";\r\n}\r\n.pe-7s-drop:before {\r\n\tcontent: \"\\E65A\";\r\n}\r\n.pe-7s-drawer:before {\r\n\tcontent: \"\\E65B\";\r\n}\r\n.pe-7s-download:before {\r\n\tcontent: \"\\E65C\";\r\n}\r\n.pe-7s-display2:before {\r\n\tcontent: \"\\E65D\";\r\n}\r\n.pe-7s-display1:before {\r\n\tcontent: \"\\E65E\";\r\n}\r\n.pe-7s-diskette:before {\r\n\tcontent: \"\\E65F\";\r\n}\r\n.pe-7s-date:before {\r\n\tcontent: \"\\E660\";\r\n}\r\n.pe-7s-cup:before {\r\n\tcontent: \"\\E661\";\r\n}\r\n.pe-7s-culture:before {\r\n\tcontent: \"\\E662\";\r\n}\r\n.pe-7s-crop:before {\r\n\tcontent: \"\\E663\";\r\n}\r\n.pe-7s-credit:before {\r\n\tcontent: \"\\E664\";\r\n}\r\n.pe-7s-copy-file:before {\r\n\tcontent: \"\\E665\";\r\n}\r\n.pe-7s-config:before {\r\n\tcontent: \"\\E666\";\r\n}\r\n.pe-7s-compass:before {\r\n\tcontent: \"\\E667\";\r\n}\r\n.pe-7s-comment:before {\r\n\tcontent: \"\\E668\";\r\n}\r\n.pe-7s-coffee:before {\r\n\tcontent: \"\\E669\";\r\n}\r\n.pe-7s-cloud:before {\r\n\tcontent: \"\\E66A\";\r\n}\r\n.pe-7s-clock:before {\r\n\tcontent: \"\\E66B\";\r\n}\r\n.pe-7s-check:before {\r\n\tcontent: \"\\E66C\";\r\n}\r\n.pe-7s-chat:before {\r\n\tcontent: \"\\E66D\";\r\n}\r\n.pe-7s-cart:before {\r\n\tcontent: \"\\E66E\";\r\n}\r\n.pe-7s-camera:before {\r\n\tcontent: \"\\E66F\";\r\n}\r\n.pe-7s-call:before {\r\n\tcontent: \"\\E670\";\r\n}\r\n.pe-7s-calculator:before {\r\n\tcontent: \"\\E671\";\r\n}\r\n.pe-7s-browser:before {\r\n\tcontent: \"\\E672\";\r\n}\r\n.pe-7s-box2:before {\r\n\tcontent: \"\\E673\";\r\n}\r\n.pe-7s-box1:before {\r\n\tcontent: \"\\E674\";\r\n}\r\n.pe-7s-bookmarks:before {\r\n\tcontent: \"\\E675\";\r\n}\r\n.pe-7s-bicycle:before {\r\n\tcontent: \"\\E676\";\r\n}\r\n.pe-7s-bell:before {\r\n\tcontent: \"\\E677\";\r\n}\r\n.pe-7s-battery:before {\r\n\tcontent: \"\\E678\";\r\n}\r\n.pe-7s-ball:before {\r\n\tcontent: \"\\E679\";\r\n}\r\n.pe-7s-back:before {\r\n\tcontent: \"\\E67A\";\r\n}\r\n.pe-7s-attention:before {\r\n\tcontent: \"\\E67B\";\r\n}\r\n.pe-7s-anchor:before {\r\n\tcontent: \"\\E67C\";\r\n}\r\n.pe-7s-albums:before {\r\n\tcontent: \"\\E67D\";\r\n}\r\n.pe-7s-alarm:before {\r\n\tcontent: \"\\E67E\";\r\n}\r\n.pe-7s-airplay:before {\r\n\tcontent: \"\\E67F\";\r\n}\r\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../cuppa-ng2-grid/src/app/angular2-dataGrid/keypipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return KeysPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push({ key: key, value: value[key] });
        }
        return keys;
    };
    KeysPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({ name: 'keys' })
    ], KeysPipe);
    return KeysPipe;
}());

//# sourceMappingURL=keypipe.js.map

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