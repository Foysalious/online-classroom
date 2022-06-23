import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const auth = req.headers.authorization
        if (!auth) throw new UnauthorizedException()
        const jwt: string = auth.replace('Bearer ', '');
        const payload = await this.authService.jwtTokenDecode(jwt); 
        payload._id=payload.id                                                                    
        res.locals.userPayload = payload
        next();
    }
}
