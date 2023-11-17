import { Injectable } from '@nestjs/common';
import { CreateProyectDto } from './dto/create-proyect.dto';
import { UpdateProyectDto } from './dto/update-proyect.dto';
import { Proyect } from 'src/schema/proyect.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { decodeToken } from 'src/config/token';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProyectService {

  constructor(
    private jwtService: JwtService,
    @InjectModel(Proyect.name) private readonly proyectModel: Model<Proyect>
  ){}


  async create(createProyectDto: CreateProyectDto, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    createProyectDto.owner = userToken.userName;
    return this.proyectModel.create(createProyectDto);
  }

  async findAll(token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    return await this.proyectModel.find({ owner: userToken.userName }).exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} proyect`;
  }

  async update(id: string, updateProyectDto: UpdateProyectDto, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.proyectModel.updateOne({_id: id},updateProyectDto);
  }

  async remove(id: string, token: string) {
    const userToken: User = await decodeToken(token,this.jwtService);
    if (!userToken || typeof userToken !== 'object') {
      throw new Error('Token inválido o no contiene información del usuario.');
    }
    return this.proyectModel.deleteOne({_id: id});
  }
}
