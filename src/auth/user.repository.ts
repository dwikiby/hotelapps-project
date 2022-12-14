import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { Guest } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GuestRepository extends Repository<Guest> {
    constructor(private dataSource: DataSource) {
        super(Guest, dataSource.createEntityManager());
    }

    //create guest hotel dan signup

    async createGuest(authHotelCredentialDto: AuthCredentialsDto): Promise<void> {
        const { username, password, email, hp } = authHotelCredentialDto;

        const salt = await bcrypt.genSalt();
        const hashesPassword = await bcrypt.hash(password, salt);

        const guest = this.create({ username, password: hashesPassword, email, hp });

        try {
            await this.save(guest);
        } catch (error) {
            if (error.code === '23505') {
                //duplicate guest
                throw new ConflictException('username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}