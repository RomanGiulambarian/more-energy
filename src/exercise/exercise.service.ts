import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { MediaService } from 'src/media/media.service';
import { Express } from 'express';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepository: Repository<Exercise>,
    private mediaService: MediaService,
  ) {}

  async create(
    createExerciseDto: CreateExerciseDto,
    image: Express.Multer.File,
  ) {
    const createdExercise = await this.exerciseRepository.save(
      this.exerciseRepository.create(createExerciseDto),
    );
    await this.mediaService.createMedia(
      [image] as Express.Multer.File[],
      createdExercise.id,
    );

    return createdExercise;
  }

  async findAll() {
    return await this.exerciseRepository.find({
      relations: ['media'],
    });
  }

  async findOne(id: string) {
    return await this.exerciseRepository.findOne({
      relations: ['media'],
      where: { id },
    });
  }

  async update(id: string, updateExerciseDto: UpdateExerciseDto) {
    return await this.exerciseRepository.update(id, updateExerciseDto);
  }

  async softDelete(id: string, exercise: Exercise) {
    const mediaToDelete = exercise.media.map((img) => img.id);

    await this.mediaService.deleteMedia(mediaToDelete);
    await this.exerciseRepository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.exerciseRepository.restore(id);
  }
}
