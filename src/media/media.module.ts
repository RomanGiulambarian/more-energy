import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MediaService } from './media.service';

@Module({
  providers: [MediaService],
  exports: [MediaService],
  imports: [TypeOrmModule.forFeature([Media])],
})
export class MediaModule {}
