import { HttpException, HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService){}
  async use(req: Request, _res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;
    if (authorization === undefined) {
      throw new HttpException('Error, es necesario ingresar token', HttpStatus.PAYMENT_REQUIRED)
    }
    /*
    const token = authorization.split(" ")[1];
    try{
      await this.jwtService.verifyAsync(token)
      next();
    }
    catch{
      throw new HttpException('Error, token invalido', HttpStatus.PAYMENT_REQUIRED)
    }
    */
    next();
  }
}
