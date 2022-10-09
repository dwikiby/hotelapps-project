import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Guest } from './user.entity';

export const GetGuest = createParamDecorator(

    (_data, ctx: ExecutionContext): Guest => {
        const req = ctx.switchToHttp().getRequest();
        return req.guest;
    }
)