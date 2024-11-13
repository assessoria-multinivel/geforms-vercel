import { Module } from '@nestjs/common';
import { FormulariosController } from './formularios.controller';
import { FormulariosService } from './formularios.service';
import { GoogleSheetsService } from '../services/google-sheets.service';

@Module({
  controllers: [FormulariosController],
  providers: [FormulariosService, GoogleSheetsService],
})
export class FormulariosModule {}
