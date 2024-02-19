import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/db/entities/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { СoachToUser } from './db/entities/coach-to-user.entity';
import { Evaluation } from './db/entities/evaluation.entity';
import { Via } from './db/entities/via.entity';
import { HealthVision } from './db/entities/health-vision.entyty';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: [User, СoachToUser, Evaluation, Via, HealthVision],
        synchronize: true,
      }),
    }),
  ],
})
export class AppModule {}
