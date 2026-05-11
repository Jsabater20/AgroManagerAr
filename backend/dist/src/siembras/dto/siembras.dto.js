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
exports.CreateAplicacionDto = exports.CreateCosechaDto = exports.UpdateSiembraDto = exports.CreateSiembraDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var EstadoSiembra;
(function (EstadoSiembra) {
    EstadoSiembra["EN_CURSO"] = "EN_CURSO";
    EstadoSiembra["COSECHADA"] = "COSECHADA";
    EstadoSiembra["PERDIDA"] = "PERDIDA";
})(EstadoSiembra || (EstadoSiembra = {}));
class CreateSiembraDto {
    loteId;
    tipoCultivoId;
    fechaSiembra;
    densidad;
    observaciones;
}
exports.CreateSiembraDto = CreateSiembraDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSiembraDto.prototype, "loteId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSiembraDto.prototype, "tipoCultivoId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateSiembraDto.prototype, "fechaSiembra", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateSiembraDto.prototype, "densidad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateSiembraDto.prototype, "observaciones", void 0);
class UpdateSiembraDto {
    fechaSiembra;
    densidad;
    observaciones;
    estado;
}
exports.UpdateSiembraDto = UpdateSiembraDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateSiembraDto.prototype, "fechaSiembra", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateSiembraDto.prototype, "densidad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateSiembraDto.prototype, "observaciones", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(EstadoSiembra),
    __metadata("design:type", String)
], UpdateSiembraDto.prototype, "estado", void 0);
class CreateCosechaDto {
    fechaCosecha;
    rendimientoKgHa;
    totalKg;
    humedad;
    observaciones;
}
exports.CreateCosechaDto = CreateCosechaDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateCosechaDto.prototype, "fechaCosecha", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCosechaDto.prototype, "rendimientoKgHa", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCosechaDto.prototype, "totalKg", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCosechaDto.prototype, "humedad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCosechaDto.prototype, "observaciones", void 0);
class CreateAplicacionDto {
    insumoId;
    fecha;
    cantidad;
    unidad;
    observaciones;
}
exports.CreateAplicacionDto = CreateAplicacionDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAplicacionDto.prototype, "insumoId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAplicacionDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAplicacionDto.prototype, "cantidad", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAplicacionDto.prototype, "unidad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAplicacionDto.prototype, "observaciones", void 0);
//# sourceMappingURL=siembras.dto.js.map