import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelappModule } from './hotelapp/hotelapp.module';
import { AuthModule } from './auth/auth.module';
import { HotelappController } from './hotelapp/hotelapp.controller';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forRoot(
    { // konfigurasi db
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'hotelapp', //nama db hotelapp
      autoLoadEntities: true,
      logging: true,
      dropSchema: false,
      synchronize: true,
    }
  ),
    HotelappModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
