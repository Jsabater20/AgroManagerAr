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
exports.SiembrasController = void 0;
const common_1 = require("@nestjs/common");
const siembras_service_1 = require("./siembras.service");
const siembras_dto_1 = require("./dto/siembras.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let SiembrasController = class SiembrasController {
    siembrasService;
    constructor(siembrasService) {
        this.siembrasService = siembrasService;
    }
    findAll(req) {
        return this.siembrasService.findAll(req.user.id);
    }
    findOne(id, req) {
        return this.siembrasService.findOne(id, req.user.id);
    }
    create(dto, req) {
        return this.siembrasService.create(dto, req.user.id);
    }
    update(id, dto, req) {
        return this.siembrasService.update(id, dto, req.user.id);
    }
    addCosecha(siembraId, dto, req) {
        return this.siembrasService.addCosecha(siembraId, dto, req.user.id);
    }
    addAplicacion(siembraId, dto, req) {
        return this.siembrasService.addAplicacion(siembraId, dto, req.user.id);
    }
};
exports.SiembrasController = SiembrasController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [siembras_dto_1.CreateSiembraDto, Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, siembras_dto_1.UpdateSiembraDto, Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/cosechas'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, siembras_dto_1.CreateCosechaDto, Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "addCosecha", null);
__decorate([
    (0, common_1.Post)(':id/aplicaciones'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, siembras_dto_1.CreateAplicacionDto, Object]),
    __metadata("design:returntype", void 0)
], SiembrasController.prototype, "addAplicacion", null);
exports.SiembrasController = SiembrasController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('siembras'),
    __metadata("design:paramtypes", [siembras_service_1.SiembrasService])
], SiembrasController);
//# sourceMappingURL=siembras.controller.js.map