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
exports.CamposController = void 0;
const common_1 = require("@nestjs/common");
const campos_service_1 = require("./campos.service");
const campos_dto_1 = require("./dto/campos.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let CamposController = class CamposController {
    camposService;
    constructor(camposService) {
        this.camposService = camposService;
    }
    findAll(req) {
        return this.camposService.findAll(req.user.id);
    }
    findOne(id, req) {
        return this.camposService.findOne(id, req.user.id);
    }
    create(dto, req) {
        return this.camposService.create(dto, req.user.id);
    }
    update(id, dto, req) {
        return this.camposService.update(id, dto, req.user.id);
    }
    remove(id, req) {
        return this.camposService.remove(id, req.user.id);
    }
    addLote(campoId, dto, req) {
        return this.camposService.addLote(campoId, dto, req.user.id);
    }
};
exports.CamposController = CamposController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campos_dto_1.CreateCampoDto, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, campos_dto_1.UpdateCampoDto, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/lotes'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, campos_dto_1.CreateLoteDto, Object]),
    __metadata("design:returntype", void 0)
], CamposController.prototype, "addLote", null);
exports.CamposController = CamposController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('campos'),
    __metadata("design:paramtypes", [campos_service_1.CamposService])
], CamposController);
//# sourceMappingURL=campos.controller.js.map