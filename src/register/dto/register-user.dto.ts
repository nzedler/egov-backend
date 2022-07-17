import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';

/*
 * Dto for registering a new user.
 * @export RegisterUserDto
 * @class RegisterUserDto
 */
export class RegisterUserDto {
  @ApiProperty({
    title: 'title of the user',
    enum: ['mr', 'mrs', 'divers'],
    required: true,
  })
  @IsIn(['mr', 'mrs', 'divers'])
  @IsNotEmpty()
  public title: string;

  @ApiProperty({
    title: 'firstname of the user',
    type: String,
    required: true,
  })
  @IsAlpha()
  @IsNotEmpty()
  public firstname: string;

  @ApiProperty({
    title: 'last name of the user',
    type: String,
    required: true,
  })
  @IsAlpha()
  @IsNotEmpty()
  public lastname: string;

  @ApiProperty({
    title: 'email of the user',
    description: 'has to be email format',
    type: String,
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @ApiProperty({
    title: 'password of the user',
    description: 'has to be at least 12 characters and maximum 128',
    type: String,
    required: true,
    example: '1234567890abcABC123!',
  })
  @IsString() // OWASP 2.1.4
  @Length(12, 128) // OWASP 2.1.1 and 2.1.2
  public password: string;
}
