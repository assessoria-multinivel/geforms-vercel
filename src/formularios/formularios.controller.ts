import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormulariosService } from './formularios.service';
import { CONSTANTES } from '../common/constantes';

@Controller(`${CONSTANTES.API_BASE_URL}/formularios`)
export class FormulariosController {
  constructor(private readonly formulariosService: FormulariosService) {}

  @Post()
  create(@Body() createFormularioDto: any) {
    return this.formulariosService.create(createFormularioDto);
  }

  @Get()
  findAll() {
    return this.formulariosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formulariosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormularioDto: any) {
    return this.formulariosService.update(id, updateFormularioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.formulariosService.remove(id);
  }

  @Get('total')
  async getTotalFormularios(): Promise<number> {
    return this.formulariosService.getTotalFormularios();
  }
}
