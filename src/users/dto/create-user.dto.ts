import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../enums';
import { passwordRegEx } from 'src/common/constants/global.constants';

export class CreateUserDto {
  @IsOptional()
  photoPath?: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide valid Email.' })
  email: string;

  @IsPhoneNumber('RU', { message: 'Invalid phone number' })
  phone: string;

  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(20)
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
    at least one uppercase letter,
    one lowercase letter,
    one number`,
  })
  password: string;

  @IsNotEmpty()
  role: UserRole;

  @IsNotEmpty()
  isActive: string;
}
