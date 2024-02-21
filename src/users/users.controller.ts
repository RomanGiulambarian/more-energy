import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Res,
  Req,
  Post,
  HttpCode,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { extendedRequest } from 'src/common/types/global.types';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async getAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    return user;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: extendedRequest,
  ) {
    return await this.userService.update(id, updateUserDto, req.user.email);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    this.userService.softDelete(id);

    return id;
  }
}
