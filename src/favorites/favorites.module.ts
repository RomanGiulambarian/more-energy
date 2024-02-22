import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Favorites } from './entities/favorites.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorites])],
})
export class FavoritesModule {}
