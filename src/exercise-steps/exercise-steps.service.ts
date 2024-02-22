import { Injectable } from '@nestjs/common';
import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';
import { UpdateExerciseStepDto } from './dto/update-exercise-step.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExerciseSteps } from './entities/exercise-steps.entity';

@Injectable()
export class ExerciseStepsService {
  constructor(
    @InjectRepository(ExerciseSteps)
    private readonly exerciseStepsRepository: Repository<ExerciseSteps>,
  ) {}

  async create(createExerciseStepDto: CreateExerciseStepDto) {
    return await this.exerciseStepsRepository.save(
      this.exerciseStepsRepository.create(createExerciseStepDto),
    );
  }

  async findAll() {
    return await this.exerciseStepsRepository.find();
  }

  async findOne(id: string) {
    return await this.exerciseStepsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateExerciseStepDto: UpdateExerciseStepDto) {
    return await this.exerciseStepsRepository.update(id, updateExerciseStepDto);
  }

  async remove(id: string) {
    return await this.exerciseStepsRepository.delete(id);
  }
}
