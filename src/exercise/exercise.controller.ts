import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Res,
  UploadedFile,
  ParseFilePipeBuilder,
  UseInterceptors,
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
    return this.exerciseService.create(createExerciseDto, image);
  }

  @Get()
  async findAll() {
    return this.exerciseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const exercise = this.exerciseService.findOne(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    } else {
      return exercise;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exerciseService.update(id, updateExerciseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    const exercise = await this.exerciseService.findOne(id);

    if (!exercise) {
      throw new NotFoundException('Exercise does not exist');
    }

    await this.exerciseService.softDelete(id, exercise);

    res.status(204).send().end();
  }
}
