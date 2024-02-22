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
import { Express, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Exercise')
@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

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
  Ы;
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
}
