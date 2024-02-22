import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Express } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ExerciseStepsService } from 'src/exercise-steps/exercise-steps.service';
import { CreateExerciseStepDto } from 'src/exercise-steps/dto/create-exercise-step.dto';

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(
    private readonly exerciseService: ExerciseService,
    private readonly exerciseStepsService: ExerciseStepsService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createExerciseDto: CreateExerciseDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 1000000,
        })
        .build({
          fileIsRequired: false,
        }),
    )
    image: Express.Multer.File,
  ) {
    return await this.exerciseService.create(createExerciseDto, image);
  }

  @Get()
  async findAll() {
    return await this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exercise = await this.exerciseService.findOne(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    return exercise;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return await this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async softRemove(@Param('id') id: string) {
    await this.exerciseService.softRemove(id);
  }

  @Post('step')
  async createStep(@Body() createExerciseStepDto: CreateExerciseStepDto) {
    const exerciseStep = await this.exerciseStepsService.create(
      createExerciseStepDto,
    );

    this.exerciseService.exerciseStepsUpdate(
      createExerciseStepDto.exerciseId,
      exerciseStep,
    );

    return exerciseStep;
  }

  @Delete('step/:id')
  @HttpCode(204)
  async softRemoveStep(@Param('id') id: string) {
    await this.exerciseStepsService.softRemove(id);
  }
}
