"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GanadoController = void 0;
const common_1 = require("@nestjs/common");
const ganado_service_1 = require("./ganado.service");
const ganado_dto_1 = require("./dto/ganado.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let GanadoController = class GanadoController {
    ganadoService;
    constructor(ganadoService) {
        this.ganadoService = ganadoService;
    }
    findAll(req) {
        return this.ganadoService.findAll(req.user.id);
    }
    findOne(id, req) {
        return this.ganadoService.findOne(id, req.user.id);
    }
    create(dto, req) {
        return this.ganadoService.create(dto, req.user.id);
    }
    update(id, dto, req) {
        return this.ganadoService.update(id, dto, req.user.id);
    }
    remove(id, req) {
        return this.ganadoService.remove(id, req.user.id);
    }
    addPrenez(animalId, dto, req) {
        return this.ganadoService.addPrenez(animalId, dto, req.user.id);
    }
    updatePrenezEstado(prenezId, dto, req) {
        return this.ganadoService.updatePrenezEstado(prenezId, dto, req.user.id);
    }
    getPesos(id, req) {
        return this.ganadoService.getPesos(id, req.user.id);
    }
    addPeso(animalId, dto, req) {
        return this.ganadoService.addPeso(animalId, dto, req.user.id);
    }
    removePeso(pesoId, req) {
        return this.ganadoService.removePeso(pesoId, req.user.id);
    }
};
exports.GanadoController = GanadoController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ganado_dto_1.CreateAnimalDto, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ganado_dto_1.UpdateAnimalDto, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/preneces'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ganado_dto_1.CreatePrenezDto, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "addPrenez", null);
__decorate([
    (0, common_1.Patch)('preneces/:prenezId/estado'),
    __param(0, (0, common_1.Param)('prenezId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ganado_dto_1.UpdatePrenezEstadoDto, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "updatePrenezEstado", null);
__decorate([
    (0, common_1.Get)(':id/pesos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "getPesos", null);
__decorate([
    (0, common_1.Post)(':id/pesos'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, ganado_dto_1.CreateRegistroPesoDto, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "addPeso", null);
__decorate([
    (0, common_1.Delete)('pesos/:pesoId'),
    __param(0, (0, common_1.Param)('pesoId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GanadoController.prototype, "removePeso", null);
exports.GanadoController = GanadoController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('ganado'),
    __metadata("design:paramtypes", [ganado_service_1.GanadoService])
], GanadoController);
//# sourceMappingURL=ganado.controller.js.map