webpackJsonp(["widgets.module"],{

/***/ "../../../../../src/app/widgets/widgets-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidgetsRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__widgets_component__ = __webpack_require__("../../../../../src/app/widgets/widgets.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__widgets_component__["a" /* WidgetsComponent */],
        data: {
            title: 'Widgets'
        }
    }
];
var WidgetsRoutingModule = (function () {
    function WidgetsRoutingModule() {
    }
    WidgetsRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
        })
    ], WidgetsRoutingModule);
    return WidgetsRoutingModule;
}());

//# sourceMappingURL=widgets-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/widgets.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-primary\">\n        <div class=\"card-body pb-0\">\n          <div class=\"btn-group float-right\" dropdown>\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" dropdownToggle>\n              <i class=\"icon-settings\"></i>\n            </button>\n            <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu>\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n            </div>\n          </div>\n          <h4 class=\"mb-0\">9.823</h4>\n          <p>Members online</p>\n        </div>\n        <div class=\"chart-wrapper px-3\" style=\"height:70px;\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"lineChart1Data\"\n          [labels]=\"lineChart1Labels\"\n          [options]=\"lineChart1Options\"\n          [colors]=\"lineChart1Colours\"\n          [legend]=\"lineChart1Legend\"\n          [chartType]=\"lineChart1Type\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-info\">\n        <div class=\"card-body pb-0\">\n          <button type=\"button\" class=\"btn btn-transparent p-0 float-right\">\n            <i class=\"icon-location-pin\"></i>\n          </button>\n          <h4 class=\"mb-0\">9.823</h4>\n          <p>Members online</p>\n        </div>\n        <div class=\"chart-wrapper px-3\" style=\"height:70px;\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"lineChart2Data\"\n          [labels]=\"lineChart2Labels\"\n          [options]=\"lineChart2Options\"\n          [colors]=\"lineChart2Colours\"\n          [legend]=\"lineChart2Legend\"\n          [chartType]=\"lineChart2Type\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-warning\">\n        <div class=\"card-body pb-0\">\n          <div class=\"btn-group float-right\">\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">\n              <i class=\"icon-settings\"></i>\n            </button>\n            <div class=\"dropdown-menu dropdown-menu-right\">\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n            </div>\n          </div>\n          <h4 class=\"mb-0\">9.823</h4>\n          <p>Members online</p>\n        </div>\n        <div class=\"chart-wrapper\" style=\"height:70px;\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"lineChart3Data\"\n          [labels]=\"lineChart3Labels\"\n          [options]=\"lineChart3Options\"\n          [colors]=\"lineChart3Colours\"\n          [legend]=\"lineChart3Legend\"\n          [chartType]=\"lineChart3Type\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-danger\">\n        <div class=\"card-body pb-0\">\n          <div class=\"btn-group float-right\" dropdown>\n            <button type=\"button\" class=\"btn btn-transparent dropdown-toggle p-0\" dropdownToggle>\n              <i class=\"icon-settings\"></i>\n            </button>\n            <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu>\n              <a class=\"dropdown-item\" href=\"#\">Action</a>\n              <a class=\"dropdown-item\" href=\"#\">Another action</a>\n              <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n            </div>\n          </div>\n          <h4 class=\"mb-0\">9.823</h4>\n          <p>Members online</p>\n        </div>\n        <div class=\"chart-wrapper px-3\" style=\"height:70px;\">\n          <canvas baseChart class=\"chart\"\n          [datasets]=\"barChart1Data\"\n          [labels]=\"barChart1Labels\"\n          [options]=\"barChart1Options\"\n          [colors]=\"barChart1Colours\"\n          [legend]=\"barChart1Legend\"\n          [chartType]=\"barChart1Type\"\n          (chartHover)=\"chartHovered($event)\"\n          (chartClick)=\"chartClicked($event)\"></canvas>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-header bg-primary\">\n          <div class=\"font-weight-bold\">\n            <span>SALE</span>\n            <span class=\"float-right\">$1.890,65</span>\n          </div>\n          <div>\n            <span>\n              <small>Today 6:43 AM</small>\n            </span>\n            <span class=\"float-right\">\n              <small>+432,50 (15,78%)</small>\n            </span>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart4Data\"\n            [labels]=\"lineChart4Labels\"\n            [options]=\"lineChart4Options\"\n            [colors]=\"lineChart4Colours\"\n            [legend]=\"lineChart4Legend\"\n            [chartType]=\"lineChart4Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart2Data\"\n            [labels]=\"barChart2Labels\"\n            [options]=\"barChart2Options\"\n            [colors]=\"barChart2Colours\"\n            [legend]=\"barChart2Legend\"\n            [chartType]=\"barChart2Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-header bg-danger\">\n          <div class=\"font-weight-bold\">\n            <span>SALE</span>\n            <span class=\"float-right\">$1.890,65</span>\n          </div>\n          <div>\n            <span>\n              <small>Today 6:43 AM</small>\n            </span>\n            <span class=\"float-right\">\n              <small>+432,50 (15,78%)</small>\n            </span>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart4Data\"\n            [labels]=\"lineChart4Labels\"\n            [options]=\"lineChart4Options\"\n            [colors]=\"lineChart4Colours\"\n            [legend]=\"lineChart4Legend\"\n            [chartType]=\"lineChart4Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart2Data\"\n            [labels]=\"barChart2Labels\"\n            [options]=\"barChart2Options\"\n            [colors]=\"barChart2Colours\"\n            [legend]=\"barChart2Legend\"\n            [chartType]=\"barChart2Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-header bg-success\">\n          <div class=\"font-weight-bold\">\n            <span>SALE</span>\n            <span class=\"float-right\">$1.890,65</span>\n          </div>\n          <div>\n            <span>\n              <small>Today 6:43 AM</small>\n            </span>\n            <span class=\"float-right\">\n              <small>+432,50 (15,78%)</small>\n            </span>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart4Data\"\n            [labels]=\"lineChart4Labels\"\n            [options]=\"lineChart4Options\"\n            [colors]=\"lineChart4Colours\"\n            [legend]=\"lineChart4Legend\"\n            [chartType]=\"lineChart4Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart2Data\"\n            [labels]=\"barChart2Labels\"\n            [options]=\"barChart2Options\"\n            [colors]=\"barChart2Colours\"\n            [legend]=\"barChart2Legend\"\n            [chartType]=\"barChart2Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-header bg-warning\">\n          <div class=\"font-weight-bold\">\n            <span>SALE</span>\n            <span class=\"float-right\">$1.890,65</span>\n          </div>\n          <div>\n            <span>\n              <small>Today 6:43 AM</small>\n            </span>\n            <span class=\"float-right\">\n              <small>+432,50 (15,78%)</small>\n            </span>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart4Data\"\n            [labels]=\"lineChart4Labels\"\n            [options]=\"lineChart4Options\"\n            [colors]=\"lineChart4Colours\"\n            [legend]=\"lineChart4Legend\"\n            [chartType]=\"lineChart4Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n          <div class=\"chart-wrapper\" style=\"height:38px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart2Data\"\n            [labels]=\"barChart2Labels\"\n            [options]=\"barChart2Options\"\n            [colors]=\"barChart2Colours\"\n            [legend]=\"barChart2Legend\"\n            [chartType]=\"barChart2Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">89.9%</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-xs my-3\">\n            <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">12.124</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-xs my-3\">\n            <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">$98.111,00</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-xs my-3\">\n            <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">2 TB</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-xs my-3\">\n            <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-primary\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">89.9%</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-white progress-xs my-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-warning\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">12.124</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-white progress-xs my-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-danger\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">$98.111,00</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-white progress-xs my-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-lg-3\">\n      <div class=\"card text-white bg-info\">\n        <div class=\"card-body\">\n          <div class=\"h4 m-0\">2 TB</div>\n          <div>Lorem ipsum...</div>\n          <div class=\"progress progress-white progress-xs my-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n          <small class=\"text-muted\">Lorem ipsum dolor sit amet enim.</small>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n  <div class=\"row\">\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart3Data\"\n            [labels]=\"barChart3Labels\"\n            [options]=\"barChart3Options\"\n            [colors]=\"barChart3Primary\"\n            [legend]=\"barChart3Legend\"\n            [chartType]=\"barChart3Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart3Data\"\n            [labels]=\"barChart3Labels\"\n            [options]=\"barChart3Options\"\n            [colors]=\"barChart3Danger\"\n            [legend]=\"barChart3Legend\"\n            [chartType]=\"barChart3Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"barChart3Data\"\n            [labels]=\"barChart3Labels\"\n            [options]=\"barChart3Options\"\n            [colors]=\"barChart3Success\"\n            [legend]=\"barChart3Legend\"\n            [chartType]=\"barChart3Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart5Data\"\n            [labels]=\"lineChart5Labels\"\n            [options]=\"lineChart5Options\"\n            [colors]=\"lineChart5Info\"\n            [legend]=\"lineChart5Legend\"\n            [chartType]=\"lineChart5Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart5Data\"\n            [labels]=\"lineChart5Labels\"\n            [options]=\"lineChart5Options\"\n            [colors]=\"lineChart5Success\"\n            [legend]=\"lineChart5Legend\"\n            [chartType]=\"lineChart5Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-md-2 col-sm-4\">\n      <div class=\"card\">\n        <div class=\"card-body text-center\">\n          <div class=\"text-muted small text-uppercase font-weight-bold\">Title</div>\n          <div class=\"h2 py-3\">1,123</div>\n          <div class=\"chart-wrapper \" style=\"height:40px;width:80px;\">\n            <canvas baseChart class=\"chart\"\n            [datasets]=\"lineChart5Data\"\n            [labels]=\"lineChart5Labels\"\n            [options]=\"lineChart5Options\"\n            [colors]=\"lineChart5Warning\"\n            [legend]=\"lineChart5Legend\"\n            [chartType]=\"lineChart5Type\"\n            (chartHover)=\"chartHovered($event)\"\n            (chartClick)=\"chartClicked($event)\"></canvas>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-primary mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-laptop bg-info p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-info mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-warning mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-bell bg-danger p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-danger mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-primary mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n        <div class=\"card-footer px-3 py-2\">\n          <a class=\"font-weight-bold font-xs btn-block text-muted\" href=\"#\">View More <i class=\"fa fa-angle-right float-right font-lg\"></i></a>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-laptop bg-info p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-info mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n        <div class=\"card-footer px-3 py-2\">\n          <a class=\"font-weight-bold font-xs btn-block text-muted\" href=\"#\">View More <i class=\"fa fa-angle-right float-right font-lg\"></i></a>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-warning mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n        <div class=\"card-footer px-3 py-2\">\n          <a class=\"font-weight-bold font-xs btn-block text-muted\" href=\"#\">View More <i class=\"fa fa-angle-right float-right font-lg\"></i></a>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-3 clearfix\">\n          <i class=\"fa fa-bell bg-danger p-3 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-danger mb-0 mt-2\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n        <div class=\"card-footer px-3 py-2\">\n          <a class=\"font-weight-bold font-xs btn-block text-muted\" href=\"#\">View More <i class=\"fa fa-angle-right float-right font-lg\"></i></a>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n  <!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-cogs bg-primary p-4 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-primary mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-laptop bg-info p-4 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-info mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-moon-o bg-warning p-4 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-warning mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-bell bg-danger p-4 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-danger mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-cogs bg-primary p-4 px-5 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-primary mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-laptop bg-info p-4 px-5 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-info mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-moon-o bg-warning p-4 px-5 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-warning mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n    <div class=\"col-6 col-lg-3\">\n      <div class=\"card\">\n        <div class=\"card-body p-0 clearfix\">\n          <i class=\"fa fa-bell bg-danger p-4 px-5 font-2xl mr-3 float-left\"></i>\n          <div class=\"h5 text-danger mb-0 pt-3\">$1.999,50</div>\n          <div class=\"text-muted text-uppercase font-weight-bold font-xs\">Income</div>\n        </div>\n      </div>\n    </div>\n    <!--/.col-->\n  </div>\n  <!--/.row-->\n  <div class=\"row\">\n    <div class=\"col-md-3 col-sm-6\">\n      <div class=\"social-box facebook\">\n        <i class=\"fa fa-facebook\"></i>\n        <ul>\n          <li>\n            <strong>89k</strong>\n            <span>friends</span>\n          </li>\n          <li>\n            <strong>459</strong>\n            <span>feeds</span>\n          </li>\n        </ul>\n      </div>\n      <!--/social-box-->\n    </div><!--/.col-->\n    <div class=\"col-md-3 col-sm-6\">\n      <div class=\"social-box twitter\">\n        <i class=\"fa fa-twitter\"></i>\n        <ul>\n          <li>\n            <strong>973k</strong>\n            <span>followers</span>\n          </li>\n          <li>\n            <strong>1.792</strong>\n            <span>tweets</span>\n          </li>\n        </ul>\n      </div>\n      <!--/social-box-->\n    </div><!--/.col-->\n    <div class=\"col-md-3 col-sm-6\">\n      <div class=\"social-box linkedin\">\n        <i class=\"fa fa-linkedin\"></i>\n        <ul>\n          <li>\n            <strong>500+</strong>\n            <span>contacts</span>\n          </li>\n          <li>\n            <strong>292</strong>\n            <span>feeds</span>\n          </li>\n        </ul>\n      </div>\n      <!--/social-box-->\n    </div><!--/.col-->\n    <div class=\"col-md-3 col-sm-6\">\n      <div class=\"social-box google-plus\">\n        <i class=\"fa fa-google-plus\"></i>\n        <ul>\n          <li>\n            <strong>894</strong>\n            <span>followers</span>\n          </li>\n          <li>\n            <strong>92</strong>\n            <span>circles</span>\n          </li>\n        </ul>\n      </div>\n      <!--/social-box-->\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n  <div class=\"card-group\">\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"h1 text-muted text-right mb-4\">\n          <i class=\"icon-people\"></i>\n        </div>\n        <div class=\"h4 mb-0\">87.500</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Visitors</small>\n        <div class=\"progress progress-xs mt-3 mb-0\">\n          <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"h1 text-muted text-right mb-4\">\n          <i class=\"icon-user-follow\"></i>\n        </div>\n        <div class=\"h4 mb-0\">385</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">New Clients</small>\n        <div class=\"progress progress-xs mt-3 mb-0\">\n          <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"h1 text-muted text-right mb-4\">\n          <i class=\"icon-basket-loaded\"></i>\n        </div>\n        <div class=\"h4 mb-0\">1238</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Products sold</small>\n        <div class=\"progress progress-xs mt-3 mb-0\">\n          <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"h1 text-muted text-right mb-4\">\n          <i class=\"icon-pie-chart\"></i>\n        </div>\n        <div class=\"h4 mb-0\">28%</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Returning Visitors</small>\n        <div class=\"progress progress-xs mt-3 mb-0\">\n          <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-body\">\n        <div class=\"h1 text-muted text-right mb-4\">\n          <i class=\"icon-speedometer\"></i>\n        </div>\n        <div class=\"h4 mb-0\">5:34:11</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Avg. Time</small>\n        <div class=\"progress progress-xs mt-3 mb-0\">\n          <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-people\"></i>\n          </div>\n          <div class=\"h4 mb-0\">87.500</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Visitors</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-user-follow\"></i>\n          </div>\n          <div class=\"h4 mb-0\">385</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">New Clients</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar bg-success\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-basket-loaded\"></i>\n          </div>\n          <div class=\"h4 mb-0\">1238</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Products sold</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-pie-chart\"></i>\n          </div>\n          <div class=\"h4 mb-0\">28%</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Returning Visitors</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-speedometer\"></i>\n          </div>\n          <div class=\"h4 mb-0\">5:34:11</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Avg. Time</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-speech\"></i>\n          </div>\n          <div class=\"h4 mb-0\">972</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Comments</small>\n          <div class=\"progress progress-xs mt-3 mb-0\">\n            <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n\n  <div class=\"row\">\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-info\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-people\"></i>\n          </div>\n          <div class=\"h4 mb-0\">87.500</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Visitors</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-success\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-user-follow\"></i>\n          </div>\n          <div class=\"h4 mb-0\">385</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">New Clients</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-warning\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-basket-loaded\"></i>\n          </div>\n          <div class=\"h4 mb-0\">1238</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Products sold</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-primary\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-pie-chart\"></i>\n          </div>\n          <div class=\"h4 mb-0\">28%</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Returning Visitors</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-danger\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-speedometer\"></i>\n          </div>\n          <div class=\"h4 mb-0\">5:34:11</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Avg. Time</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n    <div class=\"col-sm-6 col-md-2\">\n      <div class=\"card text-white bg-info\">\n        <div class=\"card-body\">\n          <div class=\"h1 text-muted text-right mb-4\">\n            <i class=\"icon-speech\"></i>\n          </div>\n          <div class=\"h4 mb-0\">972</div>\n          <small class=\"text-muted text-uppercase font-weight-bold\">Comments</small>\n          <div class=\"progress progress-white progress-xs mt-3\">\n            <div class=\"progress-bar\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n          </div>\n        </div>\n      </div>\n    </div><!--/.col-->\n  </div><!--/.row-->\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/widgets/widgets.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WidgetsComponent; });
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

