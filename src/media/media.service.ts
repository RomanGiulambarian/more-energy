import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from './entities/media.entity';
import * as fs from 'fs';
import * as path from 'path';

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
      throw new HttpException(
        'Ошибка при записи файла',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMedia(mediaToDelete: string[]): Promise<void> {
    try {
      mediaToDelete.forEach(async (mediaId) => {
        const media = await this.mediaRepository.findOneBy({ id: mediaId });
        if (!media) {
          throw new HttpException('Медиа не найдено', HttpStatus.NOT_FOUND);
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
      throw new HttpException(
        'Ошибка при удалении медиа',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
