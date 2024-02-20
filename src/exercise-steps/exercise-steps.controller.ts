import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseStepsService } from './exercise-steps.service';
import { CreateExerciseStepDto } from './dto/create-exercise-step.dto';
import { UpdateExerciseStepDto } from './dto/update-exercise-step.dto';

@Controller('exercise-steps')
export class ExerciseStepsController {
  constructor(private readonly exerciseStepsService: ExerciseStepsService) {}

  @Post()
  create(@Body() createExerciseStepDto: CreateExerciseStepDto) {
    return this.exerciseStepsService.create(createExerciseStepDto);
  }

  @Get()
  findAll() {
    return this.exerciseStepsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exerciseStepsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExerciseStepDto: UpdateExerciseStepDto) {
    return this.exerciseStepsService.update(+id, updateExerciseStepDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exerciseStepsService.remove(+id);
  }
}
