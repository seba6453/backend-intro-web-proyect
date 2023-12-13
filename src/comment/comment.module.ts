import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from 'src/schema/comment.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/config/constants';
import { CommentController } from './comment.controller';

@Module({
  providers: [CommentService],
  imports: [MongooseModule.forFeature([{name: Comment.name , schema: CommentSchema}])
      ,JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1 days'},
    })],
  controllers: [CommentController],
  exports: [CommentService]
})
export class CommentModule {}
