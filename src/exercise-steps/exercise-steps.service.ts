import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';
import { ExerciseSteps } from './entities/exercise-steps.entity';

@Injectable()
export class ExerciseStepsService {
  constructor(
    @InjectRepository(ExerciseSteps)
    private readonly exerciseStepsRepository: Repository<ExerciseSteps>,
  ) {}

  create(createExerciseStepDto: CreateExerciseStepDto): Promise<ExerciseSteps> {
    return this.exerciseStepsRepository.save(
      this.exerciseStepsRepository.create(createExerciseStepDto),
    );
  }

  findOne(id: string): Promise<ExerciseSteps> {
    return this.exerciseStepsRepository.findOneBy({ id });
  }

  findOneWithDeleted(id: string): Promise<ExerciseSteps> {
    return this.exerciseStepsRepository.findOne({
      where: { id },
      withDeleted: true,
    });
  }

  async softRemove(id: string): Promise<object> {
    const exercise = await this.findOne(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    await this.exerciseStepsRepository.softRemove(exercise);

    return { id, deleted: true };
  }

  async recover(id: string): Promise<ExerciseSteps> {
    const exercise = await this.findOneWithDeleted(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    this.exerciseStepsRepository.recover(exercise);

    return exercise;
  }

  async deleteSteps(exerciseSteps: ExerciseSteps[]) {
    try {
      exerciseSteps.forEach(async (step) => {
        await this.softRemove(step.id);
      });
    } catch (e: unknown) {
      throw new InternalServerErrorException('Ошибка при удалении шагов');
    }
  }
}
