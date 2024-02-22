import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { MediaService } from 'src/media/media.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';

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
  ): Promise<Exercise> {
    const createdExercise = await this.exerciseRepository.save(
      this.exerciseRepository.create(createExerciseDto),
    );

    await this.mediaService.createMedia(
      [image] as Express.Multer.File[],
      createdExercise.id,
    );

    return createdExercise;
  }

  findAll(): Promise<Exercise[]> {
    return this.exerciseRepository.find({
      relations: ['media', 'exerciseSteps'],
    });
  }

  findOne(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOne({
      relations: ['media', 'exerciseSteps'],
      where: { id },
    });
  }

  findOneWithDeleted(id: string): Promise<Exercise> {
    return this.exerciseRepository.findOne({
      relations: ['media', 'exerciseSteps'],
      where: { id },
      withDeleted: true,
    });
  }

  update(
    id: string,
    updateExerciseDto: UpdateExerciseDto,
  ): Promise<UpdateResult> {
    return this.exerciseRepository.update(id, updateExerciseDto);
  }

  async softRemove(id: string): Promise<void> {
    const exercise = await this.findOne(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    const mediaToDelete = exercise.media.map((img) => img.id);

    await this.mediaService.deleteMedia(mediaToDelete);
    await this.exerciseRepository.softRemove(exercise);
  }

  async recover(id: string): Promise<Exercise> {
    const exercise = await this.findOneWithDeleted(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    this.exerciseRepository.recover(exercise);

    return exercise;
  }
}
