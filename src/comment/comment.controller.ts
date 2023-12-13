import { Body, Controller, Delete, Get, HttpException, Param, Post, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { HttpStatusCode } from 'axios';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from 'src/schema/comment.schema';

@Controller('comment')
export class CommentController {
    constructor(
        private commentService: CommentService
    ){}

    @Get(':id_task')
    getByTask(@Param("id_task") id_task: string, @Req() request: Request) {
        try{
            const token = request.headers['authorization'].split(" ")[1];
            return this.commentService.findByTask(id_task, token);
        }catch(error){
            console.error('Error en update:', error);
            throw new HttpException('No fue posible obtener los comentarios', HttpStatusCode.BadRequest);
        }
    }

    @Post()
    create(@Body() createCommentDto: CreateCommentDto, @Req() request: Request): Promise<Comment> {
        try{
            const token = request.headers['authorization'].split(" ")[1];
            return this.commentService.create(createCommentDto, token);
        }catch(error){
            console.error('Error en update:', error);
            throw new HttpException('No fue posible obtener los comentarios', HttpStatusCode.BadRequest);
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Req() request: Request): Promise<ResponseOk> {
        try{
            const token = request.headers['authorization'].split(" ")[1];
            const responseDelete: DeleteResponse = await this.commentService.delete(id, token);
            if(responseDelete.deletedCount == 0) {
                throw new HttpException('No fue posible eliminar el comentari', HttpStatusCode.BadRequest);
            }
            return { message: 'Comentario eliminado correctamente', statusCode: HttpStatusCode.Ok };
        }catch(error){
            console.error('Error en update:', error);
            throw new HttpException('No fue posible eliminar el comentario', HttpStatusCode.BadRequest);
        }
    }
}
