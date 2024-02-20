import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ExerciseModule } from './exercise/exercise.module';
import { ExerciseStepsModule } from './exercise-steps/exercise-steps.module';
import { exportEntites } from './db';
import { FavoritesModule } from './favorites/favorites.module';

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
    ExerciseModule,
    ExerciseStepsModule,
    FavoritesModule,
  ],
})
export class AppModule {}
