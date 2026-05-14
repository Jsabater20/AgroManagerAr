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
exports.PlanController = void 0;
const common_1 = require("@nestjs/common");
const plan_service_1 = require("./plan.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PlanController = class PlanController {
    planService;
    constructor(planService) {
        this.planService = planService;
    }
    getPlan(req) {
        return this.planService.getUsuarioPlan(req.user.id);
    }
    checkout(req) {
        return this.planService.crearCheckout(req.user.id, req.user.email);
    }
    cancelar(req) {
        return this.planService.cancelarSuscripcion(req.user.id);
    }
    webhook(body) {
        return this.planService.procesarWebhook(body);
    }
    setup() {
        return this.planService.crearPlanMP();
    }
};
exports.PlanController = PlanController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "getPlan", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('checkout'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "checkout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('cancelar'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "cancelar", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "webhook", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('setup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlanController.prototype, "setup", null);
exports.PlanController = PlanController = __decorate([
    (0, common_1.Controller)('plan'),
    __metadata("design:paramtypes", [plan_service_1.PlanService])
], PlanController);
//# sourceMappingURL=plan.controller.js.map