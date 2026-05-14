"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const setup_1 = require("@sentry/nestjs/setup");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const campos_module_1 = require("./campos/campos.module");
const cultivos_module_1 = require("./cultivos/cultivos.module");
const siembras_module_1 = require("./siembras/siembras.module");
const insumos_module_1 = require("./insumos/insumos.module");
const ganado_module_1 = require("./ganado/ganado.module");
const tareas_module_1 = require("./tareas/tareas.module");
const finanzas_module_1 = require("./finanzas/finanzas.module");
const campanias_module_1 = require("./campanias/campanias.module");
const ai_module_1 = require("./ai/ai.module");
const plan_module_1 = require("./plan/plan.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            setup_1.SentryModule.forRoot(),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'global',
                    ttl: 60000,
                    limit: 100,
                },
            ]),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            plan_module_1.PlanModule,
            campos_module_1.CamposModule,
            cultivos_module_1.CultivosModule,
            siembras_module_1.SiembrasModule,
            insumos_module_1.InsumosModule,
            ganado_module_1.GanadoModule,
            tareas_module_1.TareasModule,
            finanzas_module_1.FinanzasModule,
            campanias_module_1.CampaniasModule,
            ai_module_1.AiModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: setup_1.SentryGlobalFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map