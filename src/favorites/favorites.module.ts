import { Module } from '@nestjs/common';
import { Favorites } from './entities/favorites.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites])],
})
export class FavoritesModule {}
