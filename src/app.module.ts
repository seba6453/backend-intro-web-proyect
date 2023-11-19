import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProyectModule } from './proyect/proyect.module';
import { MongooseModule } from '@nestjs/mongoose';
import { linkMongo } from './config/constants';
import { TeamModule } from './team/team.module';
import { TokenMiddleware } from './middleware/token.middleware';
import { ProyectController } from './proyect/proyect.controller';

@Module({
  imports: [ProyectModule, MongooseModule.forRoot(linkMongo.secret), TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TokenMiddleware).forRoutes(ProyectController)
  }
}{}
