import { Module } from '@nestjs/common';
import { ProyectService } from './proyect.service';
import { ProyectController } from './proyect.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Proyect, ProyectSchema } from 'src/schema/proyect.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { TeamModule } from 'src/team/team.module';

@Module({
  controllers: [ProyectController],
  providers: [ProyectService],
  imports: [MongooseModule.forFeature([{name: Proyect.name , schema: ProyectSchema}])
      ,JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days'},
    }), TeamModule
  ]
})
export class ProyectModule {}
