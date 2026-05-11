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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovimientoDto = exports.CreateMovimientoDto = exports.CategoriaMovimiento = exports.TipoMovimiento = void 0;
const class_validator_1 = require("class-validator");
const mapped_types_1 = require("@nestjs/mapped-types");
var TipoMovimiento;
(function (TipoMovimiento) {
    TipoMovimiento["INGRESO"] = "INGRESO";
    TipoMovimiento["EGRESO"] = "EGRESO";
})(TipoMovimiento || (exports.TipoMovimiento = TipoMovimiento = {}));
var CategoriaMovimiento;
(function (CategoriaMovimiento) {
    CategoriaMovimiento["COSECHA"] = "COSECHA";
    CategoriaMovimiento["VENTA_ANIMAL"] = "VENTA_ANIMAL";
    CategoriaMovimiento["INSUMO"] = "INSUMO";
    CategoriaMovimiento["SERVICIO"] = "SERVICIO";
    CategoriaMovimiento["MANTENIMIENTO"] = "MANTENIMIENTO";
    CategoriaMovimiento["VETERINARIA"] = "VETERINARIA";
    CategoriaMovimiento["COMBUSTIBLE"] = "COMBUSTIBLE";
    CategoriaMovimiento["MANO_DE_OBRA"] = "MANO_DE_OBRA";
    CategoriaMovimiento["OTRO"] = "OTRO";
})(CategoriaMovimiento || (exports.CategoriaMovimiento = CategoriaMovimiento = {}));
class CreateMovimientoDto {
    tipo;
    concepto;
    monto;
    fecha;
    categoria;
    campoId;
    siembraId;
    observaciones;
}
exports.CreateMovimientoDto = CreateMovimientoDto;
__decorate([
    (0, class_validator_1.IsEnum)(TipoMovimiento),
    __metadata("design:type", String)
], CreateMovimientoDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovimientoDto.prototype, "concepto", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateMovimientoDto.prototype, "monto", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateMovimientoDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CategoriaMovimiento),
    __metadata("design:type", String)
], CreateMovimientoDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMovimientoDto.prototype, "campoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateMovimientoDto.prototype, "siembraId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMovimientoDto.prototype, "observaciones", void 0);
class UpdateMovimientoDto extends (0, mapped_types_1.PartialType)(CreateMovimientoDto) {
}
exports.UpdateMovimientoDto = UpdateMovimientoDto;
//# sourceMappingURL=finanzas.dto.js.map