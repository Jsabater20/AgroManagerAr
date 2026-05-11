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
exports.UpdateTareaEstadoDto = exports.UpdateTareaDto = exports.CreateTareaDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var TipoTarea;
(function (TipoTarea) {
    TipoTarea["SIEMBRA"] = "SIEMBRA";
    TipoTarea["COSECHA"] = "COSECHA";
    TipoTarea["FUMIGACION"] = "FUMIGACION";
    TipoTarea["FERTILIZACION"] = "FERTILIZACION";
    TipoTarea["RIEGO"] = "RIEGO";
    TipoTarea["MANTENIMIENTO"] = "MANTENIMIENTO";
    TipoTarea["VETERINARIA"] = "VETERINARIA";
    TipoTarea["OTRO"] = "OTRO";
})(TipoTarea || (TipoTarea = {}));
var EstadoTarea;
(function (EstadoTarea) {
    EstadoTarea["PENDIENTE"] = "PENDIENTE";
    EstadoTarea["EN_CURSO"] = "EN_CURSO";
    EstadoTarea["COMPLETADA"] = "COMPLETADA";
    EstadoTarea["CANCELADA"] = "CANCELADA";
})(EstadoTarea || (EstadoTarea = {}));
var Prioridad;
(function (Prioridad) {
    Prioridad["BAJA"] = "BAJA";
    Prioridad["MEDIA"] = "MEDIA";
    Prioridad["ALTA"] = "ALTA";
    Prioridad["URGENTE"] = "URGENTE";
})(Prioridad || (Prioridad = {}));
class CreateTareaDto {
    titulo;
    descripcion;
    tipo;
    prioridad;
    fechaProgramada;
    campoId;
    observaciones;
}
exports.CreateTareaDto = CreateTareaDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(TipoTarea),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Prioridad),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "prioridad", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "fechaProgramada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateTareaDto.prototype, "campoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTareaDto.prototype, "observaciones", void 0);
class UpdateTareaDto {
    titulo;
    descripcion;
    tipo;
    prioridad;
    fechaProgramada;
    campoId;
    observaciones;
}
exports.UpdateTareaDto = UpdateTareaDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "titulo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "descripcion", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(TipoTarea),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "tipo", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Prioridad),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "prioridad", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "fechaProgramada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateTareaDto.prototype, "campoId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateTareaDto.prototype, "observaciones", void 0);
class UpdateTareaEstadoDto {
    estado;
}
exports.UpdateTareaEstadoDto = UpdateTareaEstadoDto;
__decorate([
    (0, class_validator_1.IsEnum)(EstadoTarea),
    __metadata("design:type", String)
], UpdateTareaEstadoDto.prototype, "estado", void 0);
//# sourceMappingURL=tareas.dto.js.map