import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectModule } from './proyect/proyect.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';
import { TeamModule } from './team/team.module';

@Module({
  imports: [ProyectModule, MongooseModule.forRoot(linkMongo.secret), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
