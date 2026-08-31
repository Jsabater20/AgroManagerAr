import { Module } from '@nestjs/common';
import { EmpresaAccessService } from './empresa-access.service';
import { EmpresasController } from './empresas.controller';
import { EmpresasService } from './empresas.service';

@Module({
  controllers: [EmpresasController],
  providers: [EmpresasService, EmpresaAccessService],
  exports: [EmpresaAccessService],
})
export class EmpresasModule {}
