import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayLoad } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt'
import { GuestRepository } from './user.repository';
import { LoginAuthCredentialsDto } from './dto/login-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(GuestRepository)
        private guestRepository: GuestRepository,
        private jwtService: JwtService,
    ) { }

    //sign up
    async signUp(authHotelCredentialDto: AuthCredentialsDto): Promise<void> {
        return this.guestRepository.createGuest(authHotelCredentialDto);
    }

    //login
    async signIn(
        loginCredentialDto: LoginAuthCredentialsDto
    ): Promise<{ accessToken: string }> {
        const { email, password } = loginCredentialDto;
        const guest = await this.guestRepository.findOne({
            where: {
                email: email
            }
        });

        if (guest && (await bcrypt.compare(password, guest.password))) {
            const payload: JwtPayLoad = { email };
            const accessToken: string = await this.jwtService.sign(payload)
            return { accessToken };
        } else {
            throw new UnauthorizedException('please check your login credential')
        }
    }
}
