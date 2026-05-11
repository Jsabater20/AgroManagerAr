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
exports.CreateRegistroPesoDto = exports.UpdatePrenezEstadoDto = exports.CreatePrenezDto = exports.UpdateAnimalDto = exports.CreateAnimalDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
var Especie;
(function (Especie) {
    Especie["BOVINO"] = "BOVINO";
    Especie["PORCINO"] = "PORCINO";
    Especie["EQUINO"] = "EQUINO";
    Especie["OVINO"] = "OVINO";
    Especie["CAPRINO"] = "CAPRINO";
    Especie["AVIAR"] = "AVIAR";
})(Especie || (Especie = {}));
var Sexo;
(function (Sexo) {
    Sexo["MACHO"] = "MACHO";
    Sexo["HEMBRA"] = "HEMBRA";
})(Sexo || (Sexo = {}));
var CategoriaAnimal;
(function (CategoriaAnimal) {
    CategoriaAnimal["VACA"] = "VACA";
    CategoriaAnimal["VAQUILLONA"] = "VAQUILLONA";
    CategoriaAnimal["TERNERA"] = "TERNERA";
    CategoriaAnimal["TORO"] = "TORO";
    CategoriaAnimal["NOVILLO"] = "NOVILLO";
    CategoriaAnimal["TERNERO"] = "TERNERO";
    CategoriaAnimal["CERDA"] = "CERDA";
    CategoriaAnimal["VERRACO"] = "VERRACO";
    CategoriaAnimal["LECHON"] = "LECHON";
    CategoriaAnimal["YEGUA"] = "YEGUA";
    CategoriaAnimal["POTRANCA"] = "POTRANCA";
    CategoriaAnimal["PADRILLO"] = "PADRILLO";
    CategoriaAnimal["POTRO"] = "POTRO";
    CategoriaAnimal["OVEJA"] = "OVEJA";
    CategoriaAnimal["BORREGA"] = "BORREGA";
    CategoriaAnimal["CARNERO"] = "CARNERO";
    CategoriaAnimal["CORDERO"] = "CORDERO";
    CategoriaAnimal["CABRA"] = "CABRA";
    CategoriaAnimal["CABRIO"] = "CABRIO";
    CategoriaAnimal["CABRITO"] = "CABRITO";
    CategoriaAnimal["GALLINA"] = "GALLINA";
    CategoriaAnimal["GALLO"] = "GALLO";
    CategoriaAnimal["POLLO"] = "POLLO";
    CategoriaAnimal["POLLA"] = "POLLA";
})(CategoriaAnimal || (CategoriaAnimal = {}));
var EstadoPrenez;
(function (EstadoPrenez) {
    EstadoPrenez["EN_CURSO"] = "EN_CURSO";
    EstadoPrenez["COMPLETADA"] = "COMPLETADA";
    EstadoPrenez["PERDIDA"] = "PERDIDA";
})(EstadoPrenez || (EstadoPrenez = {}));
class CreateAnimalDto {
    nombre;
    especie;
    sexo;
    categoria;
    peso;
    fechaNacimiento;
    observaciones;
}
exports.CreateAnimalDto = CreateAnimalDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Especie),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "especie", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Sexo),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "sexo", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CategoriaAnimal),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateAnimalDto.prototype, "peso", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAnimalDto.prototype, "observaciones", void 0);
class UpdateAnimalDto {
    nombre;
    categoria;
    peso;
    fechaNacimiento;
    observaciones;
}
exports.UpdateAnimalDto = UpdateAnimalDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateAnimalDto.prototype, "nombre", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(CategoriaAnimal),
    __metadata("design:type", String)
], UpdateAnimalDto.prototype, "categoria", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateAnimalDto.prototype, "peso", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateAnimalDto.prototype, "fechaNacimiento", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnimalDto.prototype, "observaciones", void 0);
class CreatePrenezDto {
    fechaInicio;
    observaciones;
}
exports.CreatePrenezDto = CreatePrenezDto;
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreatePrenezDto.prototype, "fechaInicio", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePrenezDto.prototype, "observaciones", void 0);
class UpdatePrenezEstadoDto {
    estado;
}
exports.UpdatePrenezEstadoDto = UpdatePrenezEstadoDto;
__decorate([
    (0, class_validator_1.IsEnum)(EstadoPrenez),
    __metadata("design:type", String)
], UpdatePrenezEstadoDto.prototype, "estado", void 0);
class CreateRegistroPesoDto {
    peso;
    fecha;
    observaciones;
}
exports.CreateRegistroPesoDto = CreateRegistroPesoDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateRegistroPesoDto.prototype, "peso", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateRegistroPesoDto.prototype, "fecha", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRegistroPesoDto.prototype, "observaciones", void 0);
//# sourceMappingURL=ganado.dto.js.map