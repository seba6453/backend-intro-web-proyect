import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/proyect/entities/user.entity';
import { decodeToken } from 'src/config/token';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
        private jwtService: JwtService
    ){}

    async create(createCommentDto: CreateCommentDto, token: string): Promise<Comment>{
        const userToken: User = decodeToken(token,this.jwtService);
        if (!userToken || typeof userToken !== 'object') {
        throw new Error('Token inválido o no contiene información del usuario.');
        }

        createCommentDto.autorEmail = userToken.email;
        return await this.commentModel.create(createCommentDto);
    }

    async findByTask(id_task: string, token: string){
        const userToken: User = decodeToken(token,this.jwtService);
        if (!userToken || typeof userToken !== 'object') {
        throw new Error('Token inválido o no contiene información del usuario.');
        }

        return await this.commentModel.find({id_task: id_task}).exec();
    }

    async delete(id_comment: string , token: string): Promise<DeleteResponse>{
        const userToken: User = decodeToken(token,this.jwtService);
        if (!userToken || typeof userToken !== 'object') {
        throw new Error('Token inválido o no contiene información del usuario.');
        }

        return await this.commentModel.deleteOne({_id: id_comment});
    }

    async deleteByTask(id_task: string): Promise<DeleteResponse> {
        return await this.commentModel.deleteMany({id_task: id_task});
    }
}