var WidgetsComponent = (function () {
    function WidgetsComponent() {
        this.brandPrimary = '#20a8d8';
        this.brandSuccess = '#4dbd74';
        this.brandInfo = '#63c2de';
        this.brandWarning = '#f8cb00';
        this.brandDanger = '#f86c6b';
        // lineChart1
        this.lineChart1Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart1Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent',
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 40 - 5,
                            max: 84 + 5,
                        }
                    }],
            },
            elements: {
                line: {
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart1Colours = [
            {
                backgroundColor: this.brandPrimary,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart1Legend = false;
        this.lineChart1Type = 'line';
        // lineChart2
        this.lineChart2Data = [
            {
                data: [1, 18, 9, 17, 34, 22, 11],
                label: 'Series A'
            }
        ];
        this.lineChart2Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart2Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        gridLines: {
                            color: 'transparent',
                            zeroLineColor: 'transparent'
                        },
                        ticks: {
                            fontSize: 2,
                            fontColor: 'transparent',
                        }
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            display: false,
                            min: 1 - 5,
                            max: 34 + 5,
                        }
                    }],
            },
            elements: {
                line: {
                    tension: 0.00001,
                    borderWidth: 1
                },
                point: {
                    radius: 4,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart2Colours = [
            {
                backgroundColor: this.brandInfo,
                borderColor: 'rgba(255,255,255,.55)'
            }
        ];
        this.lineChart2Legend = false;
        this.lineChart2Type = 'line';
        // lineChart3
        this.lineChart3Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40],
                label: 'Series A'
            }
        ];
        this.lineChart3Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart3Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            elements: {
                line: {
                    borderWidth: 2
                },
                point: {
                    radius: 0,
                    hitRadius: 10,
                    hoverRadius: 4,
                },
            },
            legend: {
                display: false
            }
        };
        this.lineChart3Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.2)',
                borderColor: 'rgba(255,255,255,.55)',
            }
        ];
        this.lineChart3Legend = false;
        this.lineChart3Type = 'line';
        // barChart1
        this.barChart1Data = [
            {
                data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
                label: 'Series A'
            }
        ];
        this.barChart1Labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
        this.barChart1Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        barPercentage: 0.6,
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart1Colours = [
            {
                backgroundColor: 'rgba(255,255,255,.3)',
                borderWidth: 0
            }
        ];
        this.barChart1Legend = false;
        this.barChart1Type = 'bar';
        // lineChart4
        this.lineChart4Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.lineChart4Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.lineChart4Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        points: false,
                    }],
                yAxes: [{
                        display: false,
                    }]
            },
            elements: { point: { radius: 0 } },
            legend: {
                display: false
            }
        };
        this.lineChart4Colours = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                borderWidth: 2
            }
        ];
        this.lineChart4Legend = false;
        this.lineChart4Type = 'line';
        // barChart2
        this.barChart2Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.barChart2Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.barChart2Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        barPercentage: 0.6,
                    }],
                yAxes: [{
                        display: false,
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart2Colours = [
            {
                backgroundColor: 'rgba(0,0,0,.2)',
                borderWidth: 0
            }
        ];
        this.barChart2Legend = false;
        this.barChart2Type = 'bar';
        // barChart3
        this.barChart3Data = [
            {
                data: [4, 18, 9, 17, 34, 22, 11, 3, 15, 12, 18, 9],
                label: 'Series A'
            }
        ];
        this.barChart3Labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.barChart3Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false
                    }],
                yAxes: [{
                        display: false
                    }]
            },
            legend: {
                display: false
            }
        };
        this.barChart3Primary = [
            {
                backgroundColor: this.brandPrimary,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Danger = [
            {
                backgroundColor: this.brandDanger,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Success = [
            {
                backgroundColor: this.brandSuccess,
                borderColor: 'transparent',
                borderWidth: 1
            }
        ];
        this.barChart3Legend = false;
        this.barChart3Type = 'bar';
        // lineChart5
        this.lineChart5Data = [
            {
                data: [65, 59, 84, 84, 51, 55, 40],
                label: 'Series A'
            }
        ];
        this.lineChart5Labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChart5Options = {
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                        display: false,
                        points: false,
                    }],
                yAxes: [{
                        display: false,
                    }]
            },
            elements: { point: { radius: 0 } },
            legend: {
                display: false
            }
        };
        this.lineChart5Info = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandInfo,
                borderWidth: 2
            }
        ];
        this.lineChart5Success = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandInfo,
                borderWidth: 2
            }
        ];
        this.lineChart5Warning = [
            {
                backgroundColor: 'transparent',
                borderColor: this.brandWarning,
                borderWidth: 2
            }
        ];
        this.lineChart5Legend = false;
        this.lineChart5Type = 'line';
    }
    // convert Hex to RGBA
    // public convertHex(hex: string, opacity: number){
    //   hex = hex.replace('#','');
    //   let r = parseInt(hex.substring(0,2), 16);
    //   let g = parseInt(hex.substring(2,4), 16);
    //   let b = parseInt(hex.substring(4,6), 16);
    //
    //   let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    //   return rgba;
    // }
    // events
    WidgetsComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    WidgetsComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    WidgetsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            template: __webpack_require__("../../../../../src/app/widgets/widgets.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], WidgetsComponent);
    return WidgetsComponent;
}());

//# sourceMappingURL=widgets.component.js.map

/***/ }),

/***/ "../../../../../src/app/widgets/widgets.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WidgetsModule", function() { return WidgetsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__widgets_component__ = __webpack_require__("../../../../../src/app/widgets/widgets.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__widgets_routing_module__ = __webpack_require__("../../../../../src/app/widgets/widgets-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var WidgetsModule = (function () {
    function WidgetsModule() {
    }
    WidgetsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__widgets_routing_module__["a" /* WidgetsRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_1_ng2_charts_ng2_charts__["ChartsModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__widgets_component__["a" /* WidgetsComponent */]]
        })
    ], WidgetsModule);
    return WidgetsModule;
}());

//# sourceMappingURL=widgets.module.js.map

/***/ })

});
//# sourceMappingURL=widgets.module.chunk.js.map