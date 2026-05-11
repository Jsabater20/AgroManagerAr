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
exports.CreateLoteDto = exports.UpdateCampoDto = exports.CreateCampoDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CreateCampoDto {
    nombre;
    hectareas;
    ubicacion;
    propietario;
}
exports.CreateCampoDto = CreateCampoDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre es requerido' }),
    __metadata("design:type", String)
], CreateCampoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateCampoDto.prototype, "hectareas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampoDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCampoDto.prototype, "propietario", void 0);
class UpdateCampoDto {
    nombre;
    hectareas;
    ubicacion;
    propietario;
}
exports.UpdateCampoDto = UpdateCampoDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampoDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateCampoDto.prototype, "hectareas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampoDto.prototype, "ubicacion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateCampoDto.prototype, "propietario", void 0);
class CreateLoteDto {
    nombre;
    hectareas;
}
exports.CreateLoteDto = CreateLoteDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'El nombre del lote es requerido' }),
    __metadata("design:type", String)
], CreateLoteDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateLoteDto.prototype, "hectareas", void 0);
//# sourceMappingURL=campos.dto.js.map