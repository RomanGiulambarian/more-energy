import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { Media } from './entities/media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
  ) {}

  async createMedia(
    images: Express.Multer.File[],
    exerciseId: string,
  ): Promise<string[]> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      const fileNames: string[] = [];

      for (const image of images) {
        const { id } = await this.mediaRepository.save(
          this.mediaRepository.create({ exercise: { id: exerciseId } }),
        );
        const fileName = `${id}.jpg`;

        fs.writeFileSync(path.join(filePath, fileName), image.buffer);

        fileNames.push(filePath);
      }
      return fileNames;
    } catch (e) {
      throw new InternalServerErrorException('Ошибка при записи файла');
    }
  }

  async deleteMedia(mediaToDelete: string[]): Promise<void> {
    try {
      mediaToDelete.forEach(async (mediaId) => {
        const media = await this.mediaRepository.findOneBy({ id: mediaId });

        if (!media) {
          throw new NotFoundException('Медиа не найдено');
        }

        const filePath = path.resolve(
          __dirname,
          '..',
          'static',
          `${mediaId}.jpg`,
        );

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }

        await this.mediaRepository.remove(media);
      });
    } catch (e) {
      throw new InternalServerErrorException('Ошибка при удалении медиа');
    }
  }
}
