import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FormulariosModule } from './formularios/formularios.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FormulariosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
