import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from 'src/schema/task.schema';
import { TeamSchema } from 'src/schema/team.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { ProyectModule } from 'src/proyect/proyect.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [MongooseModule.forFeature([{name: Task.name , schema: TeamSchema}])
  ,JwtModule.register({
  global: true,
  secret: jwtConstants.secret,
  signOptions: { expiresIn: '1 days'},
}), ProyectModule]
})
export class TaskModule {}
