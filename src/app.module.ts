import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { UsersModule } from './users/users.module';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseStepsModule } from './exercise-steps/exercise-steps.module';
import { exportEntites } from './db';
import { FavoritesModule } from './favorites/favorites.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres' as const,
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        entities: exportEntites,
        synchronize: false,
        migrations: ['./db/migrations/*.{js,ts}'],
      }),
    }),
    UsersModule,
    ExerciseModule,
    ExerciseStepsModule,
    FavoritesModule,
    MediaModule,
  ],
})
export class AppModule {}
