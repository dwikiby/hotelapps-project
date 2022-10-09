import { Controller, Body, Post, UseGuards, Req } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { AuthService } from './auth.service';
import { JwtPayLoad } from './jwt-payload.interface';
import { LoginAuthCredentialsDto } from './dto/login-credential.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    //sign up
    @Post('/signup')
    signUp(@Body() authCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialDto);
    }


    @Post('/signin')
    signIn(@Body() loginCredentialDto: LoginAuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(loginCredentialDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() request: JwtPayLoad) {
        console.log(request);
    }
}
