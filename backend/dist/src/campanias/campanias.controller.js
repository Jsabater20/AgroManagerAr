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
exports.CampaniasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const campanias_service_1 = require("./campanias.service");
const campanias_dto_1 = require("./dto/campanias.dto");
let CampaniasController = class CampaniasController {
    campaniasService;
    constructor(campaniasService) {
        this.campaniasService = campaniasService;
    }
    findAll(req) {
        return this.campaniasService.findAll(req.user.id);
    }
    findOne(id, req) {
        return this.campaniasService.findOne(id, req.user.id);
    }
    create(dto, req) {
        return this.campaniasService.create(req.user.id, dto);
    }
    update(id, dto, req) {
        return this.campaniasService.update(id, req.user.id, dto);
    }
    remove(id, req) {
        return this.campaniasService.remove(id, req.user.id);
    }
    asignarSiembras(id, siembraIds, req) {
        return this.campaniasService.asignarSiembras(id, req.user.id, siembraIds);
    }
};
exports.CampaniasController = CampaniasController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [campanias_dto_1.CreateCampaniaDto, Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, campanias_dto_1.UpdateCampaniaDto, Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(':id/siembras'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('siembraIds')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Array, Object]),
    __metadata("design:returntype", void 0)
], CampaniasController.prototype, "asignarSiembras", null);
exports.CampaniasController = CampaniasController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('campanias'),
    __metadata("design:paramtypes", [campanias_service_1.CampaniasService])
], CampaniasController);
//# sourceMappingURL=campanias.controller.js.map