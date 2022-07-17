import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  /*
   * Register a new user with the parameters defined in register-user.dto.ts
   * @param createUserDto               - The user data to register
   * @returns {Promise<{ id: string }>} - The id of the created user
   * @memberof RegisterController
   * @method registerUser
   */
  @Post()
  async registerUser(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<{ id: string }> {
    return this.registerService.registerUser(registerUserDto);
  }
}
