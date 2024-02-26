import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseStepsService } from './exercise-steps.service';
import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';
import { UpdateExerciseStepDto } from './dto/update-exercise-step.dto';

@Controller('exercise-steps')
export class ExerciseStepsController {
  constructor(private readonly exerciseStepsService: ExerciseStepsService) {}

  @Post()
  async create(@Body() createExerciseStepDto: CreateExerciseStepDto) {
    return await this.exerciseStepsService.create(createExerciseStepDto);
  }

  @Get()
  async findAll() {
    return await this.exerciseStepsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.exerciseStepsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseStepDto: UpdateExerciseStepDto,
  ) {
    return await this.exerciseStepsService.update(id, updateExerciseStepDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.exerciseStepsService.remove(id);
  }
}
