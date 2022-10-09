import { Module } from '@nestjs/common';
import { HotelappController } from './hotelapp.controller';
import { HotelappService } from './hotelapp.service';
import { HotelRepository } from './hotelapp.repository';
import { Hotel } from './hotelapp.entity';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [HotelappController],
  providers: [HotelappService, HotelRepository],
  imports: [AuthModule, TypeOrmModule.forFeature([Hotel])]
})
export class HotelappModule { }
