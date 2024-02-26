import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(this.userRepository.create(createUserDto));
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    email: string,
  ): Promise<UpdateResult> {
    const userIsValid = await this.validateUser(updateUserDto, email);
    const hashPassword = updateUserDto.newPassword
      ? await bcrypt.hash(updateUserDto.newPassword, 5)
      : userIsValid.password;

    return await this.userRepository.update(id, {
      photoPath: updateUserDto.photoPath,
      name: updateUserDto.name,
      surname: updateUserDto.email,
      email: updateUserDto.email,
      phone: updateUserDto.phone,
      password: hashPassword,
      role: updateUserDto.role,
      isActive: updateUserDto.isActive,
    });
  }

  async softRemove(id: string): Promise<void> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist');
    }

  async getUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      relations: ['posts'],
      where: { email },
    });
  }

  private getUserByEmailPrivate(email: string): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

  async validateUser(
    userDto: CreateUserDto | UpdateUserDto,
    email?: string,
  ): Promise<User> {
  async validateUser(
    userDto: CreateUserDto | UpdateUserDto,
    email?: string,
  ): Promise<User> {
    let userEmail: string = email ?? userDto.email;
    const user = await this.getUserByEmailPrivate(userEmail);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Пользователь не найден',
      });
    }

    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (passwordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный емеил или пароль',
    });
  }
}
