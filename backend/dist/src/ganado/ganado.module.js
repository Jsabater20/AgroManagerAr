"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanadoModule = void 0;
const common_1 = require("@nestjs/common");
const ganado_controller_1 = require("./ganado.controller");
const ganado_service_1 = require("./ganado.service");
let GanadoModule = class GanadoModule {
};
exports.GanadoModule = GanadoModule;
exports.GanadoModule = GanadoModule = __decorate([
    (0, common_1.Module)({
        controllers: [ganado_controller_1.GanadoController],
        providers: [ganado_service_1.GanadoService],
    })
], GanadoModule);
//# sourceMappingURL=ganado.module.js.map